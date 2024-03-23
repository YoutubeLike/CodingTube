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
            this.setState({ isDisliked: true });
          }
        } catch (error) {
          console.error("Error fetching videos:", error);
        }
      }
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
  }

  render() {
    // const now = new Date().toUTCString()
    // console.log(now)
    return (
      <div className="flex flex-row my-2">
        <div className="rounded-full h-[4.5vh] w-[4.5vh] bg-[#e5e5e5] content-start">
          {/* <img src={this.state.senderPP} /> */}
        </div>

        <div className="px-[1.9vh] max-w-[88%]">
          <div className="text-sm mb-[3px]">
            <strong> @{this.state.senderUsername} </strong>
            <span className="text-[#525252] text-xs">{this.state.date}</span>
          </div>

          <div className="text-ellipsis overflow-hidden">{this.state.text}</div>

          <div className="flex flex-row items-center text-xs">
            <div className="flex flex-row items-center">
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

            <button className="ml-[3px] hover:bg-[#e5e5e5] rounded-[30px] px-[12px] py-[9px]">
              <strong> Reply </strong>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Comment;
