import React from "react";

export default function ListTodos(props) {
  return props.todos.map((todoObj) => {
    const { id, title, category, isCompleted, isOptimistic } = todoObj;

    return (
      <tr className={isOptimistic ? "is-optimistic" : ""} key={id}>
        <td>
          <label>
            <input
              type="checkbox"
              value={true}
              checked={isCompleted}
              onChange={() =>
                props.onSetCompletionState(todoObj, !isCompleted)
              }
            />

            <div className="pad-left-10">
              {isCompleted && <strike>{title}</strike>}
              {!isCompleted && <strong>{title}</strong>}
            </div>
          </label>
        </td>
        <td>{category}</td>
        <td>
          <button
            type="button"
            onClick={() => props.onDeleteTodo(todoObj.id)}
          >
            löschen
          </button>
        </td>
      </tr>
    );
  });
}
