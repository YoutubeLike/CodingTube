import React, { useState, useEffect } from "react";
import axios from "axios";
import itachi from "../../assets/baniere.webp";
import img from "../../assets/logo.jpg";
import Accueil from "./Accueil";
import Video from "./Videos";
import Shorts from "./Shorts";
import Playlists from "./Playlists";
import { Link } from "react-router-dom";

const App = () => {
	const [idChannel, setIdChannel] = useState(); // Id Channel
	const [pseudo, setPseudo] = useState(""); // Pseudo
	const [follower, setFollower] = useState(0); // Subscriber number
	const [buttonSubscribe, setbuttonSubscribe] = useState("");
	const [bio, setBio] = useState(""); // Bio
	const [identifier, setIdentifier] = useState(""); // Identifier
	const [numberVideo, setNumberVideo] = useState(); // video number
	const [banner, setBanner] = useState(""); // banner
	const [activeTab, setActiveTab] = useState("Accueil"); // Onglet actif
	const [isOpen, setIsOpen] = useState(false);
	// Ajoutez un état pour suivre l'état actuel du bouton Follow
	const [isFollowing, setIsFollowing] = useState(false);
	useEffect(() => {
		const fetchChannelInfo = async () => {
			try {
				// Query to retrieve string information
				const urlParams = new URLSearchParams(window.location.search);
				setIdentifier(urlParams.get("identifier"));
				const response = await axios.get(
					"http://localhost:5000/api/channel/infosId",
					{ params: { identifier: urlParams.get("identifier") } }
				);

				const responseSubscribe = await axios.get('http://localhost:5000/api/channel/get-follow', {idChannel:1, withCredentials: true });
				const responseNbFollowers = await axios.get('http://localhost:5000/api/channel/get-nb-followers',{ idChannel: 1 });
				
				// Attribution of information
				setIdChannel(response.data.id);
				setBanner(response.data.banner);
				setPseudo(response.data.pseudo);
				setFollower(response.data.nb_follower);
				setBio(response.data.bio);
				setbuttonSubscribe(responseSubscribe.data.length == 0 ? "S'abonner" : "Abonné")
        		setFollower(responseNbFollowers.data.length);
        

				try {
					// Request to retrieve the number of channel videos
					const nbVideos = await axios.get(
						"http://localhost:5000/api/channel/nombreVideo",
						{ params: { numberVideo: response.data.id } }
					);

					// Allocation of the number of videos
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

	// Mettez à jour l'état lorsque le bouton est cliqué
	const handleFollowClick = () => {
		setIsFollowing(!isFollowing);
	};
	//Updates the active tab
	const togglePopup = () => {
		setIsOpen(!isOpen);
	};

	//Updates the active tab using the setActiveTab function
	const handleTabClick = (tabName) => {
		setActiveTab(tabName);
	};

	//Enable/disable the pop-up
	function Popup() {
		const [isOpen, setIsOpen] = useState(false);

		const togglePopup = () => {
			setIsOpen(!isOpen);
		};
	}

	return (
		<div className="App pl-[10vw] pr-[5vw]">
			{/* Banner */}
			<div>
				{/* banner image */}
				<img
					src={banner}
					alt="Banner"
					className="h-48 w-full object-cover mt-4 rounded-xl"
				/>
			</div>

			{/* Channel photo */}
			<div className="channel-header p-4 flex items-center object-cover w-full ">
				<div>
					<img
						src={img}
						alt="Channel Avatar"
						className="rounded-full max-w-40"
					/>
				</div>
				{/*Channel information*/}
				<div className="channel-info ml-4 flex flex-col items-start h-48 justify-around">
					<h1 className="text-start text-5xl font-bold">{pseudo}</h1>
					<p className="text-start">
						{identifier} - {follower} followers - {numberVideo} vidéos
					</p>
					{/*Pop-up of the biography*/}
					<div>
						<button onClick={togglePopup}>
							{bio}
							{isOpen && (
								<div className="z-10 h-[500px] w-[400px] absolute inset-y-0 left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]  flex items-center justify-center bg-opacity-50">
									<div className="bg-gray-600 w-full h-full rounded shadow-lg text-white text-justify pl-4 pt-4">
										<h2 className="text-xl font-bold mb-4">About me</h2>
										<p className="text-lg">{bio}</p>
									</div>
								</div>
							)}
						</button>
					</div>
					{/*Subscribe button*/}
					<button className="font-bold bg-neutral-900 text-white px-8 rounded-full" onClick={handleFollowClick}>
							{isFollowing ? 'Unfollow' : 'Follow'}
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
							Home
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
							Videos
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
			<div className="text-center mt-8">
			<Link to="/upload">
				<button className="upload-btn font-bold bg-red-500 text-white px-8 py-3 rounded-full transition duration-300 ease-in-out transform hover:scale-110 hover:bg-red-600">
					Upload
				</button>
			</Link>
</div>
		</div>
	);
};

export default App;
