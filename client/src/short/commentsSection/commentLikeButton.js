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
      await axios.get("http://localhost:5000/api/short/add-short-comment-like", {
        params: {
          id: 1,
          commentId: this.props.id,
        },
      });
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  }

  async removeLike() {
    try {
      await axios.get("http://localhost:5000/api/short/remove-short-comment-like", {
        params: {
          id: 1,
          commentId: this.props.id,
        },
      });
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  }

  async removeDislike() {
    try {
      await axios.get("http://localhost:5000/api/short/remove-short-comment-dislike", {
        params: {
          id: 1,
          commentId: this.props.id,
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
    return (
      <div className="flex flex-row items-center">
        <button className="h-[3vh] w-[3vh] flex items-center justify-center" onClick={this.like}>
          <img src={this.props.isLiked ? "like.png" : "commentLikeButton.png"} className="scale-[90%]" />
        </button>
        <span className="text-[#525252] ml-[3px]">{this.props.likes}</span>
      </div>
    );
  }
}

export default CommentLikeButton;
