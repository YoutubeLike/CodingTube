import React from "react";
import axios from "axios";

class CommentLikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.like = this.like.bind(this);
    this.addLike = this.addLike.bind(this);
    this.removeLike = this.removeLike.bind(this);
    this.removeDislike = this.removeDislike.bind(this);
  }

  async addLike() {
    try {
      await axios.get(
        "http://localhost:5000/api/short/add-short-comment-like",
        {
          withCredentials: true,
          params: {
            commentId: this.props.id,
          },
        }
      );
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  }

  async removeLike() {
    try {
      await axios.get(
        "http://localhost:5000/api/short/remove-short-comment-like",
        {
          withCredentials: true,
          params: {
            commentId: this.props.id,
          },
        }
      );
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  }

  async removeDislike() {
    try {
      await axios.get(
        "http://localhost:5000/api/short/remove-short-comment-dislike",
        {
          withCredentials: true,
          params: {
            commentId: this.props.id,
          },
        }
      );
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
    return (
      <div className="flex items-center">
        <button
          className="h-[3vh] w-[3vh] flex items-center"
          onClick={this.like}
        >
          <img
            src={this.props.isLiked ? "like.png" : "commentLikeButton.png"}
            className="scale-[90%]"
          />
        </button>
        <p className="ml-[0.5vh] text-[1.75vh] text-[#525252]">
          {this.props.likes}
        </p>
      </div>
    );
  }
}

export default CommentLikeButton;
