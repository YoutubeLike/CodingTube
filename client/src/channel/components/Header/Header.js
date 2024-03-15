import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./header.css";

export default function Header() {
	const [open, setOpen] = useState("false");

	function handleMenu() {
		if (open == "false") {
			console.log("C vrai");
			setOpen("true");
		} else {
			console.log("C faux");
			setOpen("false");
		}
		console.log(open);
	}

	return (
		<>
			<div className="header">
				<Link className="logo" to="/">
					YouFlute
				</Link>
				<div className={`menu ${open ? "menu-mobile active" : ""}`}>
					<Link className="text-white m-5" to="/new-channel">
						Create channel
					</Link>
					<Link className="text-white m-5" to="/video">
						Vidéo
					</Link>
					<Link className="text-white m-5" to="/upload">
						Importer
					</Link>
					<Link className="text-white m-5" to="/channel">
						Chaine
					</Link>
				</div>
				<div>
					<button onClick={handleMenu}>
						<img src="" alt="Photo de profil"></img>
					</button>
				</div>
			</div>

			<p>{open}</p>

			<Outlet />
		</>
	);
}
