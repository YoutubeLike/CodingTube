import React, { useState, useRef } from 'react';  
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from "../../assets/logo.jpg"

export default function Create() {  
  const [showPopup, setShowPopup] = useState(false); // État pour afficher ou masquer le popup
  const redirectLinkRef = useRef(); // Créez une référence useRef pour le lien de redirection
  const [imagePreview, setImagePreview] = useState(null);  
  const [name, setName] = useState("");
  const [identifier, setIdentifier] = useState("@");
  const [bio, setBio] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    try {
        await axios.post("http://localhost:5000/api/channel/submitChannel", { 
            name: name,
            identifier: identifier, 
            bio: bio,
        });
        console.log('Requête envoyée');
        redirectLinkRef.current.click(); // Déclenchez un clic sur le lien de redirection
    } catch (error) {
        console.error("Une erreur s'est produite lors de l'envoi : ", error); 
    }
  };

  function handleIdentifier(event) {
    const newValue = event.target.value.trim();
    if (newValue.includes("@")) {
      const atIndex = newValue.indexOf("@");
      const formattedValue = newValue.substring(atIndex);
      setIdentifier(formattedValue);
    } else {
      const formattedValue = "@" + newValue;
      setIdentifier(formattedValue);
    }
  }

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <div>
      {/* Bouton pour ouvrir le popup */}
      <button onClick={() => setShowPopup(true)} className="annuler hover:bg-gray-300">Ouvrir le popup</button>

      {/* Popup */}
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center">
          <div className="relative bg-white p-6 rounded-md shadow-md max-w-[80%]">
            {/* "X" pour fermer le popup */}
            <button className="absolute top-2 right-2 bg-none border-none cursor-pointer text-black text-xl hover:text-red-500" onClick={() => setShowPopup(false)}>
              X
            </button>

            <Link ref={redirectLinkRef} className="block text-center mb-4 hover:text-blue-500" to="/channel">
              YouFlute
            </Link>
            <h1 className="text-center mb-4">Voici comment les autres vous verront</h1>
            {imagePreview ? (
              <img src={imagePreview} className="rounded-full w-[250px] h-[250px] object-cover mx-auto mb-4" />
            ) : (
              <img src={logo} alt="Logo" className="rounded-full w-[250px] h-[250px] object-cover mx-auto mb-4" />
            )}
            <form onSubmit={submit}>
              <label htmlFor="photo" className="block font-bold mb-2">Importez une photo</label>
              <input name="photo" type='file' onChange={handleImageChange} className="block mb-4" />

              <label htmlFor="nom" className="block font-bold mb-2">Nom</label>
              <input name="nom" type="text" value={name} onChange={(e)=>setName(e.target.value)} className="w-full p-2 mb-4 border border-gray-300 rounded" />

              <label htmlFor="identifiant" className="block font-bold mb-2">Identifiant</label>
              <input name="identifiant" type="text" value={identifier} onChange={handleIdentifier} className="w-full p-2 mb-4 border border-gray-300 rounded" />

              <label htmlFor="Bio" className="block font-bold mb-2">Bio</label>
              <input name="bio" type="text" value={bio} onChange={(e)=>setBio(e.target.value)} className="w-full p-2 mb-4 border border-gray-300 rounded" />

              <input type="submit" value="Annuler" className='mr-4 hover:bg-gray-300 rounded-lg cursor-pointer' />
              <input type="submit" value="Créer une chaine" className='hover:bg-blue-400 hover:text-white rounded-lg cursor-pointer' />
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
