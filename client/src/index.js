import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App" 
import Short from "./short/index"
import Mainpage from "./timeline/pages/mainpage";
import History from "./timeline/pages/history";
import Subscribe from "./timeline/pages/subscribe";
import Trends from "./timeline/pages/trends";
import Yourvideos from "./timeline/pages/yourVideos";
import Watch from "./timeline/pages/watch";
import CreateChannel from "./channel/pages/Channel";
import Video from "./channel/pages/Video";
import Upload from "./channel/pages/Upload";
import Channel from "./channel/pages/PageChannel";
import Authentification from "./profil/Pages/Authentification";
import Live from './live/index'
import UserLive, { loader as LoaderLive } from "./live/UserLive";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Authentification />
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Mainpage />
      },
      {
        path: "live",
        element: <Live />
      },
      {
        path: "live/:user",
        element: <UserLive />,
        loader: LoaderLive
      },
      {
        path: "/history",
        element: <History />,
      },
      {
        path: "/shorts",
        element: <Short />,
      },
      {
        path: "/subscribe",
        element: <Subscribe />,
      },
      {
        path: "/trends",
        element: <Trends />,
      },
      {
        path: "/channel",
        element: <Channel />,
      },
      {
        path: "/videos",
        element: <Yourvideos />,
      },
      {
        path: "/watch",
        element: <Watch />
      },
      {
				path: "new-channel",
				element: <CreateChannel />,
			},
			{
				path: "video",
				element: <Video />,
			},
			{
				path: "upload",
				element: <Upload />,
			},
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
