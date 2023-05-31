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

/*!
 * Sanitize and encode all HTML in a user-submitted string
 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {String} str  The user-submitted string
 * @return {String} str  The sanitized string
 */
var sanitizeHTML = function (str) {
	var temp = document.createElement('div');
	temp.textContent = str;
	return temp.innerHTML;
};

function getManipulatedSelection(selection, phrase) {
  let common = selection.commonAncestorContainer;
  let count = 0;
  common.childNodes.forEach(element => {
    let temp = editText(element.textContent, phrase);
    element.textContent - temp.text;
    count += temp.count;
  });
  return {node: common, count: count};
}

function find(phrase, selection, html) { // broken asf use textContent
  console.log('phrase: ' + phrase);
  console.log('selection: ' + selection);
  // console.log('anchor node: ' + selection.anchorNode);
  // console.log('focus node: ' + selection.focusNode);
  // console.log('selection html: ' + html);
  // let data = editHTML(phrase, html);
  // console.log('post manipulation html: ' + data.html);
  let data = getManipulatedSelection(selection, phrase);
}

function editText(textContent, phrase) {
  let count = 0;
  //TODO
}

var selection, html;

onmouseup = () => {
  selection = window.getSelection();
  html = getHTMLOfSelection();
}

chrome.runtime.onMessage.addListener((message) => {
  find(message, selection, html);
});