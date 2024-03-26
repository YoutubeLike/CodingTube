import React from "react";
import axios from "axios";
import CommentLikeButton from "./commentLikeButton";
import CommentDislikeButton from "./commentDislikeButton";
import Reply from "./reply";

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
      repliesIds: [],
      userInput: "",
      isReplying: false,
    };
    this.inputFieldRef = React.createRef();
    this.openReply = this.openReply.bind(this);
    this.postReply = this.postReply.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

    // Get short replies
    try {
      const response = await axios.get(
        "http://localhost:5000/api/short/get-short-replies",
        {
          params: {
            replyId: this.props.id,
          },
        }
      );
      this.setState({
        repliesIds: response.data.map((element) => element.id),
      });
    } catch (error) {
      console.error("Error fetching videos:", error);
    }

    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  openReply() {
    this.setState({ isReplying: true });
  }

  handleClickOutside(event) {
    if (
      this.inputFieldRef.current &&
      !this.inputFieldRef.current.contains(event.target)
    ) {
      this.setState({ isReplying: false });
    }
  }

  handleChange(event) {
    this.setState({ userInput: event.target.value });
  }

  async postReply() {
    if (this.state.userInput != "") {
      // Insert comment into database
      try {
        const response = await axios.get(
          "http://localhost:5000/api/short/add-short-reply",
          {
            params: {
              id: 1,
              shortId: this.props.shortInfos.id,
              text: this.state.userInput,
              replyId: this.props.id,
            },
          }
        );
        this.setState((state) => ({
          repliesIds: state.repliesIds.concat(response.data.id),
        }));
      } catch (error) {
        console.error("Error fetching videos:", error);
      }

      document.getElementById("commentsInputField").value = "";
      this.setState({ userInput: "", isReplying: false });
    }
  }

  render() {
    const secondes =
      (Date.parse(new Date()) - Date.parse(new Date(this.state.date))) / 1000;
    const time =
      secondes < 60
        ? secondes + (secondes == 1 ? " second ago" : " seconds ago")
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
      <div className="my-[1vh] flex flex-col">
        <div className="flex">
          <div className="rounded-full h-[4.5vh] w-[4.5vh] overflow-hidden">
            <img src={this.state.senderPP} />
          </div>

          <div className="px-[2vh] w-[35vh]">
            <div className="mb-[0.3vh] space-x-[0.5vh]">
              <strong className="text-[2vh]">
                @{this.state.senderUsername}
              </strong>
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

              <button
                className="ml-[1vh] rounded-full px-[1.5vh] py-[0.95vh] transition ease-in-out hover:bg-[#e5e5e5]"
                onClick={this.openReply}
              >
                <strong className="text-[1.75vh]">Reply</strong>
              </button>

              {this.state.isSuperLiked && (
                <div className="relative">
                  <img
                    src={this.props.superlikePP}
                    className="absolute ml-[1vh] h-[2.4vh] w-[2.4vh] rounded-full relative text-center"
                  />
                  <span className="text-[1.5vh] absolute top-[0.7vh] left-[2.4vh] drop-shadow-xl shadow-white">
                    ❤️
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        {this.state.isReplying && (
          <div
            className="flex items-center p-[1.8vh] border-t-[1px]"
            ref={this.inputFieldRef}
          >
            <div className="rounded-full h-[4.5vh] w-[4.5vh] bg-[#e5e5e5]"></div>

            <input
              id="commentsInputField"
              className="mx-[2vh] text-[2vh]"
              maxLength="1024"
              placeholder="Add a comment..."
              type="text"
              onChange={this.handleChange}
            />

            <button
              onClick={this.postReply}
              className="rounded-full border-[1px] text-[2vh] px-[1.5vh] py-[0.95vh] transition ease-in-out hover:bg-[#e5e5e5]"
            >
              <strong>Post</strong>
            </button>
          </div>
        )}
        <div className="ml-[5vh]">
          {this.state.repliesIds.map((id) => (
            <Reply
              key={id}
              id={id}
              initialCommentId={this.props.id}
              shortInfos={this.props.shortInfos}
              superlikePP={this.props.superlikePP}
              setState={(p) => this.setState(p)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Comment;
