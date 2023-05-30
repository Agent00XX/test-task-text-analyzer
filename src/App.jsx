import "./App.scss";
import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from "react-router-dom";
import { useContext} from "react";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ErrorPage from "./components/ErrorPage";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Navigate to={"/home"} />,
	},
	{
		path: "/home",
		element: <Home />,
	},
	{
		path: "*",
		element: <Navigate to={"/home"} />,
	},
]);

const authRouter = createBrowserRouter([
	{
		path: "/",
		element: <Login />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/signUp",
		element: <SignUp />,
	},
	{
		path: "*",
		element: <Navigate to={"/"} />,
	},
]);

function App() {
	const authCtx = useContext(AuthContext);

	return (
		<div className="App">
			{authCtx.isAuthenticated ? (
				<RouterProvider router={router} />
			) : (
				<RouterProvider router={authRouter} />
			)}
			<ToastContainer />
		</div>
	);
}

export default App;
