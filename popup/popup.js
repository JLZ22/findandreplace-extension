console.log("popup running");
document.getElementById("phrase").addEventListener("input", (ev) => {
  ev.preventDefault();
  console.log("change")
  sendData();
});

function sendData() {
  let phrase = document.getElementById("phrase").value;
  console.log("phrase: " + phrase)
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    console.log("sending")
    chrome.tabs.sendMessage(tabs[0].id, phrase);
    console.log("-----------------------------------------")
  });
}