import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const add_todo = "add_todo";
const delete_todo = "delete_todo";

const addTodo = (text) => {
  return { type: add_todo, text };
};

const deleteTodo = (id) => {
  return { type: delete_todo, id };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case add_todo:
      return [...state, { text: action.text, id: Date.now() }];
    case delete_todo:
      return state.filter((todo) => todo.id !== action.id);
  }
};

const store = createStore(reducer);

const dispatchAddTodo = (text) => {
  store.dispatch(addTodo(text));
};

const dipatchDeleteTodo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteTodo(id));
};

const paintTodo = () => {
  const todos = store.getState();
  ul.innerHTML = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.innerText = "delete";
    button.addEventListener("click", dipatchDeleteTodo);
    li.id = todo.id;
    li.innerText = todo.text;
    ul.appendChild(li);
    li.appendChild(button);
  });
};

store.subscribe(paintTodo);

const onSubmit = (e) => {
  e.preventDefault();
  const todo = input.value;
  input.value = "";
  dispatchAddTodo(todo);
};

form.addEventListener("submit", onSubmit);
