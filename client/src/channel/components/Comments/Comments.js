import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Comment from './Comment'
import img from "../../assets/logo.jpg"

export default function Comments() {
        const [commentsIds, setCommentsIds] = useState([])

        useEffect(() => {
                const setInitialValues = async () => {
                        // Get comments
                        try {
                                const response = await axios.get(
                                        "http://localhost:5000/api/channel/get-video-comments",
                                        {
                                                params: {
                                                        videoId: 1,
                                                },
                                        }
                                );
                                setCommentsIds(response.data.map((element) => element.id))
                        } catch (error) {
                                console.error("Error fetching videos:", error);
                        }

                }

                setInitialValues();
        }, [])

        async function postComment() {
                const input = document.getElementById('textField').value
                if (input != "") {
                        // Insert comment into database
                        try {
                                const response = await axios.get(
                                        "http://localhost:5000/api/channel/add-video-comment",
                                        {
                                                params: {
                                                        id: 1,
                                                        videoId: 1,
                                                        text: input,
                                                },
                                        }
                                );
                                setCommentsIds(commentsIds.concat(response.data.id))
                        } catch (error) {
                                console.error("Error fetching videos:", error);
                        }

                        document.getElementById("textField").value = "";
                }
        }

        return (
                <div className="flex flex-col pl-10 w-3/4">
                        <p className="font-bold text-xl">{commentsIds.length} {commentsIds.length <= 1 ? "commentaire" : "commentaires"}</p>

                        {/*Mettre un commentaire*/}
                        <div className='flex items-center '>
                                <img src={img} className="w-12 mr-4" />
                                <div class="relative h-11 w-full min-w-[200px]">
                                        <input id='textField' placeholder="Ajoutez un commentaire"
                                                class=" peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
                                        <label
                                                class="after:content[' '] pointer-events-none absolute left-0  -top-2.5 flex h-full w-full select-none !overflow-visible truncate text-sm font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                        </label>
                                        <div className='pt-2 pb-10'>
                                                <button onClick={postComment} className='font-bold bg-blue-600 hover:bg-neutral-600 text-white px-6 pt-2 pb-2 rounded-full '> Poster le commentaire</button>
                                        </div>
                                </div>
                        </div>


                        {commentsIds.map(element => <Comment commentId={element} />)}
                </div>

        )
}

