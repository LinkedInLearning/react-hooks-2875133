import React from "react";

export default class ListTodos extends React.Component {
  render() {
    return this.props.todos.map((todoObj) => {
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
                  this.props.onSetCompletionState(todoObj, !isCompleted)
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
              onClick={() => this.props.onDeleteTodo(todoObj.id)}
            >
              löschen
            </button>
          </td>
        </tr>
      );
    });
  }
}
