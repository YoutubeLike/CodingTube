import React, { useState, useEffect } from "react";
import axios from "axios";
import itachi from "../../assets/baniere.webp";
import img from "../../assets/logo.jpg";
import Accueil from "./Accueil";
import Video from "./Videos";
import Shorts from "./Shorts";
import Playlists from "./Playlists";
import CheckSession from "../../../session";

const App = () => {
	const [idChannel, setIdChannel] = useState(); // Id Channel
	const [pseudo, setPseudo] = useState(""); // Pseudo
	const [follower, setFollower] = useState(0); // Subscriber number
	const [bio, setBio] = useState(""); // Bio
	const [identifier, setIdentifier] = useState(""); // Identifier
	const [numberVideo, setNumberVideo] = useState(); // video number
	const [banner, setBanner] = useState(""); // banner
	const [activeTab, setActiveTab] = useState("Accueil"); // Onglet actif
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const fetchChannelInfo = async () => {
			try {
				// Requête pour récupérer les informations de la chaîne
				const urlParams = new URLSearchParams(window.location.search);
				setIdentifier(urlParams.get("identifier"));
				const response = await axios.get(
					"http://localhost:5000/api/channel/infosId",
					{ params: { identifier: urlParams.get("identifier") } }
				);

				// Attribution of information
				setIdChannel(response.data.id);
				setBanner(response.data.banner);
				setPseudo(response.data.pseudo);
				setFollower(response.data.nb_follower);
				setBio(response.data.bio);

				try {
					// Requête pour récupérer le nombre de vidéos de la chaîne
					const nbVideos = await axios.get(
						"http://localhost:5000/api/channel/nombreVideo",
						{ params: { numberVideo: response.data.id } }
					);

					// Attribution du nombre de vidéos
					setNumberVideo(nbVideos.data.length);
				} catch (error) {
					console.error(
						"Erreur lors de la récupération du nombre de vidéos de la chaîne :",
						error
					);
				}
			} catch (error) {
				console.error(
					"Erreur lors de la récupération des informations de la chaîne :",
					error
				);
			}
		};

		fetchChannelInfo();
	}, []);

	//Met à jour l'onglet actif
	const togglePopup = () => {
		setIsOpen(!isOpen);
	};

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

	//Activer/désactiver la fenêtre contextuelle
	function Popup() {
		const [isOpen, setIsOpen] = useState(false);

		const togglePopup = () => {
			setIsOpen(!isOpen);
		};
	}

	return (
		<div className="App pl-[10vw] pr-[5vw]">
			{/* Bannière */}
			<div>
				{/* Image de bannière */}
				<img
					src={banner}
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
				{/*Information de la chaîne*/}
				<div className="channel-info ml-4 flex flex-col items-start h-48 justify-around">
					<h1 className="text-start text-5xl font-bold">{pseudo}</h1>
					<p className="text-start">
						{identifier} - {follower} abonnés - {numberVideo} vidéos
					</p>
					{/*Pop-up de la bio*/}
					<div>
						<button onClick={togglePopup}>
							{bio}
							{isOpen && (
								<div className="z-10 h-[500px] w-[400px] absolute inset-y-0 left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]  flex items-center justify-center bg-opacity-50">
									<div className="bg-gray-600 w-full h-full rounded shadow-lg text-white text-justify pl-4 pt-4">
										<h2 className="text-xl font-bold mb-4">A propos</h2>
										<p className="text-lg">{bio}</p>
									</div>
								</div>
							)}
						</button>
					</div>
					{/*Bouton s'abonné*/}
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
