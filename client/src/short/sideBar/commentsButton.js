import React from "react";
import axios from "axios";

class CommentsButton extends React.Component {
  constructor(props) {
    super(props);
    this.toggleComments = this.toggleComments.bind(this);
  }

  toggleComments() {
    this.props.setState((state) => ({ commentsShown: !state.commentsShown }));
  }

  render() {
    return (
      <div className="flex flex-col items-center">
        {/* Comment button */}
        <button
          className="h-[5vh] w-[5vh] flex items-center justify-center rounded-full bg-[#f5f5f5] hover:bg-[#e5e5e5]"
          onClick={this.toggleComments}
        >
          <img src="comment.png" className="scale-50" />
        </button>
        {/* Comments count */}
        <p className="text-[1.5vh]">{this.props.commentsCount}</p>
      </div>
    );
  }
}

export default CommentsButton;
