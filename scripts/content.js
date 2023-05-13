function getSelectedText(selection) {
  let text = "";
  if (typeof selection != "undefined") {
      text = selection().toString();
  } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
      text = document.selection.createRange().text;
  }
  return text;
}

function openPrompt(selection) {
  let phrase = prompt("Enter the word you would like to find in the highlighted text or nothing for total word count.");
  text = getSelectedText(selection);
  let count = 0;
  if (!text) {
    return;
  }
  if (!phrase) {
    count = text.trim().split(/\s+/).length;
  }
  else {
    const array = text.split(/[.,!,?,;, ]/);
    for (i = 0 ; i < array.length ; i++) {
      if (array[i].toUpperCase().includes(phrase.toUpperCase())) {
        count++;
      }
    }
  }
  alert(count);
}

document.onkeydown = function(event) {
  if (event.ctrlKey && event.key == "q") {
    openPrompt(window.getSelection);
  }
}