import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

import { UserContext } from "./UserContext";

import TodoHeader from "./TodoHeader";
import TodoInput from "./TodoInput";
import ListTodos from "./ListTodos";
import { useTodos, useUpdatePageTitle } from "./hooks/custom-hooks";

function App() {
  const tableContainer = useRef(null);
  const [tableHeight, setTableHeight] = useState(0);

  const inputFieldContainer = useRef(null);
  const inputField = inputFieldContainer.current;

  const [todos, addNewTodo, updateTodo, removeTodo, openTodos, completedTodos] = useTodos(); // initally empty
  useUpdatePageTitle(todos);

  function setCompletionStateOfTodo(todoObj, isCompleted = false) {
    const updatedTodoObj = {
      ...todoObj,
      isCompleted,
    };

    updateTodo(updatedTodoObj);
  }

  useLayoutEffect(() => {
    if (tableContainer.current !== null) {
      const { height } = window.getComputedStyle(tableContainer.current);
      setTableHeight(height);
    }
  }, [todos]);

  return (
    <UserContext.Provider value="Mx Fisch">
      <h1>Meine Todo App</h1>

      <TodoHeader todos={todos} />

      <TodoInput ref={inputFieldContainer} onAddTodo={(todoObj) => addNewTodo(todoObj)} />

      <div hidden={tableHeight === 0} style={{ width: '100%', height: '500px', background: 'yellow'}}>
        Höhe der Tabelle {tableHeight}
      </div>

      {todos.length > 0 && (
        <table ref={tableContainer}>
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

      <button role="button" 
        className="button-outline" 
        onClick={() => inputField.focus()}>
          Springe ins Input-Feld
      </button>
    </UserContext.Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
