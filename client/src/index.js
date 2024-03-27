import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App" 
import Short from "./short/index"
import Mainpage from "./timeline/pages/mainpage";
import History from "./timeline/pages/history";
import GridSubscribe from "./timeline/pages/subscribe/subscribeGrid";
import ListSubscribe from "./timeline/pages/subscribe/subscribeList";
import Trends from "./timeline/pages/trends";
import Yourvideos from "./timeline/pages/yourVideos";
import Watch from "./timeline/pages/watch";
import CreateChannel from "./channel/pages/NewChannel";
import Video from "./channel/pages/Video";
import Upload from "./channel/pages/Upload";
import Channel from "./channel/pages/Channel";
import Authentification from "./profil/Pages/Authentification";
import Live from './live/index'
import UserLive, { loader as LoaderLive } from "./live/UserLive";
import Test from "./live/widget";
import You from "./timeline/pages/you";
import ChangeTitle from "./live/ChangeTitle"
//import PageChannel from "./channel/pages/Channel";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Authentification />
  },
  {
    path: "/live/widget",
    element: <Test />
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
        path: "/feed/subscriptions/grid",
        element: <GridSubscribe />,
      },
      {
        path: "/feed/subscriptions/list",
        element: <ListSubscribe />,
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
      {
				path: "/you",
				element: <You />,
			},
      {
        path: "changeTitle",
        element: <ChangeTitle />,
      },
      // {
			// 	path: "/PageChannel",
			// 	element: <PageChannel />,
			// },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	// <React.StrictMode>
		<RouterProvider router={router} />
	// </React.StrictMode>
);
