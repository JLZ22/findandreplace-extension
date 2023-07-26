/**
 * Gets the current selection
 * 
 * @returns Returns the current selection.
 */
function getSelected() {
  let sel = "";
  if (typeof window.getSelection != "undefined") {
      sel = window.getSelection();
  } else if (typeof document.selection != "undefined") {
      sel = document.selection;
  }
  return sel;
}

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
  let data = highlightSelection(phrase, selection);
}

let cloneOriginal; // store original state of elements that will be edited
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
function highlightSelection(phrase, selection) {
  let common = selection.commonAncestorContainer;
  let count = 0;
  let anchorOffset = selection.anchorOffset;
  let focusOffset = selection.focusOffset;
  selEdited = true;
  common.childNodes.forEach(element => {
    cloneOriginal.push(element.innerHTML);
    let temp = highlight(phrase, element, anchorOffset, focusOffset);
    count += temp.count;
  });
  return {node: common, count: count};
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
  let temp = el;
  temp.innerHTML = "";
  for (let i = 0 ; i < h.length ; i++) {

  }
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
  let nodes = selection.commonAncestorContainer.childNodes;
  for (let i = 0 ; i < nodes.length ; i++) {
    nodes.item[i].innerHTML = cloneOriginal[i].innerHTML;
  }
  selEdited = false;
}

let selection;
let selEdited = false;

document.onselectionchange = () => {
  if (selEdited) returnToOriginal(selection);
  selection = getSelected();
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
  handleRequest(message.phrase, selection, message.status);
});