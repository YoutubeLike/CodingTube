import React from "react";
import itachi from "../../assets/baniere.webp";
import img from '../../assets/logo.jpg';

const App = () => {
  return (
    <div className="App">
      {/* Bannière */}
      <div className="banner">
        {/* Image de bannière */}
        <img
          src={itachi}
          alt="Banner"
          className="w-full h-64 object-cover"
        />
      </div>

      {/* Photo de la chaîne */}
      <div className="channel-header p-4 flex items-center object-cover w-full ">
        <div>
          {/* Insérez votre photo de chaîne ici */}
          <img
            src={img}
            alt="Channel Avatar"
            className="rounded-full w-21"
          />
        </div>
        <div className="channel-info ml-4 flex flex-col items-start">
          <h1 className="text-start text-5xl font-bold mt-4">B R A S C O</h1>
          <p className="text-start mt-4">@Itachi Budoke - 19 M d'abonnés - 1,6k vidéos</p>
          <p className="text-start mt-4">Clique dessus wesh ??</p>
          <a className="mt-4" href="">Naruto.com</a>
          <button className="font-bold bg-neutral-900 text-white px-8  rounded-full mt-4">S'abonner</button>
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
