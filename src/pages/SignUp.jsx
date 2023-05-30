import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import useInput from "../hooks/useInput";
import axiosInstance from "../utils/AxiosHelper";
import "../Auth.css";

function SignUp() {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  let {
    enteredInput: enteredEmail,
    inputInvalid: emailInputIsInvalid,
    blurHandler: emailInputBlurHandler,
    changeHandler: emailInputChangeHandler,
  } = useInput("", (value) => value !== "");

  let {
    enteredInput: enteredPassword,
    inputInvalid: passwordInputIsInvalid,
    blurHandler: passwordInputBlurHandler,
    changeHandler: passwordInputChangeHandler,
  } = useInput("", (value) => value !== "" && value.length >= 8);

  let {
    enteredInput: enteredConfirmPassword,
    inputInvalid: confirmPasswordInputIsInvalid,
    blurHandler: confirmPasswordInputBlurHandler,
    changeHandler: confirmPasswordInputChangeHandler,
  } = useInput("", (value) => value === enteredPassword && value.length >= 8);

  let {
    enteredInput: enteredName,
    inputInvalid: nameInputIsInvalid,
    blurHandler: nameInputBlurHandler,
    changeHandler: nameInputChangeHandler,
  } = useInput("", (value) => value !== "");

  const signUpHandler = async (e) => {
    e.preventDefault();

    nameInputBlurHandler();
    emailInputBlurHandler();
    passwordInputBlurHandler();
    confirmPasswordInputBlurHandler();

    if (
      (!enteredName && !enteredEmail) ||
      !(enteredPassword.length >= 8) ||
      enteredPassword !== enteredConfirmPassword
    ) {
      return;
    }

    const response = await axiosInstance.post("users", {
      email: enteredEmail,
      password: enteredPassword,
      passwordConfirm: enteredConfirmPassword,
      name: enteredName,
    });
    console.log({response});
    if (response.status === 201) {
      toast.success("Successfully logged in!");
      localStorage.setItem("user", JSON.stringify(response.data));
      authCtx.login(response.data);
      navigate("/home");
    }
  };

  return (
    <div id="app">
      <div className="container">
        <header>
          <div className={"header-headings"}>
            <span>
              Create new account
            </span>
          </div>
        </header>

        <form className="account-form" onSubmit={signUpHandler}>

          <div className={"account-form-fields"}>
            <input
              id="name"
              name="name"
              type="name"
              placeholder="Name"
              value={enteredName}
              onChange={nameInputChangeHandler}
              onBlur={nameInputBlurHandler}
            />
            {nameInputIsInvalid && (
              <p className="error-text">Please enter valid name address!</p>
            )}
            <input
              id="email"
              name="email"
              type="email"
              placeholder="E-mail"
              value={enteredEmail}
              onChange={emailInputChangeHandler}
              onBlur={emailInputBlurHandler}
            />
            {emailInputIsInvalid && (
              <p className="error-text">Please enter valid email address!</p>
            )}
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={enteredPassword}
              onChange={passwordInputChangeHandler}
              onBlur={passwordInputBlurHandler}
            />
            {passwordInputIsInvalid && (
              <p className="error-text">Please enter atleast 8 character!</p>
            )}
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
              value={enteredConfirmPassword}
              onChange={confirmPasswordInputChangeHandler}
              onBlur={confirmPasswordInputBlurHandler}
            />
            {confirmPasswordInputIsInvalid && (
              <p className="error-text">Password should be match!</p>
            )}
          </div>

          <button className="btn-submit-form" type="submit">
            Sign Up
          </button>
        </form>
        <div className="btn-submit-form" style={{ marginTop: "100px" }}>
          <Link to="/login">Already have an account</Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
