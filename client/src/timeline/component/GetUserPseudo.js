import { useState, useEffect } from "react";
import axios from "axios";

export default function GetUserPseudo() {
  var [userName, setUserName] = useState([]);
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const answer = await axios.get(
          `http://localhost:5000/api/timeline/userName`,
          {
            withCredentials: true,
          }
        );
        console.log("coucou");
        setUserName(answer.data);
      } catch (error) {
        console.error("Error fetching user infos:", error);
      }
    };
    fetchUserName();
  }, []);
  
  return userName[0]['username']
}
