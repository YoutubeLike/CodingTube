import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Autre, {loader as appLoader} from './Autre'
import App from "./App" 
import Mainpage from "./timeline/pages/mainpage";
import History from "./timeline/pages/history";
import Shorts from "./timeline/pages/shorts";
import Subscribe from "./timeline/pages/subscribe";
import Trends from "./timeline/pages/trends";
import Yourchannel from "./timeline/pages/yourChannel";
import Yourvideos from "./timeline/pages/yourVideos";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children : [
      {
        path: "contact/:test",
        
        element: <Autre />,
        loader: appLoader
      },
      {
        path: "contact/",
        element: <App />
      },
      {
        path: "/",
        element: <Mainpage />
      },
      {
        path: "/history",
        element: <History />,
      },
      {
        path: "/shorts",
        element: <Shorts />,
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
        element: <Yourchannel />,
      },
      {
        path: "/videos",
        element: <Yourvideos />,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);