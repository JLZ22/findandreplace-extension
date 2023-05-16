console.log("popup running");
console.log(document);
document.getElementById("phrase").addEventListener("keydown", (ev) => {
  if (ev.key === "Enter") {
    ev.preventDefault();
    console.log("keydown event")
    document.getElementById("search").click();
  }
});

document.getElementById("search").addEventListener("click",  (ev) => {
  console.log("search button");
  ev.preventDefault();
  sendData()
});

function sendData() {
  console.log("beginning to send data")
  let phrase = document.getElementById("phrase").value;
  console.log("phrase: " + phrase)
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    console.log("sending")
    chrome.tabs.sendMessage(tabs[0].id, phrase);
  });
}