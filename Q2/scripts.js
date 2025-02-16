const tasks = [];
const taskInput = document.getElementById('task-input');
const prioritySelect = document.getElementById('priority-select');
const addTaskBtn = document.getElementById('add-task-btn');
const highPriorityList = document.getElementById('high-priority');
const mediumPriorityList = document.getElementById('medium-priority');
const lowPriorityList = document.getElementById('low-priority');
const completedList = document.getElementById('completed-list');
const incompleteCount = document.getElementById('incomplete-count');
const searchInput = document.getElementById('search-input');
const filterPriority = document.getElementById('filter-priority');
const toggleDarkModeBtn = document.getElementById('toggle-dark-mode');

const renderTasks = () => {
    const searchQuery = searchInput.value.toLowerCase();
    const selectedPriority = filterPriority.value;

    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.name.toLowerCase().includes(searchQuery);
        const matchesPriority = selectedPriority === 'All' || task.priority === selectedPriority;
        return matchesSearch && matchesPriority;
    });

    highPriorityList.innerHTML = '';
    mediumPriorityList.innerHTML = '';
    lowPriorityList.innerHTML = '';
    completedList.innerHTML = '';

    filteredTasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = `task ${task.completed ? 'completed' : ''}`;
        taskElement.innerHTML = `
            <span>${task.name} (${task.priority})</span>
            <div>
                <button onclick="toggleComplete(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;

        if (task.completed) {
            completedList.appendChild(taskElement);
        } else {
            if (task.priority === 'High') highPriorityList.appendChild(taskElement);
            else if (task.priority === 'Medium') mediumPriorityList.appendChild(taskElement);
            else lowPriorityList.appendChild(taskElement);
        }
    });

    incompleteCount.textContent = tasks.filter(task => !task.completed).length;
};

const addTask = () => {
    const taskName = taskInput.value.trim();
    if (!taskName) return;

    const newTask = {
        id: Date.now(),
        name: taskName,
        priority: prioritySelect.value,
        completed: false
    };

    tasks.push(newTask);
    taskInput.value = '';
    renderTasks();
};

const toggleComplete = (id) => {
    const task = tasks.find(task => task.id === id);
    task.completed = !task.completed;
    renderTasks();
};

const deleteTask = (id) => {
    const taskIndex = tasks.findIndex(task => task.id === id);
    tasks.splice(taskIndex, 1);
    renderTasks();
};

const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
};

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});
searchInput.addEventListener('input', renderTasks);
filterPriority.addEventListener('change', renderTasks);
toggleDarkModeBtn.addEventListener('click', toggleDarkMode);

renderTasks();