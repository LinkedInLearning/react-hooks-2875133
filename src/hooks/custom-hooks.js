import { useEffect, useReducer } from "react";
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

function todoReducer(todos, action) {
  switch (action.type) {
    case "setTodos":
      return action.todos; // dispatch({ type: 'setTodos', todos: ...})
  }

 throw new Error("type does not exist");
}

export function useTodos() {
  // const [todos, setTodos] = useState([]); // initally empty
  const [todos, dispatch] = useReducer(todoReducer, []);

  useEffect(() => {
    serverFetchTodos().then((allTodos) => {
      dispatch({ type: 'setTodos', todos: allTodos});
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

    dispatch({ type: 'setTodos', todos: optimisticTodos});

    serverAddTodo(todoObj)
      .then(updatedTodos => dispatch({ type: 'setTodos', todos: updatedTodos}));
  }

  function updateTodo(updatedTodoObj) {
    serverUpdateTodo(updatedTodoObj.id, updatedTodoObj)
      .then(updatedTodos => dispatch({ type: 'setTodos', todos: updatedTodos}));
  }

  function removeTodo(todoId) {
    serverRemoveTodo({ id: todoId })
      .then(updatedTodos => dispatch({ type: 'setTodos', todos: updatedTodos}));
  }

  const openTodos = todos.filter(({ isCompleted }) => isCompleted !== true);
  const completedTodos = todos.filter(({ isCompleted }) => isCompleted === true);

  return [todos, addNewTodo, updateTodo, removeTodo, openTodos, completedTodos];
}

