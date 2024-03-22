import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Video() {
	const [channelId, setChannelId] = useState(0); // Channel id
	const [uploadVideoUrl, setUploadVideoUrl] = useState([]); // Video number
	const [title, setTitle] = useState([]); // Title
	const [video, setVideo] = useState(); // Video

	useEffect(() => {
		const fetchVideos = async () => {
			try {
				// Query for channel information
				const response = await axios.get(
					"http://localhost:5000/api/channel/videos"
				);

				// Add query result into video variable
				console.log(response.data);
				setVideo(response.data);
			} catch (error) {
				console.error("Erreur :", error);
			}
		};

		fetchVideos();
	}, []);

	const sendVideo = () => {};

	video && console.log(video);

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
								src={data.thumbnail}
								className="w-[270px] min-h-[155px] rounded-xl bg-black"
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
