import React from "react";
import axios from "axios";

class CommentDislikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.dislike = this.dislike.bind(this);
    this.addDislike = this.addDislike.bind(this);
    this.removeDislike = this.removeDislike.bind(this);
    this.removeLike = this.removeLike.bind(this);
  }

  async addDislike() {
    try {
      await axios.get(
        "http://localhost:5000/api/short/add-short-comment-dislike",
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
    return (
      <div className="flex items-center">
        <button
          className="h-[3vh] w-[3vh] flex items-center"
          onClick={this.dislike}
        >
          <img
            src={
              this.props.isDisliked ? "dislike.png" : "commentDislikeButton.png"
            }
            className="scale-[90%]"
          />
        </button>
        <p className="ml-[0.5vh] text-[1.75vh] text-[#525252]">
          {this.props.dislikes}
        </p>
      </div>
    );
  }
}

export default CommentDislikeButton;
