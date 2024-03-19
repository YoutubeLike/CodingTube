import axios from "axios"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

export default function Live()
{
    const [UserInLive, setUserInLive] = useState([])
    useEffect(() => {
        axios.get("http://localhost:8090/api/streams")        
        .then((response) => {
            if(response.status)
            {
                if(Object.keys(response.data).length > 0)
                {
                    setUserInLive(Object.keys(response.data["live"]))
                }
            }
        })
        .catch(error => console.log('Server unreachable'))
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
        axios.get("http://localhost:8090/api/streams")
        .then(response => {
            if(response.status)
            {
                if(Object.keys(response.data).length > 0)
                {
                    setTest(Object.keys(response.data["live"]))
                }
            }
        })
        .catch(error => setTest(["Live indisponible"]))


    }) 


    return(
        <>
            {Test.map(element => <Link key={element} to={"/live/" + element}>{element}</Link>)}
            

            {Test.length == 0 &&
                <p>Personne n'est en direct pour le moment</p>
            }

        </>
    )
}