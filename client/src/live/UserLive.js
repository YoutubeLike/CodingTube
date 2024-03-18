import { useLoaderData } from "react-router-dom"
import ReactPlayer from 'react-player'

export async function loader({ params })
{
    const user = params.user
    return {user}
}

export default function LiveFromUser()
{
    const {user} = useLoaderData()
    console.log(user)
    return (
        <>
            <p> {user} </p>
            <ReactPlayer url={"http://localhost:8090/live/" + user + ".flv"} controls={true} playing={true}/>
        </>
    )
}