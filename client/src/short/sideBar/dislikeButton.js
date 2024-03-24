import React from "react";
import axios from "axios";

class DislikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.dislike = this.dislike.bind(this);
    this.addDislike = this.addDislike.bind(this);
    this.removeDislike = this.removeDislike.bind(this);
    this.removeLike = this.removeLike.bind(this);
  }

  async addDislike() {
    try {
      await axios.get("http://localhost:5000/api/short/add-short-dislike", {
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

  dislike() {
    if (!this.props.isDisliked) {
      if (this.props.isLiked) {
        this.props.setState((state) => ({
          likes: state.likes - 1,
          isLiked: false,
        })); // LIKE button already pressed
        this.removeLike();
      }

      this.props.setState((state) => ({
        dislikes: state.dislikes + 1,
        isDisliked: true,
      }));
      this.addDislike(1);
    } else {
      this.props.setState((state) => ({
        dislikes: state.dislikes - 1,
        isDisliked: false,
      })); // DISLIKE button unpressed
      this.removeDislike();
    }
  }

  render() {
    const dislikeCount =
      this.props.likes < 1000
        ? this.props.dislikes
        : this.props.dislikes < 1000000
        ? Math.floor(this.props.dislikes / 1000) + "K"
        : Math.floor(this.props.dislikes / 1000000) + "M";
    return (
      <div className="flex flex-col items-center">
        {/* Dislike button */}
        <button
          id={"dislike" + this.props.id}
          className={
            "h-[5vh] w-[5vh] flex items-center justify-center rounded-full" +
            (this.props.isDisliked
              ? " bg-[#171717]"
              : " bg-[#f5f5f5] hover:bg-[#e5e5e5]")
          }
          onClick={this.dislike}
        >
          <img
            src="dislike.png"
            id={"dislikeImg" + this.props.id}
            className={"scale-50" + (this.props.isDisliked ? " invert" : "")}
          />
        </button>

        {/* Dislikes count */}
        <p className="text-[1.5vh]">{dislikeCount}</p>
      </div>
    );
  }
}

export default DislikeButton;
