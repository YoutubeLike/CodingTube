import React, { useState } from "react";
import logo from "../../assets/logo.jpg";

export default function UploadVideo() {
	const [videoPreview, setVideoPreview] = useState(null); // Déclaration d'un état local imagePreview pour stocker l'URL de l'image sélectionnée, initialisé à null.

	function handleImageChange(event) {
		// Définition de la fonction handleImageChange qui sera appelée lorsque l'utilisateur sélectionne une image.
		const file = event.target.files[0]; // Récupération du fichier sélectionné par l'utilisateur.
		if (file) {
			// Vérification si un fichier a été sélectionné.
			const reader = new FileReader(); // Création d'un objet FileReader pour lire le contenu du fichier.
			reader.onloadend = () => {
				// Définition d'une fonction de rappel pour être appelée lorsque la lecture du fichier est terminée.
				setVideoPreview(reader.result); // Mise à jour de l'état imagePreview avec l'URL de l'image
			};
			reader.readAsDataURL(file); // Lecture du contenu du fichier en tant qu'URL de données.
		}
	}

	return (
		<div className="flex flex-col items-center w-2/3">
			{/* {imagePreview ? ( // Si imagePreview est défini
        <img src={imagePreview} /> // Affiche l'aperçu de l'image
      ) : (
        <img src={logo} alt="Logo"/> // Affiche le logo par défaut si sa veut bien marcher
      )} */}

			<form className="w-full">
				<h2 className="font-bold text-2xl mb-4">Détails</h2>
				<div className="flex">
					<div className="w-2/3">
						<div className="border-solid border-2 border-gray-600 rounded-md w-full mb-4">
							<label htmlFor="nom" className="flex flex-cols pl-2">
								Titre
							</label>
							<input name="nom" type="text" className="outline-none p-2 w-full rounded-md" />
						</div>

						<div className="border-solid border-2 border-gray-600 rounded-md w-full h-60">
							<label htmlFor="identifiant" className="flex flex-cols pl-2">
								Descritpion
							</label>
							<textarea
								name="identifiant"
								type="text"
								className="outline-none p-2 h-[80%] w-full resize-none"
							/>
						</div>
					</div>

					<div className=" w-1/3 p-2 h-1/1 border-solid border-2 border-gray-600 ml-4 ">

						{videoPreview ? ( // Si videoPreview est défini
							<div className="h-full py-4 flex flex-col justify-around">
							<label htmlFor="video">Changer la vidéo
								<input name="video" type='file' onChange={handleImageChange} />
							</label>

							<video src={videoPreview} controls className="w-full border-solid border-2 border-gray-600" /> {/* Affiche l'aperçu de la vidéo */}
							</div> 
						) : (<div className="h-full flex flex-col justify-around">
								<label htmlFor="video">
									Importez votre vidéo
									<input name="video" type='file' onChange={handleImageChange} /> 
								</label>
								<div className="bg-black w-full aspect-[16/9]"></div>
							</div>// Affiche le logo par défaut si sa veut bien marcher
						)}
					</div>
				</div>
			</form>

			<div className="mt-4 ">
					<input className="pr-4" type="submit" value="Annuler" />
					<input type="submit" value="Importer" />
				</div>
				<div className="mt-4 ">
					<h2 className="font-bold text-2xl mb-4">Miniature</h2>
					<h2>
						Sélectionnez ou importez une image qui donne un aperçu du contenu de
						votre vidéo. Une bonne image se remarque et attire l'attention des
						spectateurs
					</h2>
				</div>
		</div>
	);
}
