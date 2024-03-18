import axios from "axios"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

export default function Live()
{
    const [UserInLive, setUserInLive] = useState([])
    useEffect(() => {
        var stream = axios.get("http://localhost:8090/api/streams");
        stream.then((response) => {
            
            setUserInLive(Object.keys(response.data["live"]))
        })
    }) 
    return (
        <div>
            <p>Voici les utilisateurs en live</p>
            <p>{UserInLive.length} utilisateurs ont été trouvé</p>
            <UserLink />
        </div>
    )
}



export function UserLink()
{
    const [Test, setTest] = useState([])
    useEffect(() => {
        var stream = axios.get("http://localhost:8090/api/streams");
        stream.then((response) => {
            
            setTest(Object.keys(response.data["live"]))
        })
    }) 
    return(
        <>
            {Test.map(element => <Link to={"/live/" + element}>{element}</Link>)}
        </>
        // <p>{}</p>
    )
}