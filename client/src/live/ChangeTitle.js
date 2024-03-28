import axios from 'axios';
import React, { useEffect, useState } from 'react';

function LiveStreamingPage() {
  const [title, settitle] = useState('');
  const [liveKey, setLiveKey] = useState('');

  const handleChangeTitle = () => {
    if (title.trim() === '') {
      alert('Veuillez entrer un nom pour le live.');
      return;
    }
    axios.post('http://localhost:5000/api/live/streamManagerT', { title }, { withCredentials: true})
      .then(response => {
        alert(response.data);
      })
      .catch(error => {
        console.error('Une erreur s\'est produite lors de la mise à jour du nom du live :', error);
        alert('Une erreur s\'est produite lors de la mise à jour du nom du live. Veuillez réessayer.');
      });  
  }

  useEffect(() => {
    axios.get('http://localhost:5000/api/live/streamManagerK', { withCredentials: true})
      .then(response => {
        setLiveKey(response.data.liveKey);
      })
      .catch(error => {
        console.error('Une erreur s\'est produite lors de la mise à jour de la clé de stream :', error);
        alert('Une erreur s\'est produite lors de la mise à jour de la clé de stream. Veuillez réessayer.');
      });
  }, [])

  const HandleStreamKey = () => {
    axios.get('http://localhost:5000/api/live/LiveStreamKey', { withCredentials: true})
    axios.get('http://localhost:5000/api/live/streamManagerK', { withCredentials: true})
    .then(response => {
      setLiveKey(response.data.liveKey);
    })
    .catch(error => {
      console.error('Une erreur s\'est produite lors de la mise à jour de la clé de stream :', error);
      alert('Une erreur s\'est produite lors de la mise à jour de la clé de stream. Veuillez réessayer.');
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full px-4 py-8 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-4">Changer le nom du live</h2>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">Nom du Live :</label>
          <input
            type="text"
            id="title"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Entrez le nom de votre live"
            value={title}
            onChange={(e) => settitle(e.target.value)}
          />
        </div>
        <button
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          onClick={handleChangeTitle}
        > 
          Changer le nom du live
        </button>
      </div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="px-4 py-8 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-4">génerer clé de stream</h2>
        <div className="mb-4">
          <label className="block text-gray-700">clé de stream</label>
        {console.log ({})}
          <input
            disabled
            type="text"
            id="title"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            value={liveKey}
          />
        </div>
        <button
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          onClick={HandleStreamKey}
        > 
          generé clé de stream
        </button>
      </div>
    </div>
    </div>
  );
}

export default LiveStreamingPage;