import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

import { UserContext } from "./UserContext";

import TodoHeader from "./TodoHeader";
import TodoInput from "./TodoInput";
import ListTodos from "./ListTodos";
import { useTodos, useUpdatePageTitle } from "./hooks/custom-hooks";

function App() {
  const inputField = useRef(null);
  const tbody = useRef(null);
  const [height, setHeight] = useState(null);
  const [todos, addNewTodo, updateTodo, removeTodo, openTodos, completedTodos] = useTodos(); // initally empty
  useUpdatePageTitle(todos);

  //#region useLayoutEffect vs useEffect
  useLayoutEffect(() => {
    if (tbody.current && todos.length > 0) {
      setHeight(getComputedStyle(tbody.current).height);
    } else {
      setHeight(null);
    }
    console.log('Hallo useLayoutEffect!', tbody.current);
  }, [todos]);

  useEffect(() => {
    // if (tbody.current) {
    //   setHeight(getComputedStyle(tbody.current).height);
    // }
    console.log('Hallo useEffect!')
  }, [todos]);
  //#endregion 

  function setCompletionStateOfTodo(todoObj, isCompleted = false) {
    const updatedTodoObj = {
      ...todoObj,
      isCompleted,
    };

    updateTodo(updatedTodoObj);
  }

  return (
    <UserContext.Provider value="Mx Fisch">
      <h1>Meine Todo App</h1>

      <TodoHeader todos={todos} />

      <TodoInput ref={inputField} onAddTodo={(todoObj) => addNewTodo(todoObj)} />

      {height !== null ? <div>Aktuelle Höhe der Todo Elemente: {height}</div> : null}
      {todos.length > 0 && (
        <table>
          <thead>
            <tr>
              <th className="span-100">Todo</th>
              <th className="span-100">Kategorie</th>
              <th></th>
            </tr>
          </thead>
          <tbody ref={tbody}>
            {/* Alle offenen Todos zuerst */}
            <ListTodos
              todos={openTodos}
              onSetCompletionState={(todoObj, completionState) =>
                setCompletionStateOfTodo(todoObj, completionState)
              }
              onDeleteTodo={todoId => removeTodo(todoId)}
            />

            {/* Dann die bereits abgeschlossenen */}
            <ListTodos
              todos={completedTodos}
              onSetCompletionState={(todoObj, completionState) =>
                setCompletionStateOfTodo(todoObj, completionState)
              }
              onDeleteTodo={todoId => removeTodo(todoId)}
            />
          </tbody>
        </table>
      )}

      <button role="button" className="button-outline" onClick={() => inputField.current.focus()}>Focus input field</button>
    </UserContext.Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
