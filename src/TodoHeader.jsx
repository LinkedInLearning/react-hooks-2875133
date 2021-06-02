import React, { useContext } from "react";
import { UserContext } from "./UserContext";

export default function TodoHeader(props) {
  const username = useContext(UserContext);

  return (
    <p>
      Eingeloggt als: <strong>{username}</strong>
      <br />
      <em>Aktuell vorhandene Einträge: {props.todos.length}</em>
    </p>
  );
}
