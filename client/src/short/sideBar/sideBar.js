import React from "react";
import LikeButton from "./likeButton.js";
import DislikeButton from "./dislikeButton.js";
import CommentsButton from "./commentsButton.js";
import ShareButton from "./shareButton.js";
import OptionsButton from "./optionsButton.js";
import SoundButton from "./soundButton.js";

class sideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: 0,
      isLiked: false,
      dislikes: 0,
      isDisliked: false,
    };
  }
  render() {
    return (
      <div
        id="sideBar"
        className="ml-[0.95vh] mt-[32vh] h-[48vh] flex flex-col justify-end justify-between items-center"
      >
        <LikeButton
          isDisliked={this.state.isDisliked}
          dislikes={this.state.dislikes}
          isLiked={this.state.isLiked}
          likes={this.state.likes}
          setState={(p) => this.setState(p)}
          videosInfos={this.props.videosInfos}
        />
        <DislikeButton
          isLiked={this.state.isLiked}
          likes={this.state.likes}
          isDisliked={this.state.isDisliked}
          dislikes={this.state.dislikes}
          setState={(p) => this.setState(p)}
          videosInfos={this.props.videosInfos}
        />
        <CommentsButton setState={this.props.setState} />
        <ShareButton />
        <OptionsButton />
        <SoundButton />
      </div>
    );
  }
}

/* ReactDOM.render(<sideBar />, document.getElementById("root")); */
export default sideBar;
