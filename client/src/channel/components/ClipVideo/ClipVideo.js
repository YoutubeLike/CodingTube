import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import img from "../../assets/logo.jpg";
import LikeDislike from "./LikeDislikeButton"
import { useActionData } from "react-router-dom";

export default function Video() {
	const [uploadVideo, setUploadVideo] = useState(); //
	const [channelId, setChannelId] = useState(0);
	const [date, setDate] = useState("");
	const [nb_like, setNb_like] = useState(0);
	const [profilePicture, setProfilePicture] = useState("");
	const [pseudo, setPseudo] = useState('') // Pseudo
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [number_view, setNumber_view] = useState(0)
	const [follower, setFollower] = useState(0);
	const [buttonSubscribe, setbuttonSubscribe] = useState("");
  const [videoId, setVideoId] = useState(null)

  console.log(uploadVideo)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setVideoId(urlParams.get("id"))
    
    const fetchTest = async () => {
      try {
        // Requête vers les infos de la chaîne
        const responseVideo = await axios.get("http://localhost:5000/api/channel/video", { params: { idVideo: urlParams.get("id") } });
        const responseSubscribe = await axios.get('http://localhost:5000/api/channel/get-follow?channelId=' + responseVideo.data.channel_id , {withCredentials: true });
        const responseNbFollowers = await axios.get('http://localhost:5000/api/channel/get-nb-followers?channelId=' +  responseVideo.data.channel_id);

        // Récupérer la vidéo
        // const videoUrl = responseVideoPath.data.upload_video_url;
        // setUploadVideo(videoUrl);
        
        // Attribution des informations de la vidéo
        console.log("TITRE VIDEO",responseVideo.data.title)
        setTitle(responseVideo.data.title);
        setDescription(responseVideo.data.description);
        setNumber_view(responseVideo.data.number_view);
        setChannelId(responseVideo.data.channel_id);
        setNb_like(responseVideo.data.nb_like);
        setDate(responseVideo.data.upload_date_time);

		  // Attribution des informations de Follopw
        setbuttonSubscribe(responseSubscribe.data.length == 0 ? "S'abonner" : "Abonné")
        setFollower(responseNbFollowers.data.length);
        
        try {
          // Requête informations de la chaîne 
          const responseChannel = await axios.get('http://localhost:5000/api/channel/infos',{ params: { idChannel: responseVideo.data.channel_id } });
          
          // Attribution des informations
          setPseudo(responseChannel.data.pseudo);
          setProfilePicture(responseChannel.data.profilePicture);
        
        } catch (error) {
          console.error("Erreur :", error);
        }
        
      } catch (error) {
        console.error('Erreur :', error);
      }
      
    };

    fetchTest();

    return () => {
      URL.revokeObjectURL(uploadVideo);
    }
  }, [])

  async function handleSubscribe() {
    try {
     
      await axios.get('http://localhost:5000/api/channel/follow?channelId=' + channelId , { withCredentials: true});
      const responseSubscribe = await axios.get('http://localhost:5000/api/channel/get-follow?channelId=' + channelId, {withCredentials: true } );
      setbuttonSubscribe(responseSubscribe.data.length == 0 ? "Follow" : "Unfollow");
      //call a function which will get the number of followers
    } catch (err) {
      console.error(err)
    }
  }

  console.log(title)
  return (
    <>
      <div className="pl-10 mt-8 w-3/4  ">
        {!uploadVideo ? (
          <video rounded-md
            width="100%"
            height="680"
            // src={uploadVideo}
            src={"http://localhost:5000/api/channel/videoPath?idVideo=" + videoId}
            type="video/mp4"
            controls
            autoPlay
          />
        ) : (
          <p>Chargement de la vidéo...</p>
        )}

        <h1 className="font-bold mt-30 text-base mb-1 mt-4">{title}</h1>

        <div className="flex justify-between">
          <div className='flex items-center '>
            <img src={img} className="w-12 mr-4" />
            <div className="flex flex-col pr-4">
              <p className="text-sm font-bold">{pseudo}</p>
              <p className="text-sm text-gray-500">{follower} followers</p>
            </div>

            <button  onClick={handleSubscribe} className="font-bold bg-neutral-900 hover:bg-neutral-600 text-white px-6 ml-2 rounded-full pt-2 pb-2">{buttonSubscribe}</button>
          </div>
          <LikeDislike />
        </div>


        <div className="p-4 bg-gray-100 rounded-xl mt-4 " >
          <p className="font-bold">{number_view} views  {date} <span className="text-blue-600">#sifu #nodamage</span></p>
          <p className="text-justify">
            {description}
          </p>

        </div>
      </div>


    </>
  );
}