
import React from "react";
// Shows when no appointment

export default function Empty(props) {
  return(
    <main className="appointment__add">
      <img
        onClick={props.onAdd}
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
      />
    </main>
  )
}