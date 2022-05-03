
//MODEL-------------------------------------------------------------------------

let todos;

const savedTodos = JSON.parse(localStorage.getItem('todos'));

if (Array.isArray(savedTodos)) {
    todos = savedTodos;
}
else {
    todos = [{
        title: 'Get groceries',
        dueDate: '2021-03-19',
        id: 'id1'
    }, {
        title: 'Wash car',
        dueDate: '2021-04-23',
        id: 'id2'
    }, {
        title: 'Doing makeup',
        dueDate: '2022-05-02',
        id: 'id3'
    }];
}

function createTodo(title, dueDate) {
    const id = '' + new Date().getTime();

    todos.push({
        title: title,
        dueDate: dueDate,
        id: id
    });
    saveTODO();
}

function removeTODO(idToDelete) {
    todos = todos.filter(function (todo) {

        if (todo.id === idToDelete) return false;
        else return true;
    });
    saveTODO();
}

function saveTODO() {
    localStorage.setItem('todos', JSON.stringify(todos));
}
//-----------------------------------------------------------------------------------------


// VIEW -----------------------------------------------------------------------------------
function render() {

    document.getElementById('listid').innerHTML = '';
    todos.forEach(function (todos) {
        const element = document.createElement('div');
        element.innerHTML = todos.title + ' ' + todos.dueDate;

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = "Delete";

        deleteButton.style = "margin-left: 15px;";
        deleteButton.onclick = deletetodos;
        deleteButton.id = todos.id;
        element.appendChild(deleteButton);

        const todo_list = document.getElementById('listid');
        todo_list.appendChild(element);
    });
}

//----------------------------------------------------------------------------------------

//CONTROLLER -----------------------------------------------------------------------------

function addtodos() {
    const textbox = document.getElementById('inputid');
    const title = textbox.value;

    const datepicker = document.getElementById('dateid');
    const dueDate = datepicker.value;

    createTodo(title, dueDate);

    render();
}

function deletetodos(event) {
    const deletButton = event.target;
    const idToDelete = deletButton.id;
    removeTODO(idToDelete);
    render();
}
//--------------------------------------------------------------------------------------------

