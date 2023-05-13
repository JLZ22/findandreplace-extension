function openPrompt(selection) {
  
}

document.onkeydown = function(event) {
  if (event.ctrlKey && event.key == "q") {
    openPrompt(window.getSelection);
  }
}