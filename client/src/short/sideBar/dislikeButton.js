import React from "react";
import axios from "axios";

class DislikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
    };
    this.dislike = this.dislike.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.addDislike = this.addDislike.bind(this);
    this.removeDislike = this.removeDislike.bind(this);
    this.removeLike = this.removeLike.bind(this);
  }

  async addDislike() {
    try {
      await axios.get("http://localhost:5000/api/short/add-short-dislike", {
        withCredentials: true,
        params: {
          shortId: this.props.id,
        },
      });
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  }

  async removeDislike() {
    try {
      await axios.get("http://localhost:5000/api/short/remove-short-dislike", {
        withCredentials: true,
        params: {
          shortId: this.props.id,
        },
      });
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  }

  async removeLike() {
    try {
      await axios.get("http://localhost:5000/api/short/remove-short-like", {
        withCredentials: true,
        params: {
          shortId: this.props.id,
        },
      });
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  }

  dislike() {
    if (!this.props.isDisliked) {
      if (this.props.isLiked) {
        this.props.setIsLiked(false);
        this.props.setState((state) => ({
          likes: state.likes - 1,
        }));
        this.removeLike();
      }

      this.props.setIsDisliked(true);
      this.props.setState((state) => ({
        dislikes: state.dislikes + 1,
      }));
      this.addDislike();
    } else {
      this.props.setIsDisliked(false);
      this.props.setState((state) => ({
        dislikes: state.dislikes - 1,
      }));
      this.removeDislike();
    }
  }

  handleHover() {
    this.setState((prevState) => ({
      isHovered: !prevState.isHovered,
    }));
  }

  render() {
    const dislikeCount =
      this.props.likes < 1000
        ? this.props.dislikes
        : this.props.dislikes < 1000000
        ? Math.floor(this.props.dislikes / 1000) + "K"
        : Math.floor(this.props.dislikes / 1000000) + "M";
    return (
      <div className="flex flex-col items-center">
        {/* Dislike button */}
        <button
          id={"dislike" + this.props.id}
          className={
            "relative h-[5vh] w-[5vh] flex items-center justify-center rounded-full" +
            (this.props.isDisliked
              ? " bg-[#171717]"
              : this.state.isHovered
              ? " bg-[#e5e5e5]"
              : " bg-[#f5f5f5]")
          }
          onClick={this.dislike}
          onMouseEnter={this.handleHover}
          onMouseLeave={this.handleHover}
        >
          {this.state.isHovered && (
            <span className="right-[6vh] px-[1vh] text-[1.5vh] rounded-[0.5vh] bg-slate-300/75 absolute">
              Dislike
            </span>
          )}
          <img
            src="dislike.png"
            id={"dislikeImg" + this.props.id}
            className={"scale-50" + (this.props.isDisliked ? " invert" : "")}
          />
        </button>

        {/* Dislikes count */}
        <p className="text-[1.5vh]">{dislikeCount}</p>
      </div>
    );
  }
}

export default DislikeButton;
