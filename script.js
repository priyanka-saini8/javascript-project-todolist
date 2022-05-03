// let todo1 = "Get groceries";
// let todo2 = "Wash car";
// let todo3 = "Doing makeup";

//const todos = ["Get groceries", "Wash car", "Doing makeup"];
// todos.push('eating dinner');  to add the items in an array
// todos.pop(); to delete last element from array


//MODEL-------------------------------------
// it manages all the data

// code that creates todos = push
// code that deletes todos = pop

// if local storage has the data use it 
//otherwise use the default (todos) array.
let todos;               //create a varaible dont need to assign any value if it is let
                        // because value is changed so we take let instead of const

//const savedTODOS = localStorage.getItem('todos');   // this will get the data which is in storage under todos key
                                                    // if something exist for this key returns string

// We have to check here if local storage has an array or not. For that we have to first
//1. retrieve what is the local storage
const savedTodos = JSON.parse(localStorage.getItem('todos'));   // if something exist for the key this will return in string
                                                                // converted back to array format
//2. then check if it is an array                        
if( Array.isArray(savedTodos)) {
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
        id: 'id3'                 // 'string'
    }];
}

// create todo
function createTodo(title, dueDate) {
    const id = '' + new Date().getTime();                                 

    todos.push({
        title: title,
        dueDate: dueDate,
        id: id                      // so here we are storing a 'number' as an id
    });
    saveTODO();             // whenever data gets updated it is saved in local storage
}

// delete todo
function removeTODO(idToDelete) {
    todos = todos.filter( function (todo) {     // false than remove the id from array todo
        // if the id of todo matches with the idToDelete then return false

        if(todo.id === idToDelete) return false;   // number === string
                                                   // for items in the array object this will always return false
                                                   // thats why new items that we add does not get deleted
                                                   // this is TYPE ERROR 
                                                   // TYPESCRIPT is used to remove such errors
        else return true;
    });
    saveTODO();             // whenever data gets updated it is saved
}

function saveTODO() {
    localStorage.setItem ('todos', JSON.stringify(todos) );   // STRING DATA SHOULD BE PASSED HERE
}
//----------------------------------------------


// VIEW -----------------------------------------------------------------
function render() {
    // reset the list

    document.getElementById('listid').innerHTML = '';
    todos.forEach(function (todos) {
        const element = document.createElement('div');  // create html element of type div
        element.innerHTML = todos.title + ' ' + todos.dueDate;  //here test changes to todo1
        
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = "Delete";

        deleteButton.style = "margin-left: 15px;";
        deleteButton.onclick = deletetodos;  // delete button is connected with an event
        deleteButton.id =todos.id;     // to link the button to the id
        element.appendChild(deleteButton);

        const todo_list = document.getElementById('listid');
        todo_list.appendChild(element);
    });
}

//-------------------------------------------------------------------------

//CONTROLLER ------------------------------------------------
// responds to the events interaction from the view and tells the model to update
function addtodos() {
    const textbox = document.getElementById('inputid');
    const title = textbox.value;

    const datepicker = document.getElementById('dateid');
    const dueDate = datepicker.value;

    //const id = new Date().getTime(); // gets current time in millisec
                                     // returns a 'number'

    // const id = '' + new Date().getTime();                                 

    // todos.push({
    //     title: title,
    //     dueDate: dueDate,
    //     id: id                      // so here we are storing a 'number' as an id
    // });

    createTodo(title, dueDate);

    render();
}

function deletetodos(event) {
    const deletButton = event.target;
    const idToDelete = deletButton.id;  // but here we are getting id out of a button
                                        // this is 'string' type
                                        // getting from an html element by dom

    // todos = todos.filter( function (todo) {     // false than remove the id from array todo
    //     // if the id of todo matches with the idToDelete then return false

    //     if(todo.id === idToDelete) return false;   // number === string
    //                                                // for items in the array object this will always return false
    //                                                // thats why new items that we add does not get deleted
    //                                                // this is TYPE ERROR 
    //                                                // TYPESCRIPT is used to remove such errors
    //     else return true;
    // });
    removeTODO(idToDelete);
    render();
}
//-----------------------------------------------------------------------

