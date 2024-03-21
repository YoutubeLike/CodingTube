import React, { useState, useEffect } from "react";
import axios from "axios";
import itachi from "../../assets/baniere.webp";
import img from "../../assets/logo.jpg";
import Accueil from "./Accueil";
import Video from "./Videos";
import Shorts from "./Shorts";
import Playlists from "./Playlists";
import CheckSession from '../../../session';

const App = () => {
	const [pseudo, setPseudo] = useState(""); // Pseudo
	const [follower, setFollower] = useState(0); // Subscriber number
	const [bio, setBio] = useState(""); // Bio
	const [identifier, setIdentifier] = useState(""); // Identifier
	const [numberVideo, setNumberVideo] = useState(0); // video number
	const [activeTab, setActiveTab] = useState("Accueil"); // Onglet actif

	

	useEffect(() => {
		const fetchChannelInfo = async () => {
			try {
				// Requête pour récupérer les informations de la chaîne
				const response = await axios.get(
					"http://localhost:5000/api/channel/infos"
				);

				// Attribution des informations
				setPseudo(response.data.pseudo);
				setFollower(response.data.nb_follower);
				setBio(response.data.bio);
				setIdentifier(response.data.identifier_channel);
			} catch (error) {
				console.error(
					"Erreur lors de la récupération des informations de la chaîne :",
					error
				);
			}
		};

		const fetchVideoCount = async () => {
			try {
				// Requête pour récupérer le nombre de vidéos de la chaîne
				const response = await axios.get(
					"http://localhost:5000/api/channel/nombreVideo"
				);

				// Attribution du nombre de vidéos
				setNumberVideo(Number(response.data)); // Convertir en nombre entier
			} catch (error) {
				console.error(
					"Erreur lors de la récupération du nombre de vidéos de la chaîne :",
					error
				);
			}
		};

		fetchChannelInfo();
		fetchVideoCount();
	}, []);

	//Met à jour l'onglet actif en utilisant la fonction setActiveTab
	const handleTabClick = (tabName) => {
		setActiveTab(tabName);
	};

	//Retourne la bon onglet actif
	const renderContent = () => {
		switch (activeTab) {
			case "Accueil":
				return <Accueil />;
			case "Vidéos":
				return <Video />;
			case "Shorts":
				return <Shorts />;
			case "Playlists":
				return <Playlists />;
			default:
				return null;
		}
	};

	return (
		<div className="App pl-[10vw] pr-[5vw]">
			{/* Bannière */}
			<div className="banner">
				{/* Image de bannière */}
				<img
					src={itachi}
					alt="Banner"
					className="w-full object-cover mt-4 rounded-xl"
				/>
			</div>

			{/* Photo de la chaîne */}
			<div className="channel-header p-4 flex items-center object-cover w-full ">
				<div>
					{/* Insérez votre photo de chaîne ici */}
					<img
						src={img}
						alt="Channel Avatar"
						className="rounded-full max-w-40"
					/>
				</div>
				<div className="channel-info ml-4 flex flex-col items-start h-48 justify-around">
					<h1 className="text-start text-5xl font-bold">{pseudo}</h1>
					<p className="text-start">
						@{identifier} - {follower} abonnés - {numberVideo} vidéos
					</p>
					<p className="text-start">{bio}</p>
					<button className="font-bold bg-neutral-900 text-white px-8  rounded-full">
						S'abonner
					</button>
				</div>
			</div>

			{/* Navigation */}
			<div className="navigation-tabs text-black text-white flex justify-center py-4 cursor-pointer">
				<ul className="flex space-x-8 text-black">
					<li className="relative">
						<a
							href="#"
							className={`transition duration-500 ease-in-out hover:text-red-500 ${
								activeTab === "Accueil" ? "text-red-500" : ""
							}`}
							onClick={() => handleTabClick("Accueil")}
						>
							Accueil
						</a>
						<div className="absolute bottom-0 left-0 w-full h-1 bg-red-500 transition-all duration-300 origin-left scale-x-0"></div>
					</li>

					<li className="relative">
						<a
							href="#"
							className={`transition duration-500 ease-in-out hover:text-red-500 ${
								activeTab === "Vidéos" ? "text-red-500" : ""
							}`}
							onClick={() => handleTabClick("Vidéos")}
						>
							Vidéos
						</a>
						<div className="absolute bottom-0 left-0 w-full h-1 bg-red-500 transition-all duration-300 origin-left scale-x-0"></div>
					</li>
					<li className="relative">
						<a
							href="#"
							className={`transition duration-500 ease-in-out hover:text-red-500 ${
								activeTab === "Shorts" ? "text-red-500" : ""
							}`}
							onClick={() => handleTabClick("Shorts")}
						>
							Shorts
						</a>
						<div className="absolute bottom-0 left-0 w-full h-1 bg-red-500 transition-all duration-300 origin-left scale-x-0"></div>
					</li>
					<li className="relative">
						<a
							href="#"
							className={`transition duration-500 ease-in-out hover:text-red-500 ${
								activeTab === "Playlists" ? "text-red-500" : ""
							}`}
							onClick={() => handleTabClick("Playlists")}
						>
							Playlists
						</a>
						<div className="absolute bottom-0 left-0 w-full h-1 bg-red-500 transition-all duration-300 origin-left scale-x-0"></div>
					</li>
				</ul>
			</div>

			{activeTab == "Accueil" && <Accueil />}
			{activeTab == "Vidéos" && <Video />}
			{activeTab == "Shorts" && <Shorts />}
			{activeTab == "Playlists" && <Playlists />}
		</div>
	);
};

export default App;
