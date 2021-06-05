import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { serverAddTodo } from "./mock-server/serverAddTodo";
import { serverFetchTodos } from "./mock-server/serverFetchTodos";
import { serverUpdateTodo } from "./mock-server/serverUpdateTodo";
import { serverRemoveTodo } from "./mock-server/serverRemoveTodo";

import { UserContext } from "./UserContext";

import TodoHeader from "./TodoHeader";
import TodoInput from "./TodoInput";
import ListTodos from "./ListTodos";
import { randomId } from "./mock-server/util";
import { useUpdatePageTitle } from "./hooks/custom-hooks";

function App() {
  const [todos, setTodos] = useState([]); // initally empty
  useUpdatePageTitle(todos);
  
  function updateTodos(updatedTodos) {
    setTodos(updatedTodos);
  }

  useEffect(() => {
    serverFetchTodos().then((allTodos) => {
      updateTodos(allTodos);
    });
  }, []);

  function addNewTodo(todoObj) {
    const optimisticTodos = [
      ...todos,
      {
        ...todoObj,
        isOptimistic: true,
        id: randomId(), // satisfying reacts "key" requirement
      },
    ];

    updateTodos(optimisticTodos);

    serverAddTodo(todoObj)
      .then(updatedTodos => updateTodos(updatedTodos));
  }

  function setCompletionStateOfTodo(todoObj, isCompleted = false) {
    const updatedTodoObj = {
      ...todoObj,
      isCompleted,
    };

    serverUpdateTodo(todoObj.id, updatedTodoObj)
      .then(updatedTodos => updateTodos(updatedTodos));
  }

  function removeTodo(todoId) {
    serverRemoveTodo({ id: todoId })
      .then(updatedTodos => updateTodos(updatedTodos));
  }

  function openTodos() {
    return todos.filter(({ isCompleted }) => isCompleted !== true);
  }

  function completedTodos() {
    return todos.filter(({ isCompleted }) => isCompleted === true);
  }

  return (
    <UserContext.Provider value="Mx Fisch">
      <h1>Meine Todo App</h1>

      <TodoHeader todos={todos} />

      <TodoInput onAddTodo={(todoObj) => addNewTodo(todoObj)} />

      {todos.length > 0 && (
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
              todos={openTodos()}
              onSetCompletionState={(todoObj, completionState) =>
                setCompletionStateOfTodo(todoObj, completionState)
              }
              onDeleteTodo={todoId => removeTodo(todoId)}
            />

            {/* Dann die bereits abgeschlossenen */}
            <ListTodos
              todos={completedTodos()}
              onSetCompletionState={(todoObj, completionState) =>
                setCompletionStateOfTodo(todoObj, completionState)
              }
              onDeleteTodo={todoId => removeTodo(todoId)}
            />
          </tbody>
        </table>
      )}
    </UserContext.Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
