import React from "react";
import axios from "axios";

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.like = this.like.bind(this);
    this.addLike = this.addLike.bind(this);
    this.removeLike = this.removeLike.bind(this);
    this.removeDislike = this.removeDislike.bind(this);
  }

  async addLike() {
    try {
      await axios.get("http://localhost:5000/api/short/add-short-like", {
        params: {
          id: 1,
          shortId: this.props.id,
        },
      });
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  }

  async removeLike() {
    try {
      await axios.get("http://localhost:5000/api/short/remove-short-like", {
        params: {
          id: 1,
          shortId: this.props.id,
        },
      });
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  }

  async removeDislike() {
    try {
      await axios.get("http://localhost:5000/api/short/remove-short-dislike", {
        params: {
          id: 1,
          shortId: this.props.id,
        },
      });
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  }

  like() {
    if (!this.props.isLiked) {
      if (this.props.isDisliked) {
        this.props.setState((state) => ({
          dislikes: state.dislikes - 1,
          isDisliked: false,
        })); // DISLIKE button already pressed
        this.removeDislike();
      }

      this.props.setState((state) => ({
        likes: state.likes + 1,
        isLiked: true,
      }));
      this.addLike();
    } else {
      this.props.setState((state) => ({
        likes: state.likes - 1,
        isLiked: false,
      })); // LIKE button unpressed
      this.removeLike();
    }
  }

  render() {
    const likeCount =
      this.props.likes < 1000
        ? this.props.likes
        : this.props.likes < 1000000
        ? Math.floor(this.props.likes / 1000) + "K"
        : Math.floor(this.props.likes / 1000000) + "M";
    return (
      <div className="flex flex-col items-center">
        {/* Like button */}
        <button
          id={"like" + this.props.id}
          className={
            "h-[5vh] w-[5vh] flex items-center justify-center rounded-full" +
            (this.props.isLiked
              ? " bg-[#171717]"
              : " bg-[#f5f5f5] hover:bg-[#e5e5e5]")
          }
          onClick={this.like}
        >
          <img
            src="like.png"
            id={"likeImg" + this.props.id}
            className={"scale-50" + (this.props.isLiked ? " invert" : "")}
          />
        </button>
        {/* Likes count */}
        <p className="text-[1.5vh]">{likeCount}</p>
      </div>
    );
  }
}

export default LikeButton;
