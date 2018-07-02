//define UI variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector("#task");

//load event listeners
loadEventListeners();

function loadEventListeners() {
    //DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    //add task event
    form.addEventListener('submit', addTask);
    //remove task event
    taskList.addEventListener('click', removeTask);
    //clear tasks
    clearBtn.addEventListener('click', clearTasks);
    filter.addEventListener('keyup', filterTasks);
}

//get tasks
function getTasks(params) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task) {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
        //create link element, add class
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
        li.appendChild(link);
        //append li to ul
        taskList.appendChild(li);
    })    
}
//add task
function addTask(e) {
    if (taskInput.value == '') {
        alert('Add a task');
    }
    //create li element, add class to it
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));
    //create link element, add class
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
    li.appendChild(link);
    //append li to ul
    taskList.appendChild(li);

    //store task in local storage
    storeTaskInLocalStorage(taskInput.value);

    //clear input
    taskInput.value = '';

    e.preventDefault();
}

//store task in local storage
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//remove task - using event delegation
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();
            //remove task from storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

function removeTaskFromLocalStorage(taskItem) {
    console.log(taskItem);
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//clear tasks 
function clearTasks() {
    // https://jsperf.com/innerhtml-vs-removechild
    // removeChild is faster than clearing out innnerHTML
    // taskList.innerHTML = '';
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    clearTasksFromLocalStorage();

}

function clearTasksFromLocalStorage() {
    localStorage.clear();
}

//filter tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    //query selector returns a nodelist not an html collection
    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
    
}

