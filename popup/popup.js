let count = 0;
onkeydown = function(e) {
  if (e.key === "Enter") {
    let phrase = document.getElementById("phrase").ariaValueText;
    const [tab] = chrome.tabs.query({active: true, currentWindow: true});
    chrome.runtime.sendMessage([count, phrase], (response) => {
      console.log(count + ": " + response);
      count++;
    });
  }
}