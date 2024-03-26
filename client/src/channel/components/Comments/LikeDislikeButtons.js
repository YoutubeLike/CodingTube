import React, { useEffect, useState } from 'react'
import axios from 'axios'
import dislikeImg from '../../assets/dislike.png'
import likeImg from '../../assets/like.png'

export default function LikeDislike({ commentId }) {
    const [nb_like, setNb_like] = useState(0)
    const [nb_dislike, setNb_dislike] = useState(0)
    const [isLiked, setIsLiked] = useState(false)
    const [isDisliked, setIsDisliked] = useState(false)
    const [isSuperLiked, setIsSuperLiked] = useState(false)

    useEffect(() => {
        const setInitialValues = async () => {
            // Set isLiked and isDisliked states with database datas
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/channel/check-video-comment-like",
                    {
                        params: {
                            id: 1,
                            commentId: commentId,
                        },
                    }
                );
                if (response.data.length == 1) {
                    setIsLiked(true);
                } else {
                    try {
                        const response = await axios.get(
                            "http://localhost:5000/api/channel/check-video-comment-dislike",
                            {
                                params: {
                                    id: 1,
                                    commentId: commentId,
                                },
                            }
                        );
                        if (response.data.length == 1) {
                            setIsDisliked(response.data.length == 1);
                        }
                    } catch (error) {
                        console.error("Error fetching videos:", error);
                    }
                }
            } catch (error) {
                console.error("Error fetching videos:", error);
            }

            // Set isSuperLiked state
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/channel/check-video-comment-like",
                    {
                        params: {
                            id: 1,
                            commentId: commentId,
                        },
                    }
                );
                setIsSuperLiked(response.data.length == 1);
            } catch (error) {
                console.error("Error fetching videos:", error);
            }

            // Get comment's like count
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/channel/get-video-comment-likes",
                    {
                        params: {
                            commentId: commentId,
                        },
                    }
                );
                setNb_like(response.data.length)
            } catch (error) {
                console.error("Error fetching videos:", error);
            }

            // Get comment's like count
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/channel/get-video-comment-dislikes",
                    {
                        params: {
                            commentId: commentId,
                        },
                    }
                );
                setNb_dislike(response.data.length)
            } catch (error) {
                console.error("Error fetching videos:", error);
            }
        }

        setInitialValues();
    }, [])

    async function addLike() {
        try {
            await axios.get(
                "http://localhost:5000/api/channel/add-video-comment-like",
                {
                    params: {
                        id: 1,
                        commentId: commentId,
                    },
                }
            );
        } catch (error) {
            console.error("Error fetching videos:", error);
        }
    }

    async function addDislike() {
        try {
            await axios.get(
                "http://localhost:5000/api/channel/add-video-comment-dislike",
                {
                    params: {
                        id: 1,
                        commentId: commentId,
                    },
                }
            );
        } catch (error) {
            console.error("Error fetching videos:", error);
        }
    }

    async function removeLike() {
        try {
            await axios.get(
                "http://localhost:5000/api/channel/remove-video-comment-like",
                {
                    params: {
                        id: 1,
                        commentId: commentId,
                    },
                }
            );
        } catch (error) {
            console.error("Error fetching videos:", error);
        }
    }

    async function removeDislike() {
        try {
            await axios.get(
                "http://localhost:5000/api/channel/remove-video-comment-dislike",
                {
                    params: {
                        id: 1,
                        commentId: commentId,
                    },
                }
            );
        } catch (error) {
            console.error("Error fetching videos:", error);
        }
    }

    function like() {
        if (!isLiked) {
            if (isDisliked) {
                setNb_dislike(nb_dislike - 1)
                setIsDisliked(false)
                // DISLIKE button already pressed
                removeDislike();
            }

            setNb_like(nb_like + 1)
            setIsLiked(true)
            addLike();
        } else {
            setNb_like(nb_like - 1)
            setIsLiked(false)
            // LIKE button unpressed
            removeLike();
        }
    }

    function dislike() {
        if (!isDisliked) {
            if (isLiked) {
                setNb_like(nb_like - 1)
                setIsLiked(false)
                // LIKE button already pressed
                removeLike();
            }

            setNb_dislike(nb_dislike + 1)
            setIsDisliked(true)
            addDislike();
        } else {
            setNb_dislike(nb_dislike - 1)
            setIsDisliked(false)
            // DISLIKE button unpressed
            removeDislike();
        }
    }
    return (
        <div className="flex">
          <button className='flex items-center' onClick={like}>
            <img src={likeImg} className='w-6 h-6 mr-2 mt-1' /> {/* Reduced mr-14 to mr-2 */}
            {nb_like}
          </button>
          <button className='flex items-center pl-2' onClick={dislike}>
            <img src={dislikeImg} className='w-6 h-6 mr-2 mt-1' /> {/* No change to margin */}
            {nb_dislike}
          </button>
          <p className='mt-2 ml-10'>Répondre</p>
        </div>
      );
      
}