import { useLoaderData } from "react-router-dom"
import ReactPlayer from 'react-player'
// import ffmpeg from "ffmpeg"
// import fs from "fs"

export async function loader({ params })
{
    const user = params.user
    return {user}
}

export default function LiveFromUser()
{
    const {user} = useLoaderData()
    console.log(user)
    // var process = new ffmpeg("http://localhost:8090/live/" + user + ".flv");
    // process.then(function (video) {
    //     video.addCommand('-ss', '00:00:01')
    //     video.addCommand('-vframes', '1')
    //     video.save('./test.jpg')
    // })
    return (
        <>
            <p> {user} </p>
            <ReactPlayer url={"http://localhost:8090/live/" + user + ".flv"} controls={false} playing={false} pip={false}/>
        </>
    )
}