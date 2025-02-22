/* eslint-disable react/prop-types */

function Options({ Question, answer, dispatch }) {
  //this bool variable is to test if user has answer or Not depending on the state of answer
  const hadAnswerdTheUser = answer !== null;
  return (
    <div className="options">
      {Question.options.map((option, index) => (
        <button
          key={option}
          className={` btn btn-option ${
            hadAnswerdTheUser
              ? index === Question.correctOption
                ? "correct"
                : "wrong"
              : ""
          } 
          ${
            answer === index ? 'answer' : ''
          }
          `}
          onClick={() => dispatch({ type: "answer-question", payload: index })}
          disabled={hadAnswerdTheUser}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
