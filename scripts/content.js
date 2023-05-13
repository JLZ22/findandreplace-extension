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

document.onkeydown = function(event) {
  if (event.ctrlKey && event.key == "q") {
    openPrompt(window.getSelection);
  }
}