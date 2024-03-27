import React from "react";

export default function Accueil() {
	return (
		<>
			{/* Contenu */}
			<div className="content p-4">
				{/* Insérer le contenu ici */}
				<div>
					<h2 className="text-xl font-bold mb-4 flex border-b-2">Pour vous</h2>
					<p className="flex">Affichage des dernières vidéos postés</p>
				</div>
				<div>
					<h2 className="text-xl font-bold mb-4 flex border-b-2">Vidéos</h2>
					<p className="flex">Affichage des vidéos</p>
				</div>
				<div>
					<h2 className="text-xl font-bold mb-4 flex border-b-2">Shorts</h2>
					<p className="flex">Affichage des shorts</p>
				</div>
				<div>
					<h2 className="text-xl font-bold mb-4 flex border-b-2">Playlists</h2>
					<p className="flex">Affichage des playlists</p>
				</div>
			</div>
			{/* Liste des contenus */}
		</>
	);
}
