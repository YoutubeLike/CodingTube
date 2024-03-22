import React, { useState } from "react";
import logo from "../../assets/logo.jpg";
import noir from "../../assets/fondNoir.avif";
import axios from "axios";

export default function UploadVideo() {
	const [videoPreview, setVideoPreview] = useState(null);
	const [imagePreview2, setImagePreview2] = useState(null);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	console.log(category);
	// const [upload_Video_Url, setUploadVideoUrl] = useState("");
	// const [thumbnail, setThumbnail] = useState("");

	function handleImageChange(event) {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setVideoPreview(reader.result);
			};
			reader.readAsDataURL(file);
		}
	}

	function handleFileChange2(event) {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview2(reader.result);
			};
			reader.readAsDataURL(file);
		}
	}
	// Fonction pour gérer le clic sur le bouton "Importer" de la première image
	function handleFirstImageImportButtonClick() {
		document.getElementById("firstFileInput").click();
	}

	// Fonction pour gérer le clic sur le bouton "Importer" de la deuxième image
	function handleSecondImageImportButtonClick() {
		document.getElementById("secondFileInput").click();
	}
	function handleSubmit(event) {
		event.preventDefault();

		// Envoi des données vers le backend uniquement si les champs sont remplis
		if (title.trim() !== "" && description.trim() !== "") {
			// Envoi des données vers le backend avec les URL des images et des vidéos
			axios
				.post("http://localhost:5000/api/channel/submitVideo", {
					title: title,
					description: description,
					category: category,
					// upload_video_url: upload_Video_Url,
					// thumbnail: thumbnail,
				})
				.then((response) => {
					console.log("Réponse du serveur :", response.data);
					setTitle("");
					setDescription("");
					// setUploadVideoUrl("");
					// setThumbnail("");
				})
				.catch((error) => {
					console.error("Erreur lors de la soumission du formulaire :", error); // Ajoutez cette ligne
				});
		} else {
			console.log("Veuillez remplir tous les champs.");
		}
	}

	return (
		<div className="flex flex-col items-center w-full px-[15vw] bg-white p-8 rounded-lg shadow-xl hover:bg-white-300 transition-colors my-4">
			<form className="w-full" onSubmit={handleSubmit}>
				<h2 className="font-bold text-2xl mb-4">Détails</h2>
				<div className="flex">
					<div className="w-3/5">
						<div className="flex mb-4">
							<div className="border-solid border-2 border-gray-500 rounded-md w-full mr-4">
								<label htmlFor="nom" className="pl-2">
									Titre
								</label>
								<input
									name="nom"
									type="text"
									className="outline-none p-2 w-full rounded-md font-bold text-xl"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
								/>
							</div>

							<div className="border-solid border-2 border-gray-500 rounded-md flex flex-col px-2">
								<label className="">Category</label>
								<select
									name="pets"
									id="pet-select"
									className="h-full bg-transparent even:font-bold"
									onChange={(e) => {
										setCategory(e.target.value);
									}}
								>
									<option value="">None</option>
									<option value="Music">Music</option>
									<option value="Video Games">Video games</option>
									<option value="News">News</option>
									<option value="Sport">Sport</option>
									<option value="Culture">Culture</option>
									<option value="Podcasts">Podcasts</option>
								</select>
							</div>
						</div>

						<div className="border-solid border-2 border-gray-600 rounded-md w-full h-60">
							<label htmlFor="identifiant" className="flex flex-cols pl-2">
								Description
							</label>
							<textarea
								name="identifiant"
								type="text"
								className="outline-none p-2 h-[80%] w-full resize-none font-bold"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</div>
					</div>

					<div className=" w-2/5 h-1/1 ml-4 ">
						{videoPreview ? ( // Si videoPreview est défini
							<div className="h-full flex flex-col justify-around">
								<video
									src={videoPreview}
									controls
									className="w-full border-solid border-2 border-gray-600"
								/>{" "}
								{/* Affiche l'aperçu de la vidéo */}
								<label htmlFor="video">
									Changer la vidéo
									<input
										name="video"
										type="file"
										onChange={handleImageChange}
										className="border-none cursor-pointer bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition-colors"
									/>
								</label>
							</div>
						) : (
							<div className="h-full flex flex-col justify-between">
								<div
									className="text-white flex items-center justify-center font-bold bg-black w-full aspect-[16/9] cursor-pointer"
									onClick={handleFirstImageImportButtonClick}
								>
									<p className="text-6xl mb-4 mr-2">+</p>
								</div>
								<p>Nom du fichier :</p>
								<label className="cursor-pointer bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition-colors max-w-28 text-center">
									Importer
									<input
										type="file"
										accept="image/*,video/*"
										className="hidden"
										onChange={handleImageChange}
										id="firstFileInput"
									/>
								</label>
							</div> // Affiche le logo par défaut si sa veut bien marcher
						)}
					</div>
				</div>

				<div className="mb-4 w-full">
					<h2 className="font-bold text-2xl mb-4 pt-4">Miniature</h2>
					<p>
						Sélectionnez ou importez une image ou une vidéo qui donne un aperçu
						du contenu.
					</p>
					<div className="mt-4 max-h-52 max-w-64">
						{imagePreview2 ? (
							<img src={imagePreview2} alt="Preview" className="" />
						) : (
							<img
								src={noir}
								alt="Default"
								className="rounded-md cursor-pointer"
								onClick={handleSecondImageImportButtonClick}
							/>
						)}
					</div>
				</div>
				<div className="w-full">
					<button className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition-colors w-30 mt-10">
						Valider
					</button>
					<input
						type="file"
						accept="image/*"
						id="secondFileInput"
						className="hidden"
						onChange={handleFileChange2}
					/>
				</div>
			</form>
		</div>
	);
}
