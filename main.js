let tasks = [];

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();

  if (taskText === '') {
    alert('Please enter a task!');
    return;
  }

  const task = {
    id: Date.now(),
    text: taskText,
    completed: false
  };

  tasks.push(task);
  taskInput.value = '';
  displayTasks();
}

function displayTasks() {
  const taskList = document.getElementById('taskList');

  if (!taskList) return;

  if (tasks.length === 0) {
    taskList.innerHTML = '<p style="text-align: center; color: #666;">No tasks yet. Add your first task above!</p>';
    return;
  }

  taskList.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task-item';
    if (task.completed) {
      li.classList.add('completed');
    }

    li.innerHTML = `
      <span>${task.text}</span>
      <div class="task-actions">
        <button class="complete-btn" onclick="toggleTask(${task.id})">
          ${task.completed ? 'Undo' : 'Complete'}
        </button>
        <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

function toggleTask(id) {
  tasks = tasks.map(task => {
    if (task.id === id) {
      task.completed = !task.completed;
    }
    return task;
  });
  displayTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  displayTasks();
}

function validateForm(event) {
  event.preventDefault();

  let isValid = true;

  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const message = document.getElementById('message');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const phoneError = document.getElementById('phoneError');
  const messageError = document.getElementById('messageError');

  nameError.textContent = '';
  emailError.textContent = '';
  phoneError.textContent = '';
  messageError.textContent = '';

  name.classList.remove('error');
  email.classList.remove('error');
  phone.classList.remove('error');
  message.classList.remove('error');

  if (name.value.trim() === '') {
    nameError.textContent = 'Name is required';
    name.classList.add('error');
    isValid = false;
  }

  if (email.value.trim() === '') {
    emailError.textContent = 'Email is required';
    email.classList.add('error');
    isValid = false;
  } else if (!isValidEmail(email.value)) {
    emailError.textContent = 'Please enter a valid email address';
    email.classList.add('error');
    isValid = false;
  }

  if (phone.value.trim() === '') {
    phoneError.textContent = 'Phone number is required';
    phone.classList.add('error');
    isValid = false;
  } else if (!isValidPhone(phone.value)) {
    phoneError.textContent = 'Phone number should contain only digits';
    phone.classList.add('error');
    isValid = false;
  }

  if (message.value.trim() === '') {
    messageError.textContent = 'Message is required';
    message.classList.add('error');
    isValid = false;
  }

  if (isValid) {
    document.getElementById('successMessage').classList.add('show');
    document.getElementById('contactForm').reset();

    setTimeout(() => {
      document.getElementById('successMessage').classList.remove('show');
    }, 5000);
  }

  return false;
}

function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function isValidPhone(phone) {
  const phonePattern = /^[0-9]+$/;
  return phonePattern.test(phone.replace(/[\s\-\(\)]/g, ''));
}

if (document.getElementById('taskList')) {
  displayTasks();
}