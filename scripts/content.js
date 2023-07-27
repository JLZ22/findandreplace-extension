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

let cloneOriginal = [[]]; // store original state of elements that will be edited
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
  let anchorOffset = selection.anchorOffset;
  let focusOffset = selection.focusOffset;
  let count = 0;
  for (let i = 0 ; i < selection.rangeCount ; i++) {
    let r = selection.getRangeAt(i);
    count += parseRange(phrase, r, cloneOriginal[i], anchorOffset, focusOffset);
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
 * @param {Array} arr Array storing the orriginal HTML of the elements in the range.
 * @param {int} anchorOffset The index of the start of the selection in the first node.
 * @param {int} focusOffset The index of the end of the selection in the last node. 
 * @returns 
 */
function parseRange(phrase, range, arr, anchorOffset, focusOffset) {
  let common = range.commonAncestorContainer;
  let count = 0;
  common.childNodes.forEach(element => {
    arr.push(element.innerHTML);
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
  let h = el.innerHTML;
  for (let i = 0 ; i < h.length ; i++) {

  }
  return count
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
  for (let i = 0 ; i < selection.rangeCount ; i++) {
    let r = selection.getRangeAt(i);
    let nodes = r.commonAncestorContainer.childNodes;
    for (let j = 0 ; j < nodes.length ; j++) {
      nodes.item[j].innerHTML = cloneOriginal[i][j].innerHTML;
    }
  }
  cloneOriginal.length = 0;
  selEdited = false;
}

let selection;
let selEdited = false;

document.onselectionchange = () => {
  if (selEdited) returnToOriginal(selection);
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
  let x = selection.getRangeAt(0).commonAncestorContainer.childNodes;
  x.forEach(element => {
    if (element.nodeType == 1) {
      element.innerHTML = "";
    }
  })
  //handleRequest(message.phrase, selection, message.status);
});