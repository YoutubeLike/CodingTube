import React, { useState, useRef } from 'react';  
import axios from 'axios';
import { Link } from 'react-router-dom';
import './create.css';  
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
        await axios.get("http://localhost:5000/api/live/create")
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
      <button onClick={() => setShowPopup(true)}>Ouvrir le popup</button>

      {/* Popup */}
      {showPopup && (
        <div className="popup-container">
          <div className="create-container">
            {/* "X" pour fermer le popup */}
            <button className="close-btn" onClick={() => setShowPopup(false)}>
              X
            </button>

            <Link ref={redirectLinkRef} className="logo" to="/channel">
              YouFlute
            </Link>
            <h1>Voici comment les autres vous verront</h1>
            {imagePreview ? (
              <img src={imagePreview} className="bonhomme-logo rounded-full w-[250px] object-cover" />
            ) : (
              <img src={logo} alt="Logo" className="bonhomme-logo rounded-full w-[250px] object-cover" />
            )}
            <form className="create-form" onSubmit={submit}>
              <label htmlFor="photo">Importez une photo</label>
              <input name="photo" type='file' onChange={handleImageChange} />

              <label htmlFor="nom">Nom</label>
              <input name="nom" type="text" value={name} onChange={(e)=>setName(e.target.value)} />

              <label htmlFor="identifiant">Identifiant</label>
              <input name="identifiant" type="text" value={identifier} onChange={handleIdentifier} />

              <label htmlFor="Bio">Bio</label>
              <input name="bio" type="text" value={bio} onChange={(e)=>setBio(e.target.value)} />

              <input type="submit" value="Annuler" className='annuler' />
              <input type="submit" value="Créer une chaine" className='creer' />
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
