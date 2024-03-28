import React from "react";

class CommentsButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
    };
    this.toggleComments = this.toggleComments.bind(this);
    this.handleHover = this.handleHover.bind(this);
  }

  toggleComments() {
    this.props.setState((state) => ({
      commentsShown: !state.commentsShown,
      descriptionShown: false,
    }));
  }
  handleHover() {
    this.setState((prevState) => ({
      isHovered: !prevState.isHovered,
    }));
  }
  render() {
    const commentCount =
      this.props.commentCount < 1000
        ? this.props.commentCount
        : this.props.likcommentCountes < 1000000
        ? Math.floor(this.props.commentCount / 1000) + "K"
        : Math.floor(this.props.commentCount / 1000000) + "M";
    return (
      <div className="flex flex-col items-center">
        {/* Comment button */}
        <button
          className="relative h-[5vh] w-[5vh] flex items-center justify-center rounded-full bg-[#f5f5f5] hover:bg-[#e5e5e5]"
          onClick={this.toggleComments}
          onMouseEnter={this.handleHover}
          onMouseLeave={this.handleHover}
        >
          {this.state.isHovered && (
            <span className="right-[6vh] px-[1vh] text-[1.5vh] rounded-[0.5vh] bg-slate-300/75 absolute">
              Comments
            </span>
          )}
          <img src="comment.png" className="scale-50" />
        </button>
        {/* Comments count */}
        <p className="text-[1.5vh]">{commentCount}</p>
      </div>
    );
  }
}

export default CommentsButton;
