import React, { useState } from "react";
import logo from "../../assets/logo.jpg";

export default function UploadVideo() {
	const [imagePreview, setImagePreview] = useState(null); // Déclaration d'un état local imagePreview pour stocker l'URL de l'image sélectionnée, initialisé à null.

	function handleImageChange(event) {
		// Définition de la fonction handleImageChange qui sera appelée lorsque l'utilisateur sélectionne une image.
		const file = event.target.files[0]; // Récupération du fichier sélectionné par l'utilisateur.
		if (file) {
			// Vérification si un fichier a été sélectionné.
			const reader = new FileReader(); // Création d'un objet FileReader pour lire le contenu du fichier.
			reader.onloadend = () => {
				// Définition d'une fonction de rappel pour être appelée lorsque la lecture du fichier est terminée.
				setImagePreview(reader.result); // Mise à jour de l'état imagePreview avec l'URL de l'image
			};
			reader.readAsDataURL(file); // Lecture du contenu du fichier en tant qu'URL de données.
		}
	}

	return (
		<div className="flex items-center w-2/3">
			{/* {imagePreview ? ( // Si imagePreview est défini
        <img src={imagePreview} /> // Affiche l'aperçu de l'image
      ) : (
        <img src={logo} alt="Logo"/> // Affiche le logo par défaut si sa veut bien marcher
      )} */}

			<form className="w-full">
				<div className="border-solid border-2 border-gray-600 rounded-md w-full mb-4">
					<label htmlFor="nom" className="flex flex-cols pl-2">
						Titre
					</label>
					<input name="nom" type="text" className="p-2 w-full" />
				</div>

				<div className="border-solid border-2 border-gray-600 rounded-md w-full h-28">
					<label htmlFor="identifiant" className="flex flex-cols pl-2">
						Descritpion
					</label>
					<textarea
						name="identifiant"
						type="text"
						className="p-2 h-full w-full resize-none"
					/>
				</div>

				<input type="submit" value="Annuler" />
				<input type="submit" value="Importer" />
			</form>

			<div>
				{imagePreview ? ( // Si imagePreview est défini
					<img src={imagePreview} className="w-1/3" /> // Affiche l'aperçu de l'image
				) : (
					<img src={logo} alt="Logo" className="w-1/3" /> // Affiche le logo par défaut si sa veut bien marcher
				)}
			</div>
		</div>
	);
}
