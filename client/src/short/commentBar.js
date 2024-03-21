import React from "react";
import axios from "axios";

class CommentBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [
        // "SMOFGKNSDMGLK SDMGLK DSMGLKDS GMKLS DGMLKSD GMLKSD GMLDSK GSMOFGKNSDMGLK SDMGLK DSMGLKDS GMKLS DGMLKSD GMLKSD GMLDSK GSMOFGKNSDMGLK SDMGLK DSMGLKDS GMKLS DGMLKSD GMLKSD GMLDSK G",
        // "cock and balls !",
        // "i love cummies",
        // "cock and ball TORTURE!!! I FUCKING LOVE THAT STUFF!!!!!!",
        // "KC le KK xD",
      ],
      userInput: "",
    };
    this.postComment = this.postComment.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    // Get comments count
    try {
      const response = await axios.get(
        "http://localhost:5000/api/short/get-comments",
        {
          params: {
            shortId: this.props.shortInfos.id,
          },
        }
      );
      this.setState({ commentsCount: response.data.length });
      response.data.map((comment) =>
        this.setState((state) => ({
          comments: state.comments.concat([comment.text]),
        }))
      );
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  }

  handleChange(event) {
    this.setState({ userInput: event.target.value });
  }

  async postComment() {
    if (this.state.userInput != "") {
      this.setState({
        comments: this.state.comments.concat([this.state.userInput]),
      });
      this.props.setState((state) => ({
        commentsCount: state.commentsCount + 1,
      }));

      try {
        await axios.get("http://localhost:5000/api/short/add-comment", {
          params: {
            id: 1,
            shortId: this.props.shortInfos.id,
            text: this.state.userInput,
          },
        });
      } catch (error) {
        console.error("Error fetching videos:", error);
      }

      document.getElementById("commentsInputField").value = "";
      this.setState({ userInput: "" });
    }
  }

  render() {
    return (
      <div className={commentsDivStyle}>
        {/* Upper title section */}
        <div className="flex justify-between items-center">
          <div className="flex flex-row text-lg p-3 space-x-2">
            <h1>
              <strong> Comments </strong>
            </h1>
            <h1 className="text-[#525252]"> {this.state.comments.length} </h1>
            {/* Comments count */}
          </div>

          <div className="flex flex-row text-lg p-3 space-x-2">
            <button className="h-[5vh] w-[5vh] flex items-center justify-center">
              <img src="commentsFilter.png" className="scale-75" />
            </button>

            <button className="h-[5vh] w-[5vh] flex items-center justify-center hover:bg-[#e5e5e5] hover:ease-in-out hover:rounded-full hover:animate-pulse duration-300">
              <img src="commentsArrow.png" className="scale-75" />
            </button>
          </div>
        </div>

        {/* Displayed comments section */}
        <div className="text-[0.9rem] flex flex-column p-[2vh]">
          {/* Single comment renderer*/}
          <div id="comment" className="items-stretch">
            {this.state.comments.map((comment) => (
              <div className="flex flex-row">
                <div className="rounded-full h-[4.5vh] w-[4.5vh] bg-[#e5e5e5]"></div>

                <div className="p-[1vh] max-w-[85%]">
                  <div className="text-sm mb-[3px]">
                    <strong> @Name </strong>
                    <span className="text-[#525252] text-xs"> 1 year ago </span>
                  </div>

                  <div className="text-ellipsis overflow-hidden">
                    {comment}
                  </div>

                  <div className="flex flex-row items-center">
                    <button className="h-[3vh] w-[3vh] flex items-center justify-center">
                      <img src="commentLikeButton.png" className="scale-[90%]" />
                    </button>
                    <button className="h-[5vh] w-[5vh] flex items-center justify-center">
                      <img src="commentDislikeButton.png" className="scale-[55%]" />
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Comment insert section  
          <div className='sticky bottom-0'>
            <input
              id="commentsInputField"
              className=""
              maxLength="1024"
              type="text"
              onChange={this.handleChange}
            />
            <button
              onClick={this.postComment}
              className="m-2 px-[1.5vh] py-[0.95vh] rounded-full bg-blue-300"
            >
              Post comment
            </button>
          </div>*/}
        </div>
      </div>
    );
  }
}

export default CommentBar;

const commentsDivStyle =
  "flex flex-col shadow-2xl translate-y-px ml-[0.95vh] h-[80vh] w-[45vh] break-words rounded-[0.7vh] rounded-r-lg overflow-y-auto";
