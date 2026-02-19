import "./style.css";
import TodoApp from "./todo-app.js";

document.addEventListener("DOMContentLoaded", () => {
  const todoApp = new TodoApp();
  todoApp.renderTodos();
});