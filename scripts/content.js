function getSelectedText() {
  let text = "";
  if (typeof window.getSelection != "undefined") {
      text = window.getSelection.toString();
  } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
      text = document.selection.createRange().text;
  }
  return text;
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

function find(phrase, selection, html, text) {
  console.log('phrase: ' + phrase);
  console.log('selection: ' + selection);
  console.log('selection html: ' + html);
}

var selection, html, text;

onmouseup = () => {
  selection = getSelection();
  html = getHTMLOfSelection();
  text = getSelectedText();
}

chrome.runtime.onMessage.addListener((message) => {
  find(message, selection, html, text);
});