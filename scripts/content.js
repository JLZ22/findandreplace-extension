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

onmouseup = () => {
  var selection = getSelection();
  var html = getHTMLOfSelection();
  var text = getSelectedText();
  console.log("selection stored: " + selection.toString());
}

chrome.runtime.onMessage.addListener((message) => {
  console.log(message);
});