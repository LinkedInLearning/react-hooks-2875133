import React from "react";
import { UserContext } from "./UserContext";

export default class TodoHeader extends React.Component {
  static contextType = UserContext; // setting our contextType so we can access user information

  render() {
    return (
      <p>
        Eingeloggt als: <strong>{this.context}</strong>
        <br />
        <em>Aktuell vorhandene Einträge: {this.props.todos.length}</em>
      </p>
    );
  }
}
