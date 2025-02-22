/* eslint-disable react/prop-types */

import Button from "./Button";

function FinishScreen({ points, totalPoints, highScore, handleClick }) {
  const percentage = (points / totalPoints) * 100;

  let emoji;
  if (percentage === 100) {
    emoji = "🤩";
  } else if (percentage < 100 && percentage >= 80) {
    emoji = "😎";
  } else if (percentage < 80 && percentage >= 50) {
    emoji = "👌";
  } else if (percentage < 50 && percentage >= 30) {
    emoji = "😬";
  } else if (percentage < 30) {
    emoji = "🤦‍♂️";
  } else {
    emoji = ""; // Default case
  }

  return (
    <>
      <p className="result">
        <span>{emoji}</span> Your Scored Is <b>{points}</b> out of {totalPoints}{" "}
        ( {Math.ceil(percentage)} % ){" "}
      </p>
      <p className="highscore">High Score : {highScore} </p>
      <Button title="restart" handleClick={() => handleClick()} />
    </>
  );
}

export default FinishScreen;
