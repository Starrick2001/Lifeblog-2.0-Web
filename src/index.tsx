import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import store from "./redux/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./routes/Root";
import { ErrorPage } from "./routes/ErrorPage";
import { Profile } from "./routes/Profile/Profile";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/profile",
				element: <Profile />
			}
		]
	}
]);

root.render(
	<React.StrictMode>
		<GoogleOAuthProvider
			clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID as string}
		>
			<Provider store={store}>
				<RouterProvider router={router} />
			</Provider>
		</GoogleOAuthProvider>
	</React.StrictMode>
);
