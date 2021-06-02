import React, { useState } from "react";
import ReactDOM from "react-dom";
import { serverAddTodo } from "./mock-server/serverAddTodo";
import { serverFetchTodos } from "./mock-server/serverFetchTodos";
import { serverUpdateTodo } from "./mock-server/serverUpdateTodo";

import { UserContext } from './UserContext';

import TodoHeader from "./TodoHeader";
import TodoAdder from "./TodoAdder";
import ListTodos from "./ListTodos";
class App extends React.Component {
  state = {
    todos: [], // initally empty
  };

  updateTodos(updatedTodos) {
    this.setState({
      ...this.state,
      todos: updatedTodos,
    });
  }

  componentDidMount() { // useEffect, no Deps
    serverFetchTodos().then((allTodos) => {
      this.updateTodos(allTodos);
    });
  }

  updatePageTitle() {
    document.title = `Es gibt ${this.state.todos.length} Todos`;
  }

  componentDidUpdate() { // useEffect, deps
    this.updatePageTitle();
  }

  addNewTodo(todoObj) {
    const optimisticTodos = [
      ...this.state.todos,
      {
        ...todoObj,
        isOptimistic: true,
      },
    ];

    this.updateTodos(optimisticTodos);

    serverAddTodo(todoObj).then((updatedTodos) => {
      this.updateTodos(updatedTodos);
    });
  }

  setCompletionStateOfTodo(todoObj, isCompleted = false) {
    const updatedTodoObj = {
      ...todoObj,
      isCompleted,
    };

    serverUpdateTodo(todoObj.id, updatedTodoObj).then((updatedTodos) => {
      this.updateTodos(updatedTodos);
    });
  }

  get openTodos() {
    return this.state.todos.filter(({ isCompleted }) => isCompleted !== true);
  }

  get completedTodos() {
    return this.state.todos.filter(({ isCompleted }) => isCompleted === true);
  }

  render() {
    return (
      <UserContext.Provider value="Mx Fisch">
        <h1>Meine Todo App</h1>

        <TodoHeader todos={this.state.todos} />

        <TodoAdder onAddTodo={(todoObj) => this.addNewTodo(todoObj)} />

        {this.state.todos.length > 0 && (
          <table>
            <thead>
              <tr>
                <th className="span-100">Todo</th>
                <th className="span-100">Kategorie</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* Alle offenen Todos zuerst */}
              <ListTodos
                todos={this.openTodos}
                onSetCompletionState={(todoObj, completionState) =>
                  this.setCompletionStateOfTodo(todoObj, completionState)
                }
              />

              {/* Dann die bereits abgeschlossenen */}
              <ListTodos
                todos={this.completedTodos}
                onSetCompletionState={(todoObj, completionState) =>
                  this.setCompletionStateOfTodo(todoObj, completionState)
                }
              />
            </tbody>
          </table>
        )}
      </UserContext.Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
