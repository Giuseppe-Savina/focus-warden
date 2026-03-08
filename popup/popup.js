document.addEventListener('DOMContentLoaded', () => {
  const elements = {
    masterToggle: document.getElementById('masterToggle'),
    statusText: document.getElementById('statusText'),
    siteInput: document.getElementById('siteInput'),
    addBtn: document.getElementById('addBtn'),
    clearBtn: document.getElementById('clearBtn'),
    siteList: document.getElementById('siteList')
  };

  chrome.storage.local.get(['blockedSites', 'isEnabled'], ({ blockedSites, isEnabled }) => {
    const enabled = isEnabled !== false;
    elements.masterToggle.checked = enabled;
    updateStatusUI(enabled);
    render(blockedSites || []);
  });

  const cleanDomain = (url) => url.trim().toLowerCase().replace(/^(?:https?:\/\/)?(?:www\.)?/i, "");

  function addSite(url) {
    const site = cleanDomain(url);
    if (!site) return;

    chrome.storage.local.get(['blockedSites'], ({ blockedSites = [] }) => {
      if (!blockedSites.includes(site)) {
        const updatedSites = [...blockedSites, site];
        chrome.storage.local.set({ blockedSites: updatedSites }, () => {
          render(updatedSites);
          elements.siteInput.value = '';
        });
      }
    });
  }

  function render(sites) {
    elements.siteList.innerHTML = sites.map(s => `
      <li class="site-item">
        <span>${s}</span>
        <button class="delete-btn" data-url="${s}">&times;</button>
      </li>
    `).join('');
  }

  elements.siteList.addEventListener('click', (e) => {
    const deleteBtn = e.target.closest('.delete-btn');
    if (deleteBtn) {
      const siteToRemove = deleteBtn.dataset.url;
      chrome.storage.local.get(['blockedSites'], ({ blockedSites = [] }) => {
        const filtered = blockedSites.filter(s => s !== siteToRemove);
        chrome.storage.local.set({ blockedSites: filtered }, () => render(filtered));
      });
    }
  });

  elements.addBtn.addEventListener('click', () => addSite(elements.siteInput.value));
  
  elements.siteInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addSite(elements.siteInput.value);
  });

  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => addSite(chip.dataset.url));
  });

  elements.masterToggle.addEventListener('change', () => {
    const enabled = elements.masterToggle.checked;
    chrome.storage.local.set({ isEnabled: enabled }, () => updateStatusUI(enabled));
  });

  elements.clearBtn.addEventListener('click', () => {
    if (confirm("Sei sicuro di voler sbloccare tutti i domini?")) {
      chrome.storage.local.set({ blockedSites: [] }, () => render([]));
    }
  });

  function updateStatusUI(enabled) {
    elements.statusText.innerText = enabled ? "Protocol: ACTIVE" : "Protocol: PAUSED";
    elements.statusText.classList.toggle("status-on", enabled);
  }
});