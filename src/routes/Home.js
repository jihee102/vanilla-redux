import React, { useState } from "react";
import { connect } from "react-redux";
import ToDo from "../components/ToDo";
import { add, remove } from "../store";

function Home({ todos, addTodo }) {
  const [text, setText] = useState("");
  function onChange(e) {
    setText(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    setText("");
    addTodo(text);
  }
  return (
    <div>
      <h1>To Do</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onChange} />
        <button>Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <ToDo {...todo} key={todo.id} />
        ))}
      </ul>
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  return { todos: state };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    addTodo: (text) => dispatch(add(text)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
