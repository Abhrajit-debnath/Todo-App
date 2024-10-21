let todoArray = [];
let btn = document.querySelector(".Delete-btn");

window.onload = function () {
  let storedTodos = JSON.parse(localStorage.getItem("todos"));
  if (storedTodos) {
    todoArray = storedTodos;
  }
  displayTodos();
  toggleDeleteButton();
};

// Display Todos
function displayTodos() {
  let todoList = document.querySelector("#todoList");
  todoList.innerHTML = "";
  let todosHtml = "";

  todoArray.forEach((todo, index) => {
    todosHtml += `
      <li class="flex justify-between items-center w-full py-2 pr-10 cursor-pointer">
        <div class="flex gap-5 todo-box">
          <img src="${
            todo.completed ? "./images/checked.svg" : "./images/checkbox.svg"
          }" alt="checkbox" class="w-6 cursor-pointer todo-check">
          <span class="text-white Todo-List" style="text-decoration: ${
            todo.completed ? "line-through" : "none"
          }" onclick="updateTodo(${index})">${todo.text}</span>
        </div>
        <div class="flex items-center gap-10">
          <span class="text-gray-400">${todo.id}</span>
          <img src="./images/delete.svg" alt="Delete Todo" class="w-6 cursor-pointer" onclick="deleteTodo(${index})">
          <img src="./images/edit.svg" alt="Edit Todo" class="w-6 cursor-pointer" onclick="editTodo(${index})">
        </div>
      </li>`;
  });

  todoList.innerHTML = todosHtml;
}

// Toggle the Delete All Button
function toggleDeleteButton() {
  let storedTodos = localStorage.getItem("todos");
  if (storedTodos && JSON.parse(storedTodos).length > 0) {
    btn.classList.remove("hidden");
    btn.classList.add("block");
  } else {
    btn.classList.remove("block");
    btn.classList.add("hidden");
  }
}

// Add Todo
let addbtn = document.querySelector(".add-btn");
let form = document.querySelector("#todoInput");
addbtn.addEventListener("click", () => {
  const timestamp = Date.now();
  let todoValue = form.value;
  if (!todoValue) {
    return;
  } else {
    let todoObj = {
      id: new Date(timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      text: todoValue,
      completed: false,
    };
    todoArray.push(todoObj);

    localStorage.setItem("todos", JSON.stringify(todoArray));
    form.value = "";
    displayTodos();
    toggleDeleteButton();  // Update button state
  }
});

// Delete Todo
function deleteTodo(index) {
  todoArray = todoArray.filter((_, i) => i !== index);
  displayTodos();
  localStorage.setItem("todos", JSON.stringify(todoArray));
  toggleDeleteButton(); 
}

// Edit Todo
function editTodo(index) {
  const todoItem = todoArray[index];

  const editForm = document.createElement("form");
  editForm.className = "edit-form flex gap-5";

  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.value = todoItem.text;
  inputField.classList =
    "px-3 py-1 text-white border border-gray-300 rounded-md focus:outline-none focus:border-purple-500 font-secondaryfont font-medium bg-transparent";

  const saveBtn = document.createElement("img");
  saveBtn.src = "./images/saved.svg";
  saveBtn.alt = "Save Todo";
  saveBtn.className = "w-8 cursor-pointer";

  editForm.appendChild(inputField);
  editForm.appendChild(saveBtn);

  const todoLi = document.querySelectorAll(".Todo-List")[index];
  todoLi.replaceWith(editForm);

  let isSaved = false;
  saveBtn.addEventListener("click", () => {
    if (!isSaved) {
      todoArray[index].text = inputField.value;

      localStorage.setItem("todos", JSON.stringify(todoArray));

      saveBtn.src = "./images/saved.svg";
      isSaved = true;

      displayTodos();
    }
  });
}

// Update Todo
function updateTodo(index) {
  todoArray[index].completed = !todoArray[index].completed;
  if (todoArray[index].completed) {
    setTimeout(() => {
      deleteTodo(index);
    }, 2000);
  }
  localStorage.setItem("todos", JSON.stringify(todoArray));
  displayTodos();
}

// Delete All Todos
function deleteAll() {
  todoArray = [];
  localStorage.removeItem("todos");
  displayTodos();
  toggleDeleteButton();  
}
