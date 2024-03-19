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
    }, []) 
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
        // axios.get('http://localhost:5000/api/live/thumbnail').then(response => console.log(response.data.image) )
    }, []) 
    return(
        <>
            {Test.map(element => <Link key={element} to={"/live/" + element}>{element}</Link>)}
            {/* {Test.map(element => <img src={"data:image/jpeg;base64," +     axios.get('http://localhost:5000/api/live/thumbnail', {responseType: "text"}).then(response => {  return response.data.image })}/>)} */}
            <img src="http://localhost:5000/api/live/thumbnail"/>
            {Test.length == 0 &&
                <p>Personne n'est en direct pour le moment</p>
            }

        </>
    )
}