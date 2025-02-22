/* eslint-disable react/prop-types */

import Button from "./Button";

export default function StartScreen({ NumberOfQuestion, dispatch }) {
  return (
    <div className="start">
      <h2>Welecome To React Quize</h2>
      <h3>{NumberOfQuestion} Question You Have to Answer</h3>
      
      {/* <button
        onClick={() => dispatch({ type: "start" })}
        className="btn btn-ui"
      >
        Let Start
      </button> */}

      <Button title="Let's Start" handleClick={() => dispatch({ type: "start" })} />
    </div>
  );
}
