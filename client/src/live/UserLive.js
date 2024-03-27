import { useLoaderData } from "react-router-dom"
import ReactPlayer from 'react-player'
// syntaxe "import"
import { io } from "socket.io-client";
import Chat from "./chat.js"
import { useEffect, useState } from "react";


export async function loader({ params })
{
    const user = params.user
    return {user}
}

export default function LiveFromUser()
{
    const {user} = useLoaderData()
    const [UserSize, setUserSize] = useState()
    const socket = io("http://localhost:5000")
    const [Socket, SetSocket] = useState(socket);
    
    
    useEffect(() => {
        // SetSocket(socket);
        socket.emit("AskUserCount", {user : user});

        socket.on("user-count", (arg) => {
            
        setUserSize(arg.size)
        console.log(arg.size)
        
    }, [])  
    })

    console.log(Socket)

    return (
        <>
            <p> {user} </p>
            <div style={{width: "640px", height: "360px"}} class="video-container">
                <ReactPlayer style={{position: "absolute", zIndex: "2"}} className="video-container" url={"http://localhost:8090/live/" + user + ".flv"} controls={false} playing={false} pip={false} />
            <img style={{position: "absolute", width: "640px"}} src="/live/offline.jpg" />
            </div>
            <Chat user={user} socket={Socket} />
            <p>{UserSize}</p>
            {/* <button onClick={SendWidget}> Appuye moi </button> */}
            
        </>
    )
}


export async function SendWidget()
{
    io("http://localhost:5000").emit("send")
}