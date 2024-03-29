import React, { useState, useEffect } from "react";
import PageChaineban from "../components/Channel/PageChaineban";
import axios from 'axios'

export default function PageChannel() {
	useEffect(() => {
		const fetchData = async () => {
		  try {
			const response = await axios.get(
			  "http://localhost:5000/api/profil/check-session",
			  {
				withCredentials: true,
			  }
			);
	
			const loggedIn = response.data.loggedIn;
	
			if (!loggedIn) {
			  window.location.href = "/login";
			}
		  } catch (error) {
			console.log("Erreur lors de la vérification du login:", error);
		  }
		};
	
		fetchData();
		  }, []);
	return (
		<div>
			<PageChaineban />
		</div>
	);
}
