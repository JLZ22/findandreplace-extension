function getSelected() {
  let text = "";
  if (typeof window.getSelection != "undefined") {
      text = window.getSelection().toString();
  } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
      text = document.selection.createRange().text;
  }
  return text;
}

function findPrompt() {
  let word = prompt("Enter the word you would like to find.");
  alert(word);
}
findPrompt()
// document.onmouseup = function(event) {
//   let text = getSelected
//   document.onkeydown = function(e) {
//     if (e.ctrlKey) {
//       document.onkeydown = function(ev) {
//         if (ev.key == "q") {
//           findPrompt(text);
//         }
//       }
//     }
//   }
// }