function updateLinks(linksByType) {
    function createListItem(link, type) {
      const listItem = document.createElement("li");
      const anchor = document.createElement("a");
      anchor.href = link;
      anchor.textContent = link;
      listItem.appendChild(anchor);
      const button = document.createElement("button");
      button.textContent = "Download";
      button.onclick = () => {
        chrome.downloads.download({ url: link, filename: `${type}_${Date.now()}`, saveAs: true });
      };
      listItem.appendChild(button);
      return listItem;
    }
  
    for (const type in linksByType) {
      const list = document
      .getElementById(`${type}-list`);
      list.innerHTML = "";
      linksByType[type].forEach(link => {
        const listItem = createListItem(link, type);
        list.appendChild(listItem);
      });
    }
  }
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "updateLinks") {
      updateLinks(request.data);
    }
  });
  
  chrome.runtime.sendMessage({ action: "getLinksByType" });
    