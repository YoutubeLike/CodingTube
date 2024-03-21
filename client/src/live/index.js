import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Live() {
    const [UserInLive, setUserInLive] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8090/api/streams")
            .then((response) => {
                if (response.status === 200 && Object.keys(response.data).length > 0) {
                    setUserInLive(Object.keys(response.data["live"]));
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
            {UserInLive.length > 0 ? (
                <>
                    <p className="pl-6">Il y a actuellement {UserInLive.length} live en cours</p>
                    <UserLink userList={UserInLive} />
                </>
            ) : (
                <p className="pl-6">Personne n'est en direct pour le moment</p>
            )}
        </div>
    );
}

export function UserLink({ userList }) {
    const [usersInLive, setUsersInLive] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8090/api/streams")
            .then(response => {
                if (response.status === 200 && Object.keys(response.data).length > 0) {
                    const liveUsers = Object.keys(response.data["live"]);
                    setUsersInLive(liveUsers);
                    liveUsers.forEach(user => {
                        const data = {
                            user: user
                        };
                        axios.post('http://localhost:5000/api/live/save', data)
                            .then(response => {
                                console.log("User data saved successfully:", response.data);
                            })
                            .catch(error => {
                                console.error("Error saving user data:", error);
                            });
                    });
                }
            })
            .catch(error => {
                console.error("Failed to fetch live users:", error);
                setUsersInLive(["Live indisponible"]);
            });
    }, []);

    return (
        <>
            {usersInLive.length === 0 && <p>Personne n'est en direct pour le moment</p>}
            <div className="container mx-auto pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
                    {userList.map((element) => (
                        <div key={element} className="bg-white rounded-md overflow-hidden">
                           <div className="video-container">
                {usersInLive.map(element => (
                    <Link key={element} to={"/live/" + element}>
                        <div className="video">
                            <img width="600px" src={"http://localhost:5000/api/live/thumbnail?user=" + element} alt="" />
                            
                        </div>
                    </Link>
                ))}
            </div>
                            <Link to={"/live/" + element} className="flex items-center">
                                <img
                                    src="./live.jpg"
                                    className="w-12 h-12 rounded-full object-cover"
                                    alt=""
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold mb-2">La revue de presse du mardi 19 mars, c'est jour de grève</h3>
                                    <p className="text-gray-700">{element}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex items-center justify-center my-12">
            <div className="w-80 h-px bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-75 dark:via-neutral-400"></div>
            <div className="relative">
                <div className="w-80 h-12 bg-gradient-to-r from-neutral-500 to-neutral-500 rounded-full flex items-center justify-center">
                <span className="text-white text-lg font-bold">+</span>
                </div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full w-0 h-0 border-solid border-4 border-neutral-500 border-t-0 border-l-0 border-r-0"></div>
            </div>
            <div className="w-80 h-px bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-75 dark:via-neutral-400"></div>
            </div>
                 <div className="flex flex-col">
            <div className="flex flex-nowrap pl-6 pt-6">
            </div>
            <p className="font-bold pl-6 text-2xl flex flex-wrap pt-4">recent live</p>
            <div className="container mx-auto pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
                    {userList.map((element) => (
                        <div key={element} className="bg-white rounded-md overflow-hidden">
                           <div className="video-container">
                {usersInLive.map(element => (
                    <Link key={element} to={"/live/" + element}>
                        <div className="video">
                            <img width="600px" src={"http://localhost:5000/api/live/thumbnail?user=" + element} alt="" />
                        </div>
                    </Link>
                ))}
            </div>
                            <Link to={"/live/" + element} className="flex items-center">
                                <img
                                    src="./live.jpg"
                                    className="w-12 h-12 rounded-full object-cover"
                                    alt=""
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold mb-2">La revue de presse du mardi 19 mars, c'est jour de grève</h3>
                                    <p className="text-gray-700">{element}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
            
        </>
    );
}
