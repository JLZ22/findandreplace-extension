document.getElementById("search").onclick = (ev) => {
  console.log("search button");
  sendData()};

onkeydown = (ev) => {
  if (ev.key === "Enter") {
    ev.preventDefault;
    console.log("keydown event")
    sendData();
  }
}

function sendData() {
  console.log("beginning to send data")
  let phrase = null;
  let el = document.getElementById("phrase");
  if (el) {
    phrase = el.value;
  }
  console.log("phrase: " + phrase)
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    console.log("sending")
    chrome.tabs.sendMessage(tabs[0].id, "shit");
  });
}