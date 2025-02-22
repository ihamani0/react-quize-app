import { useReducer } from "react";

const initialState = { count: 0, step: 1 };


const reducerFunction = (state, action) => {
  switch (action.type) {
    case "inc":
      return { ...state , count : state.count + state.step  };
    case "dec":
      return { ...state , count : state.count - state.step };
    case "setCount":
      return { ...state , count : action.payLoad};
    case "setStep":
      return { ...state , step : action.payLoad};
    case "rest":
      return initialState;
    default:
      throw new Error("no action her");
  }
};

function DateCounter() {


  const [state, distpatch] = useReducer(reducerFunction, initialState);
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("june 21 2025");
  date.setDate(date.getDate() + count);

  const dec = function () {
    distpatch({ type: "dec" });
  };

  const inc = function () {
    distpatch({ type: "inc" });
  };

  const defineCount = function (e) {
    // setCount(Number(e.target.value));
    distpatch({ type: "setCount", payLoad: Number(e.target.value) });
  };

  const defineStep = function (e) {
    distpatch({type :'setStep' , payLoad : Number(e.target.value)})
  };

  const reset = function () {
    distpatch({ type: "rest" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
