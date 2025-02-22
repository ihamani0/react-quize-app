/* eslint-disable react/prop-types */

import Options from "./Options";

function Questions({ Question, answer, dispatch }) {

  return (
    <div>
      <h4>{Question.question}</h4>
      <Options Question={Question} answer={answer} dispatch={dispatch} />
    </div>
  );
}

export default Questions;
