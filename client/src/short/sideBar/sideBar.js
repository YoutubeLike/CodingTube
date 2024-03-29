import React from "react";
import axios from "axios";
import LikeButton from "./likeButton.js";
import DislikeButton from "./dislikeButton.js";
import CommentsButton from "./commentsButton.js";
import ShareButton from "./shareButton.js";
import OptionsButton from "./optionsButton.js";

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLiked: false,
      isDisliked: false,
    };
    this.setIsDisliked = this.setIsDisliked.bind(this);
    this.setIsLiked = this.setIsLiked.bind(this);
  }

  async componentDidMount() {
    // Set isLiked and isDisliked states with database datas
    try {
      const response = await axios.get(
        "http://localhost:5000/api/short/check-short-like",
        {
          withCredentials: true,
          params: {
            shortId: this.props.id,
          },
        }
      );
      if (response.data.length == 1) {
        this.setState({ isLiked: true });
      } else {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/short/check-short-dislike",
            {
              withCredentials: true,
              params: {
                shortId: this.props.id,
              },
            }
          );
          if (response.data.length == 1) {
            this.setState({ isDisliked: true });
          }
        } catch (error) {
          console.error("Error fetching videos:", error);
        }
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  }

  setIsLiked(state) {
    this.setState({ isLiked: state });
  }

  setIsDisliked(state) {
    this.setState({ isDisliked: state });
  }

  render() {
    return (
      <div className="ml-[0.95vh] mt-[36.5vh] h-[42vh] flex flex-col justify-end justify-between items-center">
        <LikeButton
          id={this.props.id}
          isDisliked={this.state.isDisliked}
          dislikes={this.props.dislikes}
          isLiked={this.state.isLiked}
          likes={this.props.likes}
          setIsDisliked={this.setIsDisliked}
          setIsLiked={this.setIsLiked}
          setState={this.props.setState}
        />
        <DislikeButton
          id={this.props.id}
          isLiked={this.state.isLiked}
          likes={this.props.likes}
          isDisliked={this.state.isDisliked}
          dislikes={this.props.dislikes}
          setIsDisliked={this.setIsDisliked}
          setIsLiked={this.setIsLiked}
          setState={this.props.setState}
        />
        <CommentsButton
          setState={this.props.setState}
          commentCount={this.props.commentCount}
        />
        <ShareButton id={this.props.id} />
        <OptionsButton setState={this.props.setState} />
        {/* <SoundButton /> */}
      </div>
    );
  }
}

export default SideBar;
