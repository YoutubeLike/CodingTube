import React, { useEffect, useState } from "react";
import axios from "axios";
import dislikeImg from "../../assets/dislike.png";
import likeImg from "../../assets/like.png";
import shareImg from "../../assets/share.png";

export default function LikeDislike() {
  const [video_id, setVideo_id] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [nb_like, setNb_like] = useState(0);
  const [nb_dislike, setNb_dislike] = useState(0);

  useEffect(() => {
    const setInitialValues = async () => {
      // Set isLiked and isDisliked states with database datas
      try {
        const response = await axios.get(
          "http://localhost:5000/api/channel/check-video-like",
          {
            withCredentials: true,
            params: {
              videoId: video_id,
            },
          }
        );
        if (response.data.length == 1) {
          setIsLiked(true);
        } else {
          try {
            const response = await axios.get(
              "http://localhost:5000/api/channel/check-video-dislike",
              {
                withCredentials: true,
                params: {
                  videoId: video_id,
                },
              }
            );
            if (response.data.length == 1) {
              setIsDisliked(true);
            }
          } catch (error) {
            console.error("Error fetching videos:", error);
          }
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      }

      // Get likes count
      try {
        const response = await axios.get(
          "http://localhost:5000/api/channel/get-video-likes",
          {
            params: {
              videoId: video_id,
            },
          }
        );
        setNb_like(response.data.length);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }

      // Get dislikes count
      try {
        const response = await axios.get(
          "http://localhost:5000/api/channel/get-video-dislikes",
          {
            params: {
              videoId: video_id,
            },
          }
        );
        setNb_dislike(response.data.length);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    setInitialValues();
  }, []);

  async function addLike() {
    try {
      await axios.get("http://localhost:5000/api/channel/add-video-like", {
        withCredentials: true,
        params: {
          videoId: video_id,
        },
      });
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  }

  async function addDislike() {
    try {
      await axios.get("http://localhost:5000/api/channel/add-video-dislike", {
        withCredentials: true,
        params: {
          videoId: video_id,
        },
      });
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  }

  async function removeLike() {
    try {
      await axios.get("http://localhost:5000/api/channel/remove-video-like", {
        withCredentials: true,
        params: {
          videoId: video_id,
        },
      });
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  }

  async function removeDislike() {
    try {
      await axios.get(
        "http://localhost:5000/api/channel/remove-video-dislike",
        {
          withCredentials: true,
          params: {
            videoId: video_id,
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
        setNb_dislike(nb_dislike - 1);
        setIsDisliked(false);
        // DISLIKE button already pressed
        removeDislike();
      }

      setNb_like(nb_like + 1);
      setIsLiked(true);
      addLike();
    } else {
      setNb_like(nb_like - 1);
      setIsLiked(false);
      // LIKE button unpressed
      removeLike();
    }
  }

  function dislike() {
    if (!isDisliked) {
      if (isLiked) {
        setNb_like(nb_like - 1);
        setIsLiked(false);
        // LIKE button already pressed
        removeLike();
      }

      setNb_dislike(nb_dislike + 1);
      setIsDisliked(true);
      addDislike();
    } else {
      setNb_dislike(nb_dislike - 1);
      setIsDisliked(false);
      // DISLIKE button unpressed
      removeDislike();
    }
  }

  return (
    <div className="flex justify-normal ">
      <button
        onClick={like}
        className="bg-gray-100 px-8 ml-10 rounded-l-full flex items-center"
      >
        <img className="w-6 py-2 mr-2" src={likeImg} />
        {nb_like}
      </button>
      <button
        onClick={dislike}
        className="bg-gray-100 px-8 rounded-r-full flex items-center"
      >
        <img className="w-6 py-2 mr-2" src={dislikeImg} />
        {nb_dislike}
      </button>
      <button className="bg-gray-100 px-8 ml-10 rounded-full">
        <img className="w-6 py-2" src={shareImg} />
      </button>
    </div>
  );
}
