import React from "react";

class ShareButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false
    };
    this.copyLink = this.copyLink.bind(this);
    this.handleHover = this.handleHover.bind(this);
  }

  copyLink() {
    navigator.clipboard.writeText("http://localhost:3000/short?id=" + this.props.id)
  }
  handleHover() {
    this.setState((prevState) => ({
      isHovered: !prevState.isHovered
    }));
  }

  render() {
    return (
      <div className="flex flex-col items-center">
        {/* Share button */}
        <button
          className="relative h-[5vh] w-[5vh] flex items-center justify-center rounded-full bg-[#f5f5f5] hover:bg-[#e5e5e5]"
          onClick={this.copyLink}
          onMouseEnter={this.handleHover}
          onMouseLeave={this.handleHover}
        >
          {this.state.isHovered && (
            <span className="right-[6vh] px-[1vh] text-[1.5vh] rounded-[0.5vh] bg-slate-300/75 absolute">
              Share
            </span>
          )}
          <img src="share.png" className="scale-50" />
        </button>

        {/* Name */}
        <p className="text-[1.5vh]">Share</p>
      </div>
    );
  }
}

export default ShareButton;
