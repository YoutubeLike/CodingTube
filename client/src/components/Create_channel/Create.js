import React, { useState } from 'react';  
import './create.css';  
import logo from "../../assets/logo.jpg"

export default function Create() {  
  const [imagePreview, setImagePreview] = useState(null);  // Déclaration d'un état local imagePreview pour stocker l'URL de l'image sélectionnée, initialisé à null.

  function handleImageChange(event) {  // Définition de la fonction handleImageChange qui sera appelée lorsque l'utilisateur sélectionne une image.
    const file = event.target.files[0];  // Récupération du fichier sélectionné par l'utilisateur.
    if (file) {  // Vérification si un fichier a été sélectionné.
      const reader = new FileReader();  // Création d'un objet FileReader pour lire le contenu du fichier.
      reader.onloadend = () => {  // Définition d'une fonction de rappel pour être appelée lorsque la lecture du fichier est terminée.
        setImagePreview(reader.result);  // Mise à jour de l'état imagePreview avec l'URL de l'image
      };
      reader.readAsDataURL(file);  // Lecture du contenu du fichier en tant qu'URL de données.
    }
  }
  return (
    <div className="create-container">
      <h1>Voici comment les autres vous verront</h1>
      {imagePreview ? ( // Si imagePreview est défini
        <img src={imagePreview}  className="bonhomme-logo" />// Affiche l'aperçu de l'image
      ) : (
        <img src={logo} alt="Logo" className="bonhomme-logo" />// Affiche le logo par défaut si sa veut bien marcher 
      )}
      <form className="create-form">
        <label htmlFor="photo">Importez une photo</label>
        <input name="photo" type='file' onChange={handleImageChange} />

        <label htmlFor="nom">Nom</label>
        <input name="nom" type="text" />

        <label htmlFor="identifiant">Identifiant</label>
        <input name="identifiant" type="text" />
        En cliquant sur "Créer une chaîne", vous acceptez les Conditions d'utilisation de Youflute. Les modifications apportées à votre nom et à votre photo de profil ne sont visibles que sur YouFlute (pas sur les autres services Google). En savoir plus
        
        <input type="submit" value="Annuler" className='annuler' />
        <input type="submit" value="Créer une chaine" className='creer' />
      </form>
    </div>
  )
}
