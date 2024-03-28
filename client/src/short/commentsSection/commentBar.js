import React from "react";
import axios from "axios";
import Comment from "./comment";

class CommentBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedUserInfos: {},
      commentsIds: [],
      userInput: "",
    };
    this.postComment = this.postComment.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.closeComments = this.closeComments.bind(this);
  }

  async componentDidMount() {
    // Get comments count
    try {
      const response = await axios.get(
        "http://localhost:5000/api/short/get-short-comments",
        {
          params: {
            shortId: this.props.shortInfos.id,
          },
        }
      );
      this.setState({
        commentsIds: response.data.map((element) => element.id),
      });
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
    // Get logged user infos
    try {
      const response = await axios.get(
        "http://localhost:5000/api/short/get-logged-user-profle-info",
        {
          withCredentials: true,
        }
      );
      this.setState({
        loggedUserInfos: response.data,
      });
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  }

  handleChange(event) {
    this.setState({ userInput: event.target.value });
  }

  async postComment() {
    if (this.state.userInput != "") {
      // Insert comment into database
      try {
        const response = await axios.get(
          "http://localhost:5000/api/short/add-short-comment",
          {
            withCredentials: true,
            params: {
              shortId: this.props.shortInfos.id,
              text: this.state.userInput,
            },
          }
        );
        this.setState((state) => ({
          commentsIds: state.commentsIds.concat(response.data.id),
        }));
      } catch (error) {
        console.error("Error fetching videos:", error);
      }

      this.props.setState((state) => ({
        commentCount: state.commentCount + 1,
      }));
      document.getElementById("commentsInputField").value = "";
      this.setState({ userInput: "" });
    }
  }

  closeComments() {
    this.props.setState({ commentsShown: false });
  }

  render() {
    console.log(this.state.loggedUserInfos)
    return (
      <div className="flex flex-col justify-between shadow-2xl translate-y-px h-[80vh] w-[45vh] rounded-[0.7vh] rounded-r-lg">
        {/* Upper title section */}
        <div className="my-[0.5vh] flex justify-between items-center">
          <div className=" ml-[2vh] flex justify-between w-1/3 text-[2.5vh]">
            <strong>Comments</strong>
            {/* Comments count */}
            <p className="text-[#525252]">{this.state.commentsIds.length}</p>
          </div>

          <div className="flex flex-row space-x-[2vh]">
            <button className="h-[5vh] w-[5vh]">
              <img src="commentsFilter.png" className="scale-75" />
            </button>

            <button className="h-[5vh] w-[5vh] rounded-full transition ease-in-out hover:bg-[#e5e5e5] hover:animate-pulse">
              <img
                src="commentsArrow.png"
                className="scale-75"
                onClick={this.closeComments}
              />
            </button>
          </div>
        </div>

        {/* Displayed comments section */}
        <div className="flex flex-col-reverse text-[2vh] h-full px-[2vh] overflow-y-auto no-scrollbar break-words">
          {/* Single comment renderer */}
          {this.state.commentsIds.map((id) => (
            <Comment
              key={id}
              id={id}
              loggedUserInfos={this.state.loggedUserInfos}
              uploader={this.props.shortInfos.uploader_id}
              shortInfos={this.props.shortInfos}
              superlikePP={this.props.PP}
            />
          ))}
        </div>

        {/* Comment insert section */}
        <div className="flex flex-row items-center p-[1.8vh] border-t-[1px]">
          <div className="rounded-full h-[4.5vh] w-[4.5vh] overflow-hidden">
            <img src={this.state.loggedUserInfos.PP} />
          </div>

          <input
            id="commentsInputField"
            className="mx-[2vh] text-[2vh]"
            maxLength="1024"
            placeholder="Add a comment..."
            type="text"
            onChange={this.handleChange}
          />

          <button
            onClick={this.postComment}
            className="rounded-full border-[1px] text-[2vh] px-[1.5vh] py-[0.95vh] transition ease-in-out hover:bg-[#e5e5e5]"
          >
            <strong>Post</strong>
          </button>
        </div>
      </div>
    );
  }
}

export default CommentBar;
