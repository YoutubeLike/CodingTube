import './App.css';
import React, { useEffect, useState } from 'react';


function App() {
  const [message, setMessage] = useState('');
  useEffect(() => {
    fetch('http://localhost:5000/')
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <h1 className="text-3xl font-bold underline">{message} Bonjour </h1>
    </div>
  );
}

export default App;