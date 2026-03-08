function updateRules() {
  chrome.storage.local.get(['blockedSites', 'isEnabled'], (res) => {
    const sites = res.blockedSites || [];
    const isEnabled = res.isEnabled !== false;

    chrome.declarativeNetRequest.getDynamicRules((oldRules) => {
      const removeRuleIds = oldRules.map(r => r.id);

      const addRules = isEnabled ? sites.map((site, i) => {
        const cleanSite = site.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "");
        
        return {
          id: i + 1,
          priority: 1,
          action: { 
            type: 'redirect', 
            redirect: { extensionPath: '/blocked/blocked.html' } 
          },
          condition: { 
            urlFilter: cleanSite, 
            resourceTypes: ['main_frame'] 
          }
        };
      }) : [];

      chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds,
        addRules
      });
    });
  });
}

chrome.storage.onChanged.addListener(updateRules);
chrome.runtime.onInstalled.addListener(updateRules);