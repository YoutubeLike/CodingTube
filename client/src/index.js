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
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);