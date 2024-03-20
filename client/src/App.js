import "./App.css";
import React, { useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import "./index.css";
import Header from "./search/header";
import ChannelHeader from "./channel/components/Header/Header";
import DisplayedBurgerMenu from "./timeline/component/displayedBurgerMenu";
import PageChaineban from "./channel/components/Channel/PageChaineban";
import Upload from "./channel/pages/Upload";

function App() {
	return (
		<>
			<div>
				<PageChaineban />
				{/* <Upload /> */}
			</div>
		</>
	);
}

export default App;
