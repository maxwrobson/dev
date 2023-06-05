// Wrap the existing code inside a function called 'findLinks'
function findLinks() {
    function findLinksByExtensions(extensions) {
      const links = Array.from(document.getElementsByTagName("a"));
      return links.filter(link =>
        extensions.some(ext => link.href.toLowerCase().endsWith(ext))
      ).map(link => link.href);
    }
  
    const extensionsByType = {
      audio: [".mp3", ".wav", ".ogg", ".flac", ".aac", ".m4a"],
      video: [".mp4", ".webm", ".ogg", ".mov", ".avi", ".mkv", ".flv"],
      image: [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg", ".webp"]
    };
  
    const linksByType = {};
    for (const type in extensionsByType) {
      linksByType[type] = findLinksByExtensions(extensionsByType[type]);
    }
  
    return linksByType;
  }
  
  // Create a function to handle sending links to the popup
  function sendLinksToPopup() {
    const linksByType = findLinks();
    chrome.runtime.sendMessage({ action: 'updateLinks', data: linksByType });
  }
  
  // Send the initial set of links
  sendLinksToPopup();
  
  // Create a MutationObserver to watch for changes in the DOM
  const observer = new MutationObserver(sendLinksToPopup);
  
  // Start observing the entire document for changes in child elements
  observer.observe(document.documentElement, { childList: true, subtree: true });
  
  // Listen for a message from the popup to send the updated links
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getLinksByType') {
      sendLinksToPopup();
    }
  });
  