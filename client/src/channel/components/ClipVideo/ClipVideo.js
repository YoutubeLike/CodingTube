import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import img from "../../assets/logo.jpg";
import dislike from "../../assets/dislike.png";
import like from "../../assets/like.png";
import share from "../../assets/share.png";

export default function Video() {
	const [uploadVideoUrl, setUploadVideo] = useState(); //
	const [channel_id, setChannelId] = useState(0);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [date, setDate] = useState("");
	const [number_view, setNumber_view] = useState(0);
	const [pseudo, setPseudo] = useState(""); // Pseudo
	const [follower, setFollower] = useState(0); // Subscriber number
	const [nb_like, setNb_like] = useState(0);
	const [profilePicture, setProfilePicture] = useState("");

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);

		const fetchVideo = async () => {
			try {
				// Requête vers les infos de la vidéo
				const responseUrlVideo = await axios.get(
					"http://localhost:5000/api/channel/video",
					{ params: { idVideo: urlParams.get("id") } }
				);

				// Attribution des informations
				setChannelId(responseUrlVideo.data.channel_id);
				setTitle(responseUrlVideo.data.title);
				setDescription(responseUrlVideo.data.description);
				setNumber_view(responseUrlVideo.data.number_view);
				setNb_like(responseUrlVideo.data.nb_like);
				setUploadVideo(responseUrlVideo.data.upload_video_url);
				setDate(responseUrlVideo.data.upload_date_time);

				// Requête vers les infos de la chaîne
				const responseChannel = await axios.get(
					"http://localhost:5000/api/channel/infos",
					{ params: { idChannel: responseUrlVideo.data.channel_id } }
				);

				// Attribution des informations
				setPseudo(responseChannel.data.pseudo);
				setFollower(responseChannel.data.nb_follower);
				setProfilePicture(responseChannel.data.profilePicture);

			} catch (error) {
				console.error("Erreur :", error);
			}
		};

		// const fetchChannel = async () => {
		// 	try {

		// 		const responseUrlVideo = await axios.get(
		// 			"http://localhost:5000/api/channel/video",
		// 			{ params: { idVideo: urlParams.get("id") } }
		// 		);

		// 		// Requête vers les infos de la chaîne
		// 		const responseChannel = await axios.get(
		// 			"http://localhost:5000/api/channel/infos",
		// 			{ params: { idChannel: responseUrlVideo.data.channel_id } }
		// 		);

		// 		// Attribution des informations
		// 		setPseudo(responseChannel.data.pseudo);
		// 		setFollower(responseChannel.data.nb_follower);
		// 		setProfilePicture(responseChannel.data.profilePicture);
		// 	} catch (error) {
		// 		console.error("Erreur :", error);
		// 	}
		// };

		fetchVideo();  
		// fetchChannel();
	}, []);
	

	console.log(pseudo, follower);
	return (
		<>
			<div className="pl-10 mt-8 w-3/4">
				<iframe
					rounded-md
					width="100%"
					height="680"
					src="https://www.youtube.com/embed/Oflbho9ZG2U?start=103"
				/>

				<h1 className="font-bold mt-30 text-xl mb-2">{title}</h1>

				<div className="flex justify-between">
					<div className="flex">
						<img src={profilePicture} className="w-4 mr-2" />
						<div className="flex flex-col">
							<p className="text-sm font-bold">{pseudo}</p>
							<p className="text-sm text-gray-500">{follower} abonnés</p>
						</div>
						{/*Button qui permet de s'abonner, liker, et partager*/}
						<button className="font-bold bg-neutral-900 hover:bg-neutral-600 text-white px-6 ml-2 rounded-full">
							S'abonner
						</button>
					</div>
					<div>
						<button className="bg-gray-100 px-8 ml-10 rounded-l-full">
							{nb_like}
							<img className="w-6 py-2" src={like} />
						</button>
						<button className="bg-gray-100 px-8 rounded-r-full">
							<img className="w-6 py-2" src={dislike} />
						</button>
						<button className="bg-gray-100 px-8 ml-10 rounded-full">
							<img className="w-6 py-2" src={share} />
						</button>
					</div>
				</div>

				<div className="p-4 bg-gray-100 rounded-xl mt-4">
					<p className="font-bold">
						{number_view} vues {date}
						<span className="text-blue-600">#sifu #nodamage</span>
					</p>
					<p className="text-justify">{description}</p>
				</div>
			</div>
		</>
	);
}
