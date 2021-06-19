import ReactDOM from "react-dom";
import { UserContext } from "./UserContext";

import TodoHeader from "./TodoHeader";
import TodoInput from "./TodoInput";
import ListTodos from "./ListTodos";
import { useTodos, useUpdatePageTitle } from "./hooks/custom-hooks";

function App() {
  const [todos, addNewTodo, updateTodo, removeTodo, openTodos, completedTodos] = useTodos(); // initally empty
  useUpdatePageTitle(todos);

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
    </UserContext.Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
