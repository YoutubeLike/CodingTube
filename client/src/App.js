import "./App.css";
import React, { useEffect, useState } from "react";
import Header from "./channel/components/Header/Header";
import { Outlet, Route, Routes } from "react-router-dom";

function App() {
	return (
		<>
			<Header />
			<div>{/* <Outlet /> */}</div>
		</>
	);
}

export default App;
