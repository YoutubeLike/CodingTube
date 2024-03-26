import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import img from "../../assets/logo.jpg";
import LikeDislike from "./LikeDislikeButton"
import { useActionData } from "react-router-dom";

export default function Video() {
	const [uploadVideoUrl, setUploadVideo] = useState(); //
	const [channel_id, setChannelId] = useState(0);
	const [date, setDate] = useState("");
	const [nb_like, setNb_like] = useState(0);
	const [profilePicture, setProfilePicture] = useState("");
	const [pseudo, setPseudo] = useState('') // Pseudo
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [number_view, setNumber_view] = useState(0)
	const [follower, setFollower] = useState(0);
	const [buttonSubscribe, setbuttonSubscribe] = useState("");


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    
    const fetchTest = async () => {
      try {
        // Requête vers les infos de la chaîne
        const responseVideo = await axios.get("http://localhost:5000/api/channel/video", { params: { idVideo: urlParams.get("id") } });
        const responseSubscribe = await axios.get('http://localhost:5000/api/channel/get-follow', { params: { channelId: 1, userId: 1 } });
        const responseNbFollowers = await axios.get('http://localhost:5000/api/channel/get-nb-followers', { params: { channelId: 1 } });
        
        // Attribution des informations de la vidéo
		setTitle(responseVideo.data.title);
		setDescription(responseVideo.data.description);
        setNumber_view(responseVideo.data.number_view);
		setChannelId(responseVideo.data.channel_id);
		setNb_like(responseVideo.data.nb_like);
		setUploadVideo(responseVideo.data.upload_video_url);
		setDate(responseVideo.data.upload_date_time);

		// Attribution des informations de Follopw
        setbuttonSubscribe(responseSubscribe.data.length == 0 ? "S'abonner" : "Abonné")
        setFollower(responseNbFollowers.data.length);
        
        try {
          // Requête informations de la chaîne 
          const responseChannel = await axios.get('http://localhost:5000/api/channel/infos',{ params: { idChannel: responseVideo.data.channel_id } });
          
          // Attribution des informations
          setPseudo(responseChannel.data.pseudo);
          setFollower(responseChannel.data.nb_follower);
          setProfilePicture(responseChannel.data.profilePicture);
        
        } catch (error) {
          console.error("Erreur :", error);
        }
        
      } catch (error) {
        console.error('Erreur :', error);
      }
      
    };

    fetchTest();
  }, [])

  async function handleSubscribe() {
    try {
      await axios.get('http://localhost:5000/api/channel/follow', { params: { channelId: 1, userId: 1 } });
      const responseSubscribe = await axios.get('http://localhost:5000/api/channel/get-follow', { params: { channelId: 1, userId: 1 } });
      setbuttonSubscribe(responseSubscribe.data.length == 0 ? "S'abonner" : "Abonné");
      //call a function which will get the number of followers
    } catch (err) {
      console.error(err)
    }
  }


  return (
    <>
      <div className="pl-10 mt-8 w-3/4">
        <iframe rounded-md
          width="100%"
          height="680"

          src="https://www.youtube.com/embed/Oflbho9ZG2U?start=103"
        />

        <h1 className="font-bold mt-30 text-base mb-1 mt-4">{title}</h1>

        <div className="flex justify-between">
          <div className='flex items-center '>
            <img src={img} className="w-12 mr-4" />
            <div className="flex flex-col pr-4">
              <p className="text-sm font-bold">{pseudo}</p>
              <p className="text-sm text-gray-500">{follower} abonnés</p>
            </div>

            <button onClick={handleSubscribe} className="font-bold bg-neutral-900 hover:bg-neutral-600 text-white px-6 ml-2 rounded-full pt-2 pb-2">{buttonSubscribe}</button>
          </div>
          <LikeDislike />
        </div>


        <div className="p-4 bg-gray-100 rounded-xl mt-4 " >
          <p className="font-bold">{number_view} vues  {date} <span className="text-blue-600">#sifu #nodamage</span></p>
          <p className="text-justify">
            {description}
          </p>

        </div>
      </div>


    </>
  );
}