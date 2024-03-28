import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Video() {
	const [channelId, setChannelId] = useState(); // Channel id
	const [video, setVideo] = useState(); // Video
    const [thumbnailFile, setThumbnailFile] = useState(null);

	useEffect(() => {
		const fetchVideos = async () => {
			try {
				// Query to retrieve string information
				const urlParams = new URLSearchParams(window.location.search);
				const response = await axios.get(
					"http://localhost:5000/api/channel/infosId",
					{ params: { identifier: urlParams.get("identifier") } }
				);
				// const responseThumbnailPath = await axios.get('http://localhost:5000/api/channel/thumbnailPath?idVideo=' + urlParams.get("id"))

				// Attribution of information
				setChannelId(response.data.id);
				try {
					// Query for channel information
					const videos = await axios.get(
						"http://localhost:5000/api/channel/videos",
						{ params: { idVideoOnTab: response.data.id } }
					);

					// Add query result into video variable
					setVideo(videos.data);
				} catch (error) {
					console.error("Erreur :", error);
				}
			} catch (error) {
				console.error(
					"Erreur lors de la récupération des informations de la chaîne :",
					error
				);
			}
		};

		fetchVideos();
	}, []);


	return (
		<div className="flex justify-center">
			<div className="flex flex-wrap w-auto">
				{video &&
					video.map((data) => (
						<Link
							to={`/video?id=${data.id}`}
							className="flex flex-col mr-4 justify-between"
						>
							<img
								src={"http://localhost:5000/api/channel/thumbnail?idThumbnail=" + data.id}
								className="object-cover w-[270px] min-h-[155px] rounded-xl bg-black"
							/>
							<div className="h-full flex flex-col justify-between">
								<p className="w-[270px] text-start font-bold">{data.title}</p>
								<p className="w-[270px] text-start text-xs">
									{data.number_view} vues - {data.upload_date_time}
								</p>
							</div>
						</Link>
					))}
			</div>
		</div>
	);
}
