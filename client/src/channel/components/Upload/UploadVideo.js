import React, { useState } from "react";
import axios from 'axios';
import logo from "../../assets/logo.jpg";
import noir from "../../assets/fondNoir.avif";

export default function UploadVideo() {
    const [videoPreview, setVideoPreview] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [videoFile, setVideoFile] = useState(null);

    function handleVideoChange(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setVideoPreview(reader.result);
            };
            reader.readAsDataURL(file);
            setVideoFile(file);
        }
    }

    function handleThumbnailChange(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
            setThumbnailFile(file);
        }
    }

    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('video', videoFile);
		formData.append('thumbnail', thumbnailFile)

        axios.post('http://localhost:5000/api/channel/submitVideo', formData)
            .then(response => {
                console.log('Server response:', response.data);
                setTitle("");
                setDescription("");
                setCategory("");
                setThumbnailFile(null);
                setVideoFile(null);
                setVideoPreview(null);
                setImagePreview(null);
            })
            .catch(error => {
                console.error('Error submitting form:', error);
            });
    }

    return (
        <div className="flex flex-col items-center w-full px-[15vw] bg-white p-8 rounded-lg shadow-xl hover:bg-white-300 transition-colors my-4">
            <form className="w-full" onSubmit={handleSubmit}>
                <h2 className="font-bold text-2xl mb-4">Détails</h2>
                <div className="flex">
                    <div className="w-3/5">
                        <div className="flex mb-4">
                            <div className="border-solid border-2 border-gray-500 rounded-md w-full mr-4">
                                <label htmlFor="title" className="pl-2">Titre</label>
                                <input name="title" type="text" className="outline-none p-2 w-full rounded-md font-bold text-xl" value={title} onChange={(e) => setTitle(e.target.value)} />
                            </div>

                            <div className="border-solid border-2 border-gray-500 rounded-md flex flex-col px-2">
                                <label>Catégorie</label>
                                <select className="h-full bg-transparent font-bold" value={category} onChange={(e) => setCategory(e.target.value)}>
                                    <option value="">Sélectionner une catégorie</option>
                                    <option value="Music">Musique</option>
                                    <option value="VideoGames">Jeux vidéo</option>
                                    <option value="News">Actualités</option>
                                    <option value="Sports">Sports</option>
                                    <option value="Culture">Culture</option>
                                    <option value="Podcasts">Podcasts</option>
                                </select>
                            </div>
                        </div>

                        <div className="border-solid border-2 border-gray-600 rounded-md w-full h-60">
                            <label htmlFor="description" className="flex flex-cols pl-2">Description</label>
                            <textarea name="description" className="outline-none p-2 h-[80%] w-full resize-none font-bold" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                    </div>

                    <div className="w-2/5 h-1/1 ml-4">
                        {videoPreview ? (
                            <div className="h-full flex flex-col justify-around">
                                <video src={videoPreview} controls className="w-full border-solid border-2 border-gray-600" />
                                <label htmlFor="videoInput">Changer la vidéo</label>
                                <input id="videoInput" type="file" name="video" accept="video/*" onChange={handleVideoChange} className="border-none cursor-pointer bg-blue-500 text-white py-input px-6 rounded-md hover:bg-blue-600 transition-colors" />
                            </div>
                        ) : (
                            <div className="h-full flex flex-col justify-between">
                                <div className="text-white flex items-center justify-center font-bold bg-black w-full aspect-[16/9] cursor-pointer" onClick={() => document.getElementById('videoInput').click()}>
                                    <p className="text-6xl mb-4 mr-2">+</p>
                                </div>
                                <p>Nom du fichier :</p>
                                <label className="cursor-pointer bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition-colors max-w-28 text-center">
                                    Importer
                                    <input type="file" name="video" accept="video/*" className="hidden" onChange={handleVideoChange} />
                                </label>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mb-4 w-full">
                    <h2 className="font-bold text-2xl mb-4 pt-4">Miniature</h2>
                    <p>Sélectionnez ou importez une image ou une vidéo qui donne un aperçu du contenu.</p>
                    <div className="mt-4 max-h-52 max-w-64">
                        {imagePreview ? (
                            <img src={imagePreview} alt="Preview" className="" />
                        ) : (
                            <img src={noir} alt="Default" className="rounded-md cursor-pointer" onClick={() => document.getElementById('thumbnailInput').click()} />
                        )}
                    </div>
                </div>
                <div className="w-full">
                    <button type="submit" className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition-colors w-30 mt-10">
                        Valider
                    </button>
                    <input type="file" accept="image/*" id="thumbnailInput" className="hidden" onChange={(e)=>{handleThumbnailChange(e)}}/>
                </div>
            </form>
        </div>
    );
}


