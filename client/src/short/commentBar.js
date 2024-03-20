import React from "react";

class CommentBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [
        "SMOFGKNSDMGLK SDMGLK DSMGLKDS GMKLS DGMLKSD GMLKSD GMLDSK GSMOFGKNSDMGLK SDMGLK DSMGLKDS GMKLS DGMLKSD GMLKSD GMLDSK GSMOFGKNSDMGLK SDMGLK DSMGLKDS GMKLS DGMLKSD GMLKSD GMLDSK G",
        "cock and balls !",
        "i love cummies",
        "cock and ball TORTURE!!! I FUCKING LOVE THAT STUFF!!!!!!",
        "KC le KK xD",
      ],
      userInput: "",
      likes: 0,
      dislikes: 0,
    };
    this.postComment = this.postComment.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  countComments() {}

  handleChange(event) {
    this.setState({ userInput: event.target.value });
  }

  postComment() {
    if (this.state.userInput != "") {
      this.setState({
        comments: this.state.comments.concat([this.state.userInput]),
      });
      document.getElementById("commentsInputField").value = "";
      this.setState({ userInput: "" });
    }
  }

  render() {
    return (
      <div className="ml-[0.95vh] h-[80vh] w-[55vh] flex flex-col justify-between break-words bg-gray-300 rounded-[0.7vh] rounded-r-xl">
        {/* Comments count */}
        <div className="p-2">
          Comments <strong>{this.state.comments.length}</strong>
        </div>
        {/* Displayed comments section */}
        <div className="overflow-scroll">
          <div id="comments" className="flex-col-reverse p-[1vh]">
            {this.state.comments.map((comment) => (
              <div className="mx-[1%] my-[1vh] rounded-sm bg-white">
                {comment}
              </div>
            ))}
          </div>
          {/* Comment insert section  */}
          <div>
            <input
              id="commentsInputField"
              className="mx-[3%] w-[94%] border border-purple border-50 rounded-sm text-gray"
              maxLength="1024"
              type="text"
              onChange={this.handleChange}
            />
            <button
              onClick={this.postComment}
              className="m-2 px-[1.5vh] py-[0.95vh] text-[1.5vh] rounded-full bg-blue-300"
            >
              Post comment
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CommentBar;