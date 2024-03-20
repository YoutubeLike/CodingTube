import React from "react";

class CommentsButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentCount: 0,
    };
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
        <p className="text-[1.5vh]">{this.props.shortInfos.nb_comment}</p>
      </div>
    );
  }
}

export default CommentsButton;
