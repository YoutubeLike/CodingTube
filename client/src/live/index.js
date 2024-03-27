import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Live() {
    const [userInLive, setUserInLive] = useState([]);
    const [title, setTitle] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/api/live/title", { withCredentials: true })
            .then((response) => {
                setTitle(response.data.title);
            })
            .catch(error => console.log('Failed to fetch live title:', error));
        axios.get("http://localhost:8090/api/streams")
            .then((response) => {
                if (response.status === 200 && Object.keys(response.data).length > 0) {
                    setUserInLive(Object.keys(response.data.live));
                }
            })
            .catch(error => console.log('Server unreachable'));
    }, []);

    return (
        <div className="flex flex-col">
            <div className="flex flex-nowrap pl-6 pt-6">
                <img src="./Live.jpg" className="rounded-full h-20 w-20" alt="" />
                <h1 className="text-4xl font-bold pl-2 pt-5">Live</h1>
            </div>
            <p className="font-bold pl-6 text-2xl flex flex-wrap pt-4">Live Now</p>
            {userInLive.length > 0 ? (
                <>
                    <p className="pl-6">Il y a actuellement {userInLive.length} live en cours</p>
                    <UserLink userList={userInLive} title={title} />

                </>
            ) : (
                <p className="pl-6">Personne n'est en direct pour le moment</p>
            )}
        </div>
    );
}

export function UserLink({ userList, title }) {
    const [usersInLive, setUsersInLive] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8090/api/streams")
            .then(response => {
                if (response.status === 200 && Object.keys(response.data).length > 0) {
                    const liveUsers = Object.keys(response.data.live);

                    setUsersInLive(liveUsers);
                }
            })
            .catch(error => {
                console.error("Failed to fetch live users:", error);
                setUsersInLive(["Live indisponible"]);
            });
    }, []);

    userList.map((CUser) => {
        axios.post("http://localhost:5000/api/live/save", { user : CUser})
    })
    return (
        <>
            {usersInLive.length === 0 && (
                <p>Personne n'est en direct pour le moment</p>
            )}
            <div className="container mx-auto pt-2 flex flex-wrap justify-start">
                {userList && userList.map((element) => (
                    <div key={element} className="bg-white rounded-md overflow-hidden m-4">
                        <div className="video-container" style={{ maxWidth: '500px' }}>
                            <Link to={"/live/" + element}>
                                <div className="video">
                                    <img width="500px" src={"http://localhost:5000/api/live/thumbnail?user=" + element} alt="" />
                                </div>
                            </Link>
                        </div>
                        <Link to={"/live/" + element} className="flex items-center">
                            <img
                                src="./live.jpg"
                                className="w-12 h-12 rounded-full object-cover"
                                alt=""
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2 max-w-[400px]">{title}</h3>
                                <div className="">
                                    <p className="text-gray-700 max-w-[400px]"></p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            <p className="font-bold pl-6 text-2xl flex flex-wrap pt-4">recent live</p>
        </>
    );
}

