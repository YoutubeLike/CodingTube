import React from "react";

class ShareButton extends React.Component {
  constructor(props) {
    super(props);
    this.copyLink = this.copyLink.bind(this);
  }

  copyLink() {
    navigator.clipboard.writeText("http://localhost:3000/short?id=" + this.props.id)
  }

  render() {
    return (
      <div className="flex flex-col items-center">
        {/* Share button */}
        <button
          className="h-[5vh] w-[5vh] flex items-center justify-center rounded-full bg-[#f5f5f5] hover:bg-[#e5e5e5]"
          onClick={this.copyLink}
        >
          <img src="share.png" className="scale-50" />
        </button>

        {/* Name */}
        <p className="text-[1.5vh]">Share</p>
      </div>
    );
  }
}

export default ShareButton;
