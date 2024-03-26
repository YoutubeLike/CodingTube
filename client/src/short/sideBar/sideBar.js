import React from "react";
import axios from "axios";
import LikeButton from "./likeButton.js";
import DislikeButton from "./dislikeButton.js";
import CommentsButton from "./commentsButton.js";
import ShareButton from "./shareButton.js";
import OptionsButton from "./optionsButton.js";
import SoundButton from "./soundButton.js";

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: 0,
      isLiked: false,
      dislikes: 0,
      isDisliked: false,
    };
  }

  async componentDidMount() {
    // Set isLiked and isDisliked states with database datas
    try {
      const response = await axios.get(
        "http://localhost:5000/api/short/check-short-like",
        {
          params: {
            id: 1,
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
              params: {
                id: 1,
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

    // Get likes count
    try {
      const response = await axios.get(
        "http://localhost:5000/api/short/get-short-likes",
        {
          params: {
            shortId: this.props.id,
          },
        }
      );
      this.setState({ likes: response.data.length });
    } catch (error) {
      console.error("Error fetching videos:", error);
    }

    // Get dislikes count
    try {
      const response = await axios.get(
        "http://localhost:5000/api/short/get-short-dislikes",
        {
          params: {
            shortId: this.props.id,
          },
        }
      );
      this.setState({ dislikes: response.data.length });
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  }

  render() {
    return (
      <div className="ml-[0.95vh] mt-[32vh] h-[48vh] flex flex-col justify-end justify-between items-center">
        <LikeButton
          id={this.props.id}
          isDisliked={this.state.isDisliked}
          dislikes={this.state.dislikes}
          isLiked={this.state.isLiked}
          likes={this.state.likes}
          setState={(p) => this.setState(p)}
        />
        <DislikeButton
          id={this.props.id}
          isLiked={this.state.isLiked}
          likes={this.state.likes}
          isDisliked={this.state.isDisliked}
          dislikes={this.state.dislikes}
          setState={(p) => this.setState(p)}
        />
        <CommentsButton
          setState={this.props.setState}
          commentCount={this.props.commentCount}
        />
        <ShareButton id={this.props.id}/>
        <OptionsButton setState={this.props.setState} />
        <SoundButton />
      </div>
    );
  }
}

export default SideBar;
