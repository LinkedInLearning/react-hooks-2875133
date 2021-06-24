import React from "react";

export default class TodoInput extends React.Component {
  state = {
    inputValue: "",
    selectValue: "Privat",
  };

  submitTodo(submitEvent) {
    submitEvent.preventDefault();
    
    this.props.onAddTodo({
      title: this.state.inputValue,
      category: this.state.selectValue,
    });

    this.setState({ inputValue: "" });
  }

  updateInputValue(changeEvent) {
    this.setState({ inputValue: changeEvent.target.value });
  }

  updateSelectValue(changeEvent) {
    this.setState({ selectValue: changeEvent.target.value });
  }

  render() {
    return (
      <form onSubmit={(submitEvent) => this.submitTodo(submitEvent)}>
        <div className="row">
          <div className="column column-75">
            <input
              value={this.state.inputValue}
              onChange={(changeEvent) => this.updateInputValue(changeEvent)}
              type="text"
              placeholder="Todo hinzufügen"
            />
          </div>
          <div className="column column-25">
            <select
              defaultValue={this.state.selectValue}
              onChange={(changeEvent) => this.updateSelectValue(changeEvent)}
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
}
