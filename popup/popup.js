onkeydown = (e) => {
  if (e.key === "Enter") {
    // let phrase = "";
    // phrase = document.getElementById("phrase").value;
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, "phrase", (response) => {
        console.log("Popup: " + response);
      });
    });
  }
}