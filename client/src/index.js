import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Autre, { loader as appLoader } from "./Autre";

import CreateChannel from "./channel/pages/Channel";
import Video from "./channel/pages/Video";
import Upload from "./channel/pages/Upload";
import Channel from "./channel/pages/PageChannel";

import App from "./App";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "new-channel",
				element: <CreateChannel />,
				loader: appLoader,
			},
			{
				path: "video",
				element: <Video />,
				loader: appLoader,
			},
			{
				path: "upload",
				element: <Upload />,
				loader: appLoader,
			},
			{
				path: "channel",
				element: <Channel />,
				loader: appLoader,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
