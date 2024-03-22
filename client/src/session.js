import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function CheckSession() {
    // State for isLoggedIn and userId
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [tokenId, setUserToken] = useState(null);
  
    useEffect(() => {
      // Fetch session data from the server
      const fetchSessionData = async () => {
        try {
          const response = await axios.post('http://localhost:5000/api/profil/check-session');
          setIsLoggedIn(response.data.loggedIn);
          if (response.data.loggedIn) {
            setUserToken(response.data.TokenId);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchSessionData();
    }, []);

    // Retourne les informations de session
    return { isLoggedIn, tokenId };
}
