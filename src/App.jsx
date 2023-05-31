import "./App.scss";
import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from "react-router-dom";
import { useContext, useEffect, useRef} from "react";
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

	const logoutTimerRef = useRef(null);

  // Function to handle user activity
  const handleUserActivity = () => {
		if(authCtx.isAuthenticated){

			clearTimeout(logoutTimerRef.current); 
			
			logoutTimerRef.current = setTimeout(() => {
				authCtx.logout()
				console.log('User logged out due to inactivity');
			}, 2 * 60 * 1000);
		}
  };

  useEffect(() => {
		
    const resetTimerOnUserActivity = () => handleUserActivity();

    document.addEventListener('mousemove', resetTimerOnUserActivity);
    document.addEventListener('keydown', resetTimerOnUserActivity);

    return () => {
      clearTimeout(logoutTimerRef.current);
      document.removeEventListener('mousemove', resetTimerOnUserActivity);
      document.removeEventListener('keydown', resetTimerOnUserActivity);
    };
  }, [authCtx.isAuthenticated]);

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
