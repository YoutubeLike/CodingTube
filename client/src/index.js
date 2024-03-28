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

import Trends from "./timeline/pages/categories/trends";
import Cultivations from "./timeline/pages/categories/cultivations";
import Musics from "./timeline/pages/categories/musics";
import News from "./timeline/pages/categories/news";
import Podcasts from "./timeline/pages/categories/podcasts";
import Sports from "./timeline/pages/categories/sports";
import VideoGames from "./timeline/pages/categories/videoGames";


import Yourvideos from "./timeline/pages/yourVideos";
import Watch from "./timeline/pages/watch";
import CreateChannel from "./channel/pages/NewChannel";
import Video from "./channel/pages/Video";
import Upload from "./channel/pages/Upload";
import Channel from "./channel/pages/Channel";
import Authentification from "./profil/Pages/Authentification";
import Error from "./timeline/pages/error";

import Search from "./search/search";
import Live from './live/index'
import UserLive, { loader as LoaderLive } from "./live/UserLive";
import Test from "./live/widget";
import You from "./timeline/pages/you";
import ChangeTitle from "./live/ChangeTitle"
//import PageChannel from "./channel/pages/Channel";

import Playlist from "./timeline/component/Playlist";
import PlaylistPage from "./timeline/pages/playlist";
import ShowPlaylistPage from "./timeline/pages/showPlaylistPage";
import LikedPage from "./timeline/pages/likePage";

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
        path: "/cultivations",
        element: <Cultivations />,
      },
      {
        path: "/musics",
        element: <Musics />,
      },
      {
        path: "/news",
        element: <News />,
      },
      {
        path: "/podcasts",
        element: <Podcasts />,
      },
      {
        path: "/sports",
        element: <Sports />,
      },
      {
        path: "/video-games",
        element: <VideoGames />,
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
				path: "/search",
				element: <Search />,
      },
      {
				path: "/you",
				element: <You />,
			},
      {
        path: "changeTitle",
        element: <ChangeTitle />,
      },
      {
				path: "/playlist",
				element: <PlaylistPage />,
			},
      {
				path: "/showPlaylist",
				element: <ShowPlaylistPage />,
			},
      {
				path: "/likedVideos",
				element: <LikedPage />,
			},
      {
				path: "*",
				element: <Error />,
			},
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	// <React.StrictMode>
		<RouterProvider router={router} />
	// </React.StrictMode>
);
