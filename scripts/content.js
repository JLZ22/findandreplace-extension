/**
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

/**
 * Finds and highlights all occurences of a given phrase in
 * the given selection.
 * 
 * @param {String} phrase The phrase to be highlighted.
 * @param {Selection} selection The selection to be searched.
 * @param {String} status A string that indicates what request is being made.
 */
function handleRequest(phrase, selection, status) {
  let data = parseSelection(phrase, selection);
}

/**
 * Parses through the common ancestor node which is derived from the 
 * given selection and highlights all instances of the phrase (case insensitive)
 * by injecting HTML using innerHTML.  
 * 
 * @param {String} phrase The phrase to be highlighted.
 * @param {Selection} selection The selection to be searched.
 * @returns A dictionary that has the number of occurences of the phrase
 *          and the common ancestor Node
 */
function parseSelection(phrase, selection) {
  if (selection == undefined) return {count: -1};
  let anchorOffset = selection.anchorOffset;
  let focusOffset = selection.focusOffset;
  let count = 0;
  for (let i = 0 ; i < selection.rangeCount ; i++) {
    let r = selection.getRangeAt(i);
    count += parseRange(phrase, r, anchorOffset, focusOffset);
  }
  selEdited = true;
  return {count: count};
}

/**
 * Search through the given range and highlight all occurences of the phrase. Stores 
 * the HTML of all elements in the range before editing. 
 * 
 * @param {String} phrase The phrase that is being searched for.
 * @param {Range} range The range that is to be parsed.
 * @param {int} anchorOffset The index of the start of the selection in the first node.
 * @param {int} focusOffset The index of the end of the selection in the last node. 
 * @returns 
 */
function parseRange(phrase, range, anchorOffset, focusOffset) {
  let common = range.commonAncestorContainer;
  let count = 0;
  common.childNodes.forEach(element => {
    if (element.nodeType == 1) {
      count += highlight(phrase, element, anchorOffset, focusOffset);
    }
  });
  return count;
}

/**
 * Highlights all instances of text in the node.
 * @param {String} text The text to be highlighted
 * @param {Element} el The element to be searched.
 * @param {int} anchorOffset The index of the start of the selection in the first node.
 * @param {int} focusOffset The index of the end of the selection in the last node. 
 */
function highlight(text, el, anchorOffset, focusOffset){ // TODO
  // NOTE: do not store el.innerHTML in a variable
  let count = 0;
  let len = el.innerHTML;
  el.innerHTML = "<mark>" + el.innerHTML + "</mark>"; // TEMPORARY
  for (let i = 0 ; i < len ; i++) {

  }
  return count;
  // let h = el.textContent;
  // el.textContent = '';
  // let idx, prev = 0;
  // while((idx = t.indexOf(text, prev)) !== -1){
  //   el.append(t.slice(prev, idx));
  //   const a = document.createElement('a');
  //   a.href = '/' + text;
  //   a.textContent = text;
  //   el.appendChild(a);
  //   prev = idx + text.length;
  // }
  // el.append(t.slice(prev));
}

/**
 * Reverts the given selection.
 * 
 * @param {Selection} selection The selection that is to be reverted
 */
function returnToOriginal(selection) {
  document.body.innerHTML = original;
}

let selection;
let selEdited = false;
let original = document.body.innerHTML;

document.onload = () => {
  original = document.body.innerHTML; 
  console.log(original);
}

document.onselectionchange = () => {
  if (selEdited) 
    returnToOriginal(selection);
  selection = document.getSelection();
}


/**
 * Listens to message from popup script and calls a handler
 * to perform actions on the current page according to the 
 * status from the message.
 */
chrome.runtime.onMessage.addListener((message) => {
  console.log('selection: ' + selection);
  for (let key in message) {
    console.log(key + ": " + message[key]);
  }
  console.log("original: " + original);
  handleRequest(message.phrase, selection, message.status);
});