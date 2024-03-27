import { useState } from "react";
import { io } from "socket.io-client";


export default function Test()
{
    const [message, SetMessage] = useState([]);

    io("http://localhost:5000").on("chat-message", () => {
        console.log('message recu')
        SetMessage("bonjour");
        setTimeout(function() {
            SetMessage("");
        }, 2000 )
    })
    return(
        <>
        <p>{message}</p> 
        </>
    )
}