import React, { useState } from "react";

export default function TodoInput(props) {
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState("Privat");

  function submitTodo(submitEvent) {
    submitEvent.preventDefault();
    
    props.onAddTodo({
      title: inputValue,
      category: selectValue,
    });

    setInputValue("");
  }

  function updateInputValue(changeEvent) {
    setInputValue(changeEvent.target.value);
  }

  function updateSelectValue(changeEvent) {
    setSelectValue(changeEvent.target.value);
  }

  return (
    <form onSubmit={(submitEvent) => submitTodo(submitEvent)}>
      <div className="row">
        <div className="column column-75">
          <input
            value={inputValue}
            onChange={(changeEvent) => updateInputValue(changeEvent)}
            type="text"
            placeholder="Todo hinzufügen"
          />
        </div>
        <div className="column column-25">
          <select
            defaultValue={selectValue}
            onChange={(changeEvent) => updateSelectValue(changeEvent)}
          >
            <option value="Privat">Privat</option>
            <option value="Business">Business</option>
          </select>
        </div>
      </div>

      <button role="button">Hinzufügen</button>
    </form>
  );
}
