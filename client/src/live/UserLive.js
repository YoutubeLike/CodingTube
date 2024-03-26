import { useLoaderData } from "react-router-dom"
import ReactPlayer from 'react-player'
// syntaxe "import"
import { io } from "socket.io-client";
import Chat from "./chat.js"


export async function loader({ params })
{
    const user = params.user
    return {user}
}

export default function LiveFromUser()
{
    const {user} = useLoaderData()
    const textnode = document.createTextNode("Water");
    return (
        <>
            <p> {user} </p>
            <div style={{width: "640px", height: "360px"}} class="video-container">
                <ReactPlayer style={{position: "absolute", zIndex: "2"}} className="video-container" url={"http://localhost:8090/live/" + user + ".flv"} controls={false} playing={false} pip={false} />
            <img style={{position: "absolute", width: "640px"}} src="/live/offline.jpg" />
            </div>
            <Chat user={user} />
            <button onClick={SendWidget}> Appuye moi </button>
        </>
    )
}

export async function SendWidget()
{
    io("http://localhost:5000").emit("send")
    // axios.get('http://localhost:5000/api/live/test')
}