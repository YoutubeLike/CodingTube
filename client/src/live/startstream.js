import axios from "axios"
import { useEffect, useState } from "react";

function LiveStreamingPage() {
  const [liveName, setLiveName] = useState('');

  const handleStartLive = () => {
    if (liveName.trim() === '') {
      alert('Veuillez entrer un nom pour le live.');
      return;
    }
    

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full px-4 py-8 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-4">changer nom live</h2>
        <div className="mb-4">
          <label htmlFor="liveName" className="block text-gray-700">Nom du Live :</label>
          <input
            type="text"
            id="liveName"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Entrez le nom de votre live"
            value={liveName}
            onChange={(e) => setLiveName(e.target.value)}
          />
        </div>
        <button
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          onClick={handleStartLive}
        > 
          changer le nom de live
        </button>
      </div>
    </div>
  );
}

export default LiveStreamingPage;
