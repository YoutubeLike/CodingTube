import React from "react";
import axios from "axios";
import CommentLikeButton from "./commentLikeButton";
import CommentDislikeButton from "./commentDislikeButton";

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      date: "",
      senderUsername: "",
      senderPP: "",
      likes: 0,
      isLiked: false,
      dislikes: 0,
      isDisliked: false,
      isSuperLiked: false,
    };
  }

  async componentDidMount() {
    // Get comment's metadatas
    try {
      const response = await axios.get(
        "http://localhost:5000/api/short/get-short-comment-infos",
        {
          params: {
            commentId: this.props.id,
          },
        }
      );
      this.setState({
        text: response.data.text,
        date: response.data.comment_date,
        senderUsername: response.data.username,
        senderPP: response.data.PP,
      });
    } catch (error) {
      console.error("Error fetching videos:", error);
    }

    // Set isLiked and isDisliked states with database datas
    try {
      const response = await axios.get(
        "http://localhost:5000/api/short/check-short-comment-like",
        {
          params: {
            id: 1,
            commentId: this.props.id,
          },
        }
      );
      if (response.data.length == 1) {
        this.setState({ isLiked: true });
      } else {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/short/check-short-comment-dislike",
            {
              params: {
                id: 1,
                commentId: this.props.id,
              },
            }
          );
          if (response.data.length == 1) {
            this.setState({ isDisliked: response.data.length == 1 });
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
        "http://localhost:5000/api/short/check-short-comment-like",
        {
          params: {
            id: this.props.uploader,
            commentId: this.props.id,
          },
        }
      );
      this.setState({ isSuperLiked: response.data.length == 1 });
    } catch (error) {
      console.error("Error fetching videos:", error);
    }

    // Get comment's like count
    try {
      const response = await axios.get(
        "http://localhost:5000/api/short/get-short-comment-likes",
        {
          params: {
            commentId: this.props.id,
          },
        }
      );
      this.setState({
        likes: response.data.length,
      });
    } catch (error) {
      console.error("Error fetching videos:", error);
    }

    // Get comment's like count
    try {
      const response = await axios.get(
        "http://localhost:5000/api/short/get-short-comment-dislikes",
        {
          params: {
            commentId: this.props.id,
          },
        }
      );
      this.setState({
        dislikes: response.data.length,
      });
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  }

  render() {
    const secondes =
      (Date.parse(new Date()) - Date.parse(new Date(this.state.date))) / 1000;
    const time =
      secondes < 60
        ? secondes + (secondes < 2 ? " seconde ago" : " secondes ago")
        : secondes < 3600
        ? Math.floor(secondes / 60) +
          (secondes < 120 ? " minute ago" : " minutes ago")
        : secondes < 86400
        ? Math.floor(secondes / 3600) +
          (secondes < 7200 ? " hour ago" : " hours ago")
        : secondes < 604800
        ? Math.floor(secondes / 86400) +
          (secondes < 172800 ? " day ago" : " days ago")
        : secondes < 2592000
        ? Math.floor(secondes / 604800) +
          (secondes < 1209600 ? " week ago" : " weeks ago")
        : secondes < 31536000
        ? Math.floor(secondes / 2592000) +
          (secondes < 5184000 ? " month ago" : " months ago")
        : Math.floor(secondes / 31536000) +
          (secondes < 63072000 ? " year ago" : " years ago");

    return (
      <div className="my-[1vh] flex">
        <div className="rounded-full h-[4.5vh] w-[4.5vh] bg-[#e5e5e5]">
          {/* <img src={this.state.senderPP} /> */}
        </div>

        <div className="px-[2vh] w-[35vh]">
          <div className="mb-[0.3vh] space-x-[0.5vh]">
            <strong className="text-[2vh]">@{this.state.senderUsername}</strong>
            <span className="text-[#525252] text-[1.5vh]">{time}</span>
          </div>

          <p>{this.state.text}</p>

          <div className="flex items-center">
            <div className="flex items-center justify-between space-x-[1vh]">
              <CommentLikeButton
                id={this.props.id}
                likes={this.state.likes}
                isLiked={this.state.isLiked}
                dislikes={this.state.dislikes}
                isDisliked={this.state.isDisliked}
                setState={(p) => this.setState(p)}
              />
              <CommentDislikeButton
                id={this.props.id}
                likes={this.state.likes}
                isLiked={this.state.isLiked}
                dislikes={this.state.dislikes}
                isDisliked={this.state.isDisliked}
                setState={(p) => this.setState(p)}
              />
            </div>

            <button className="ml-[1vh] hover:bg-[#e5e5e5] rounded-full px-[1.5vh] py-[0.95vh]">
              <strong className="text-[1.75vh]"> Reply </strong>
            </button>

            {this.state.isSuperLiked && (
              <p className="ml-[1vh] text-[2vh]">❤️superliked</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Comment;
