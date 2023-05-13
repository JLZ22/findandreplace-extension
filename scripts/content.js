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
  console.log(phrase);
  console.log(text);
  let count = 0;
  if (!text) {
    return;
  }
  if (!phrase) {
    count = text.trim().split(/\s+/).length;
    console.log("count: " + count);
  }
  else {
    const array = text.split(/[.,!,?,;, ]/);
    console.log(array);
    for (i = 0 ; i < array.length ; i++) {
      if (array[i].toUpperCase().includes(phrase.toUpperCase())) {
        count++;
      }
    }
  }
  console.log("x");
  alert(count);
}

function getHTMLOfSelection () {
  var range;
  if (document.selection && document.selection.createRange) {
    range = document.selection.createRange();
    return range.htmlText;
  }
  else if (window.getSelection) {
    var selection = window.getSelection();
    if (selection.rangeCount > 0) {
      range = selection.getRangeAt(0);
      var clonedSelection = range.cloneContents();
      var div = document.createElement('div');
      div.appendChild(clonedSelection);
      return div.innerHTML;
    }
    else {
      return '';
    }
  }
  else {
    return '';
  }
}

window.onkeydown = function(event) {
  if (event.ctrlKey && event.key == "q") {
    openPrompt(window.getSelection);
  }
}