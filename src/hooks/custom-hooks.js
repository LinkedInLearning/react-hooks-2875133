import { useEffect, useState } from "react";
import { serverAddTodo } from "../mock-server/serverAddTodo";
import { serverFetchTodos } from "../mock-server/serverFetchTodos";
import { serverRemoveTodo } from "../mock-server/serverRemoveTodo";
import { serverUpdateTodo } from "../mock-server/serverUpdateTodo";
import { randomId } from "../mock-server/util";

export function useUpdatePageTitle(todos) {
  useEffect(() => {
    document.title = `Es gibt ${todos.length} Todos`;
  });
}

export function useTodos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    serverFetchTodos().then((allTodos) => {
      setTodos(allTodos);
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

    setTodos(optimisticTodos);

    serverAddTodo(todoObj)
      .then(updatedTodos => setTodos(updatedTodos));
  }

  function updateTodo(updatedTodoObj) {
    serverUpdateTodo(updatedTodoObj.id, updatedTodoObj)
      .then(updatedTodos => setTodos(updatedTodos));
  }

  function removeTodo(todoId) {
    serverRemoveTodo({ id: todoId })
      .then(updatedTodos => setTodos(updatedTodos));
  }

  const openTodos = todos.filter(({ isCompleted }) => isCompleted !== true);
  const completedTodos = todos.filter(({ isCompleted }) => isCompleted === true);

  return [todos, addNewTodo, updateTodo, removeTodo, openTodos, completedTodos];
}