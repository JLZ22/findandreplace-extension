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

function find(phrase, selection, html) {
  console.log('phrase: ' + phrase);
  console.log('selection: ' + selection);
  console.log('selection html: ' + html);
  let data = editHTML(phrase, html);
  console.log('post manipulation html: ' + data.html);
  window.getSelection.innerHTML = data.html;
}

function editHTML(phrase, html) {
  let count = 0;
  let len = phrase.length;
  let arr = [];
  if (len <= html.length) {
    for (let i = 0 ; i <= html.length - len ; i++) {
      let temp = html.substring(i, i + len);
      if (temp.toLowerCase() === phrase.toLowerCase()) {
        count++;
        arr.push(temp);
      }
    }
    for (let i = 0 ; i < arr.length ; i++) {
      html = html.replace(arr[i], `<mark>${arr[i]}<mark>`);
    }
  }
  return {count: count, html: html};
}

var selection, html;

onmouseup = () => {
  selection = window.getSelection();
  html = getHTMLOfSelection();
}

chrome.runtime.onMessage.addListener((message) => {
  find(message, selection, html);
});