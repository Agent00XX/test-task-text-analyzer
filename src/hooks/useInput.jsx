import { useEffect, useState } from "react";

const useInput = (defaultState, validate) => {
  const [enteredInput, setEnteredInput] = useState(defaultState);
  const [inputBlur, setInputBlur] = useState(false);

  const enteredInputIsValid = validate(enteredInput);
  const enteredInputIsInvalid = !enteredInputIsValid && inputBlur;

  useEffect(() => {
    setEnteredInput(defaultState);
  }, [defaultState]);

  const enteredInputChangeHandler = (e) => {
    setEnteredInput(e.target.value);
  };

  const enteredInputBlurHandler = () => {
    setInputBlur(true);
  };

  const resetInput = () => {
    setEnteredInput("");
    setInputBlur(false);
  };

  return {
    enteredInput,
    inputValid: enteredInputIsValid,
    inputInvalid: enteredInputIsInvalid,
    changeHandler: enteredInputChangeHandler,
    blurHandler: enteredInputBlurHandler,
    reset: resetInput,
  };
};

export default useInput;
