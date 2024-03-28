import React, { useEffect, useState } from 'react'
import axios from 'axios'
import img from "../../assets/logo.jpg"
import LikeDislike from './LikeDislikeButtons'

export default function Comment({ commentId }) {
    const [videoUploaderId, setVideoUploaderId] = useState("1")
    const [senderId, setSenderId] = useState("1")
    const [text, setText] = useState("")
    const [date, setDate] = useState("")
    const [senderUsername, setSenderUsername] = useState("LECACA")
    const [senderPP, setSenderPP] = useState("")

    useEffect(() => {
        const setInitialValues = async () => {
            // Get comment's metadatas
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/channel/get-video-comment-infos",
                    {
                        params: {
                            commentId: commentId,
                        },
                    }
                );
                setText(response.data.text);
                setDate(response.data.comment_date);
                setSenderUsername(response.data.username);
                setSenderPP(response.data.PP);
            } catch (error) {
                console.error("Error fetching videos:", error);
            }
        }

        setInitialValues();
    }, [])

    return (
        <div className='flex items-center mt-12 w-3/4'>
            <img src={img} className="w-12 mr-4" />
            <div>
                <p className="text-sm font-bold mt-2">{senderUsername}</p>
                <p>{text}</p>
                <LikeDislike commentId={commentId}/>

            </div>
        </div>
    )


}