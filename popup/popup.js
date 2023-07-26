let dict = {phrase: "", status: "default"};

/**
 * Gets string from text box in the popup script,
 * adds it to a dictionary, and sends it to content script 
 * every time the text box in the popup is changed.
 */
document.getElementById("phrase").addEventListener("input", (ev) => {
  ev.preventDefault();
  dict.phrase = document.getElementById("phrase").value;
  sendData();
});

/**
 * Sends the given String to the content script.
 */
function sendData() {
  for (let key in dict) {
    console.log(key + ": " + dict[key]);
  }
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    console.log("sending")
    chrome.tabs.sendMessage(tabs[0].id, dict);
    console.log("-----------------------------------------")
  });
}