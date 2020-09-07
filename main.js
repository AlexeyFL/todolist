const input = document.getElementById('input');
const btn = document.querySelector('.btn');
const output = document.querySelector('.todolist__output');

var data = [];
var outputString = '';

// createTemlateString
function createTemlateString(text, id) {
  let inputText = `
    <div id="${id}" class="todolist__text">
      ${text}
      <span class="close">x</span>
    </div>
    `;
  return inputText;
}

// createOutput
function createOutput() {
  data.forEach((item) => {
    outputString = createTemlateString(item.text, item.id);
  });
}

// addToStore
function addToStore(arrItems) {
  localStorage.setItem('items', JSON.stringify(arrItems));
}

// render
function render() {
  output.innerHTML += outputString;
}

// addData
function addData() {
  data.push({id: Math.random(), text: input.value});
  addToStore(data);
}

// btnHandler
function btnHandler() {
  if (input.value === '') {
    alert('Add text to input');
    return;
  }
  addData();
  createOutput();
  render();
  input.value = '';
}

// closeHandler
function closeHandler(e) {
  let close = document.querySelectorAll('.close');
  let parent;

  close.forEach((item) => {
    if (e.target == item) {
      parent = item.closest('.todolist__text');

      data = data.filter((item) => {
        return item.id !== +parent.id;
      });
      parent.remove();
    } else {
      return;
    }
  });
}

// listeners
btn.addEventListener('click', btnHandler);
document.addEventListener('click', closeHandler);

