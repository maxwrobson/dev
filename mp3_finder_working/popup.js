function downloadFile(url, filename) {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  function displayLinksByType(linksByType) {
    for (const type in linksByType) {
      const listElement = document.getElementById(`${type}-list`);
      linksByType[type].forEach(link => {
        const listItem = document.createElement("li");
  
        const anchor = document.createElement("a");
        anchor.href = link;
        anchor.target = "_blank";
        anchor.textContent = link;
        listItem.appendChild(anchor);
  
        const downloadButton = document.createElement("button");
        downloadButton.className = "MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary";
        downloadButton.textContent = "Download";
        downloadButton.addEventListener("click", () => {
          const filename = link.split("/").pop();
          downloadFile(link, filename);
        });
  
        listItem.appendChild(downloadButton);
        listElement.appendChild(listItem);
      });
    }
  }
  
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "getLinksByType" }, response => {
      displayLinksByType(response);
    });
  });
  