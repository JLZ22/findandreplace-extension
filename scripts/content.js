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