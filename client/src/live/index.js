import axios from "axios"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

export default function Live()
{
    axios.get("http://localhost:5000/api/live/testa", {withCredentials: true}).then((response) => {
        console.log(response.data)
    })
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
    }, []) 
    console.log(UserInLive)
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
                    Object.keys(response.data["live"]).map(element => {
                        const data = {
                                user: element
                            }
                        axios.post('http://localhost:5000/api/live/save', data)
                    })
                    setTest(Object.keys(response.data["live"]))
                }
            }
        })
        .catch(error => setTest(["Live indisponible"]))
    }, []) 
    return(
        <>
            {Test.length == 0 &&
                <p>Personne n'est en direct pour le moment</p>
            }
            <div className="video-container">
                {Test.map(element => <Link key={element} to={"/live/" + element}><div className="video"><img width="600px" src={"http://localhost:5000/api/live/thumbnail?user=" + element} /> <span>{element}</span></div></Link>)}
            </div>

        </>
    )
}
