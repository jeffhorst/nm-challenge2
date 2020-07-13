import React from "react";

function Filter(props) {
  return (
    <div>
      <input onChange={props.handleInput} type="text"></input>
    </div>
  );
}

export default Filter;
