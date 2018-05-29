const text = document.querySelector('#todos-form');
const input = text.querySelector('input');
const todosList = document.querySelector('.todos');


// Todo lists
let todos = JSON.parse(localStorage.getItem('todos')) || [{text: 'This is incomplete list item', done: false}, {text: 'This is completed list item', done: true}];

create_list();

// get input values
function inputValue(e){
	e.preventDefault();
	if(!input.value) return;
	todos.push({
		text: input.value,
		done: false
	});
	input.value = '';
	localStorage.setItem('todos', JSON.stringify(todos));
	create_list()
}

// Delete todolist
function deleteTodo(e){
	if(!e.target.matches('span.delete'))return;
	todos.splice(e.target.dataset.index, 1);
	create_list();
	localStorage.setItem('todos', JSON.stringify(todos));
}

// Done todolist
function doneTodo(e){
	if(!e.target.matches('span.done'))return;
	todos[e.target.dataset.index].done = true;
	create_list();
	localStorage.setItem('todos', JSON.stringify(todos));
}

// unDone todolist
function unDoneTodo(e){
	if(!e.target.matches('span.undone'))return;
	todos[e.target.dataset.index].done = false;
	create_list();
	localStorage.setItem('todos', JSON.stringify(todos));
}

// Create todo lists
function create_list(){
	todosList.innerHTML = todos.map((todo, i) => `
		<li><span class="todo-text ${(todo.done)?'item-done':''}">${todo.text}</span> 
		<div>
			${(todo.done)?`<span class="undone" data-index="${i}">💪</span>`:`<span class="done" data-index="${i}">🔐</span>`}
			<span class="delete" data-index"${i}">⨲</span>
		</div></li>
	`).join('');
}

// Add event listeners
text.addEventListener('submit', inputValue);
todosList.addEventListener('click', deleteTodo);
todosList.addEventListener('click', doneTodo);
todosList.addEventListener('click', unDoneTodo);




