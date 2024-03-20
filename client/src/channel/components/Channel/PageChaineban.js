import React, { useState, useEffect} from "react";
import axios from 'axios';
import itachi from "../../assets/baniere.webp";
import img from '../../assets/logo.jpg';

const App = () => {

  const [pseudo, setPseudo] = useState('') // Pseudo
  const [follower, setFollower] = useState(0) // Subscriber number
  const [bio, setBio] = useState('') // Bio

  useEffect(() => {
    const fetchTest = async () => {
      try {
        // Requête vers les infos de la chaîne
        const response = await axios.get('http://localhost:5000/api/channel/infos');
        

        // Attribution des informations
        setPseudo(response.data.pseudo); 
        setFollower(response.data.nb_follower);
        setBio(response.data.bio);
      } catch (error) {
        console.error('Erreur :', error);
      }
    };

    fetchTest();
  }, [])

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
          <p className="text-start">@Itachi Budoke - {follower} abonnés - 1,6k vidéos</p>
          <p className="text-start">{bio}</p>
          <button className="font-bold bg-neutral-900 text-white px-8  rounded-full">S'abonner</button>
        </div>
      </div>

      {/* Navigation */}
      <div className="navigation-tabs text-black text-white flex justify-center py-4 cursor-pointer">
        <ul className="flex space-x-8 text-black">
          <li className="relative">
            <a href="#" className="transition duration-500 ease-in-out hover:text-red-500">Accueil</a>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-red-500 transition-all duration-300 origin-left scale-x-0"></div>
          </li>
          <li className="relative">
            <a href="#" className="transition duration-500 ease-in-out hover:text-red-500">Vidéos</a>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-red-500 transition-all duration-300 origin-left scale-x-0"></div>
          </li>
          <li className="relative">
            <a href="#" className="transition duration-500 ease-in-out hover:text-red-500">Playlists</a>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-red-500 transition-all duration-300 origin-left scale-x-0"></div>
          </li>
          <li className="relative">
            <a href="#" className="transition duration-500 ease-in-out hover:text-red-500">À propos</a>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-red-500 transition-all duration-300 origin-left scale-x-0"></div>
          </li>
        </ul>
      </div>

      {/* Contenu */}
      <div className="content p-4">
        {/* Insérer le contenu ici */}
        <h2 className="text-xl font-bold mb-4">Dernières vidéos</h2>
        {/* Liste des vidéos */}
      </div>
    </div>
  );
};

export default App;
