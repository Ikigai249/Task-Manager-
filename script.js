const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// 1. Initialize App State from LocalStorage
let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];

// 2. Render tasks on load
const renderTasks = () => {
    todoList.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        if (task.completed) li.classList.add('completed');

        li.innerHTML = `
            <span class="task-text" onclick="toggleTask(${index})">${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(${index})">✕</button>
        `;
        todoList.appendChild(li);
    });

    localStorage.setItem('myTasks', JSON.stringify(tasks));
    document.getElementById('empty-state').style.display = tasks.length ? 'none' : 'block';
};

// 3. Add Task Logic
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (text) {
        tasks.push({ text, completed: false });
        todoInput.value = '';
        renderTasks();
    }
});

// 4. Toggle & Delete Logic
window.toggleTask = (index) => {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
};

window.deleteTask = (index) => {
    tasks.splice(index, 1);
    renderTasks();
};

// Set Date Header
document.getElementById('dateDisplay').innerText = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', month: 'short', day: 'numeric' 
});

renderTasks();
