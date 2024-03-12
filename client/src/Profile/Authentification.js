import React, { useState } from 'react';


const Authentification = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();


  };

  return (
    <form onSubmit={handleLogin}>
      <label>
        username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button type="submit">Se connecter</button>
    </form>
  );
};

export default Authentification;
