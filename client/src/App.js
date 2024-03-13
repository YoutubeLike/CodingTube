import './App.css';
import React, { useEffect, useState } from 'react';
import Header from './header';

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
      <Header />
    </div>
  );
}

export default App;