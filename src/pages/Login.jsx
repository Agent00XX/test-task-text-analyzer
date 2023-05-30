import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import useInput from "../hooks/useInput";
import axiosInstance from "../utils/AxiosHelper";
import "../Auth.css";

function Login() {
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
	} = useInput("", (value) => value !== "" && value.length >= 5);

	const loginHandler = async (e) => {
		e.preventDefault();

		emailInputBlurHandler();
		passwordInputBlurHandler();

		if (!enteredEmail || !(enteredPassword.length >= 5)) {
			return;
		}

		const response = await axiosInstance.get(`users?email=${enteredEmail}&password=${enteredPassword}`);

		console.log({response});
		if (response.status === 200) {
			toast.success("Successfully logged in!");
			localStorage.setItem("user", response.data);
			authCtx.login(response.data);
			navigate("/home");
		}
	};
	return (
		<div id="app">
			<div className="container">
				<header>
					<div className={"header-headings"}>
						<span>Sign in to your account</span>
					</div>
				</header>

				<form className="account-form" onSubmit={loginHandler}>

					<div className={"account-form-fields"}>
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
							<p className="error-text">
								Please enter atleast 8 character!
							</p>
						)}

					</div>

					<button className="btn-submit-form" type="submit">
						Sign in
					</button>
				</form>

				<div className="btn-submit-form" style={{ marginTop: "100px" }}>
					<Link to="/signUp">Create new account</Link>
				</div>
			</div>
		</div>
	);
}

export default Login;
