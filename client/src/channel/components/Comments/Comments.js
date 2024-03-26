import React from "react";
import img from "../../assets/logo.jpg";
import dislike from "../../assets/dislike.png";
import like from "../../assets/like.png";

export default function Comments() {
	return (
		<div className="flex flex-col pl-10 mt-8 w-3/4">
			<p className="font-bold text-2xl">39 commentaires</p>

			{/*Mettre un commentaire*/}
			<div className="flex items-center mt-8">
				<img src={img} className="w-12 mr-4" />
				<div class="relative h-11 w-full min-w-[200px]">
					<input
						placeholder="Ajoutez un commentaire"
						class="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
					/>
					<label class="after:content[' '] pointer-events-none absolute left-0  -top-2.5 flex h-full w-full select-none !overflow-visible truncate text-sm font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
				</div>
			</div>

			<div className="flex items-center mt-8">
				<img src={img} className="w-12 mr-4" />
				<div>
					<p className="text-xl font-bold mt-2">Nom de la chaîne</p>
					<p>Incroyable vidéo, j'aime le caca</p>
					<div className="flex">
						<button>
							<img src={like} className="w-8 h-8 mr-14 mt-2"></img>
						</button>
						<button>
							<img src={dislike} className="w-8 h-8 mt-2"></img>
						</button>
						<p className="mt-2 ml-10">Répondre</p>
					</div>
				</div>
			</div>

			<div className="flex items-center mt-8">
				<img src={img} className="w-12 mr-4" />
				<div>
					<p className="text-xl font-bold mt-2">Nom de la chaîne</p>
					<p>Incroyable vidéo, j'aime le caca</p>
					<div className="flex">
						<button>
							<img src={like} className="w-8 h-8 mr-14 mt-2"></img>
						</button>
						<button>
							<img src={dislike} className="w-8 h-8 mt-2"></img>
						</button>
						<p className="mt-2 ml-10">Répondre</p>
					</div>
				</div>
			</div>

			<div className="flex items-center mt-8">
				<img src={img} className="w-12 mr-4" />
				<div>
					<p className="text-xl font-bold mt-2">Nom de la chaîne</p>
					<p>Incroyable vidéo, j'aime le caca</p>
					<div className="flex">
						<button>
							<img src={like} className="w-8 h-8 mr-14 mt-2"></img>
						</button>
						<button>
							<img src={dislike} className="w-8 h-8 mt-2"></img>
						</button>
						<p className="mt-2 ml-10">Répondre</p>
					</div>
				</div>
			</div>
		</div>
	);
}
