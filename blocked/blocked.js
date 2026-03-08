document.addEventListener('DOMContentLoaded', () => {
  let count = 5;
  const display = document.getElementById('countdown');

  const timer = setInterval(() => {
    count--;
    if (display) display.innerText = count;

    if (count <= 0) {
      clearInterval(timer);
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        if (tabs[0]) chrome.tabs.remove(tabs[0].id);
      });
    }
  }, 1000);
});