import React from "react";
import axios from "axios";
import Comment from "./comment";

class CommentBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
            params: {
              id: 1,
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
    return (
      <div className="flex flex-col shadow-2xl translate-y-px h-[80vh] w-[45vh] break-words rounded-[0.7vh] rounded-r-lg overflow-y-auto">
        {/* Upper title section */}
        <div className="flex justify-between items-center sticky top-0 bg-white py-[5px] z-10">
          <div className="flex flex-row text-lg px-3 space-x-2">
            <h1>
              <strong>Comments</strong>
            </h1>
            <h1 className="text-[#525252]">{this.state.commentsIds.length}</h1>
            {/* Comments count */}
          </div>

          <div className="flex flex-row text-lg px-3 space-x-2">
            <button className="h-[5vh] w-[5vh] flex items-center justify-center">
              <img src="commentsFilter.png" className="scale-75" />
            </button>

            <button className="h-[5vh] w-[5vh] flex items-center justify-center hover:bg-[#e5e5e5] hover:ease-in-out hover:rounded-full hover:animate-pulse duration-300">
              <img
                src="commentsArrow.png"
                className="scale-75"
                onClick={this.closeComments}
              />
            </button>
          </div>
        </div>

        {/* Displayed comments section */}
        <div className="text-[0.9rem] px-[2vh]">
          {/* Single comment renderer*/}
          <div id="comment" className=" flex flex-col-reverse">
            {this.state.commentsIds.map((id) => (
              <Comment
                key={id}
                id={id}
              />
              // <div className="flex flex-row my-2">
              //   <div className="rounded-full h-[4.5vh] w-[4.5vh] bg-[#e5e5e5] content-start"></div>

              //   <div className="px-[1.9vh] max-w-[88%]">
              //     <div className="text-sm mb-[3px]">
              //       <strong> @Name </strong>
              //       <span className="text-[#525252] text-xs"> 1 year ago </span>
              //     </div>

              //     <div className="text-ellipsis overflow-hidden">
              //       {comment.text}
              //     </div>

              //     <div className="flex flex-row items-center text-xs">
              //       <div className="flex flex-row items-center">
              //         <div className="flex flex-row items-center">
              //           <button className="h-[3vh] w-[3vh] flex items-center justify-center">
              //             <img
              //               src="commentLikeButton.png"
              //               className="scale-[90%]"
              //             />
              //           </button>
              //           <span className="text-[#525252] ml-[3px]"> 3.5K </span>
              //         </div>
              //         <button className="h-[5vh] w-[5vh] flex items-center justify-center">
              //           <img
              //             src="commentDislikeButton.png"
              //             className="scale-[55%]"
              //           />
              //         </button>
              //       </div>

              //       <button className="ml-[3px] hover:bg-[#e5e5e5] rounded-[30px] px-[12px] py-[9px]">
              //         <strong> Reply </strong>
              //       </button>
              //     </div>
              //   </div>
              // </div>
            ))}
          </div>
        </div>

        {/* Comment insert section */}
        <div className="flex-end sticky bottom-0 bg-white min-width-[100%] border-t-[1px]">
          <div className="flex flex-row no-wrap p-[1.8vh] items-center">
            <div className="rounded-full h-[4.5vh] w-[4.5vh] bg-[#e5e5e5] content-start"></div>

            <input
              id="commentsInputField"
              className="outline-0 text-sm px-[2vh]"
              maxLength="1024"
              placeholder="Add a comment..."
              type="text"
              onChange={this.handleChange}
            />

            <button
              onClick={this.postComment}
              className=" flex-end m-2 rounded-full border-[1px] text-sm px-[15px] py-[7px] hover:bg-[#e5e5e5] hover:ease-in-out duration-300"
            >
              <strong>Post</strong>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CommentBar;
