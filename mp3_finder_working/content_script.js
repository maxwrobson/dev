function findLinksByExtensions(extensions) {
    const links = Array.from(document.getElementsByTagName("a"));
    return links.filter(link =>
      extensions.some(ext => link.href.toLowerCase().endsWith(ext))
    ).map(link => link.href);
  }
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getLinksByType") {
      const extensionsByType = {
        audio: [".mp3", ".wav", ".ogg", ".flac", ".aac", ".m4a"],
        video: [".mp4", ".webm", ".ogg", ".mov", ".avi", ".mkv", ".flv"],
        image: [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg", ".webp"]
      };
  
      const linksByType = {};
      for (const type in extensionsByType) {
        linksByType[type] = findLinksByExtensions(extensionsByType[type]);
      }
  
      sendResponse(linksByType);
    }
  });
  