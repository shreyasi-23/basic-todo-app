import "./style.css";

// Define the state of our app
let todos = [
  { id: 1, text: "Buy milk", completed: false },
  { id: 2, text: "Buy bread", completed: false },
  { id: 3, text: "Buy jam", completed: true }
];
let nextTodoId = 4;
let filter = "all";

// Helper function to filter todos based on the current filter setting
const filterTodos = (todos, filter) => {
  if (filter === "active") {
    return todos.filter((todo) => !todo.completed);
  } else if (filter === "completed") {
    return todos.filter((todo) => todo.completed);
  } else {
    return [...todos];
  }
};

// Helper function to create todo text element
const createTodoText = (todo) => {
  const todoText = document.createElement("div");
  todoText.id = `todo-text-${todo.id}`;
  todoText.classList.add("todo-text");
  todoText.textContent = todo.text;
  if (todo.completed) {
    todoText.classList.add("line-through");
  }
  return todoText;
};

// Helper function to create todo edit input element
const createTodoEditInput = (todo) => {
  const todoEdit = document.createElement("input");
  todoEdit.classList.add("hidden", "todo-edit");
  todoEdit.value = todo.text;
  return todoEdit;
};

// Helper function to create a todo item
const createTodoItem = (todo) => {
  const todoItem = document.createElement("div");
  todoItem.classList.add("p-4", "todo-item");
  todoItem.append(createTodoText(todo), createTodoEditInput(todo));
  return todoItem;
};

// Function to render the todos
const renderTodos = () => {
  const todoListElement = document.getElementById("todo-list");
  todoListElement.replaceChildren(
    ...filterTodos(todos, filter).map(createTodoItem)
  );
};

// Event listener to initialise the app after the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", renderTodos);

const addTodo = (todos, newTodoText) => [
  ...todos,
  { id: nextTodoId++, text: newTodoText, completed: false }
];

// Event handler to create a new todo item
const handleNewTodoKeyDown = (event) => {
  const newTodoInput = event.target;
  const todoText = newTodoInput.value.trim();
  if (event.key === "Enter" && todoText !== "") {
    todos = addTodo(todos, todoText);
    newTodoInput.value = ""; // clear the input
    renderTodos();
  }
};

const newTodoInput = document.getElementById("new-todo");
newTodoInput.addEventListener("keydown", handleNewTodoKeyDown);

// Event handler to filter the todos based on the navbar selection
const handleClickOnNavbar = (event) => {
  // if the clicked element is an anchor tag
  if (event.target.tagName === "A") {
    const hrefValue = event.target.href;
    filter = hrefValue.split("/").pop() || "all";
    renderTodos();
    renderTodoNavBar(hrefValue);
  }
}

const todoNav = document.getElementById("todo-nav");
todoNav.addEventListener("click", handleClickOnNavbar);

// Helper function to update the class list of a navbar element
const updateClassList = (element, isActive) => {
  const classes = [
    "underline",
    "underline-offset-4",
    "decoration-rose-800",
    "decoration-2"
  ];
  if (isActive) {
    element.classList.add(...classes);
  } else {
    element.classList.remove(...classes);
  }
};

// Function to update the navbar anchor elements
const renderTodoNavBar = (href) => {
  const elements = todoNav.children;
  Array.from(elements).forEach((element) => {
    updateClassList(element, element.href === href);
  });
};

// Helper function to toggle the completed status of a todo item
const toggleTodo = (todos, todoId) =>
  todos.map((todo) =>
    todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
  );

// Event handler to toggle the completed status of a todo item
const handleClickOnTodoList = (event) => {
  if (event.target.id.includes("todo-text")) {
    const todoId = event.target.id.split("-").pop();
    const todoIdNumber = Number(todoId);
    todos = toggleTodo(todos, todoIdNumber);
    renderTodos();
  }
};

const todoListElement = document.getElementById("todo-list");
todoListElement.addEventListener("click", handleClickOnTodoList);