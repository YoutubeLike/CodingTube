import React from "react";

class DislikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.dislike = this.dislike.bind(this);
  }

  async componentDidMount() {
    const dislikeButton = document.getElementById(
      "dislike" + this.props.shortInfos.id
    );

    if (dislikeButton.getAttribute("listener") != "true") {
      dislikeButton.addEventListener("mouseover", () => {
        // if background color is not black, set it gray
        if (dislikeButton.style.backgroundColor != "rgb(23, 23, 23)") {
          dislikeButton.style.backgroundColor = "rgb(229, 229, 229)";
        }
      });

      dislikeButton.addEventListener("mouseout", () => {
        // if background color is not black, set it white
        if (dislikeButton.style.backgroundColor != "rgb(23, 23, 23)") {
          dislikeButton.style.backgroundColor = "rgb(245, 245, 245)";
        }
      });
    }
  }

  dislike() {
    const dislikeButton = document.getElementById(
      "dislike" + this.props.shortInfos.id
    );
    const dislikeButtonImg = document.getElementById(
      "dislikeImg" + this.props.shortInfos.id
    );

    if (!this.props.isDisliked) {
      this.props.setState((state) => ({
        dislikes: state.dislikes + 1,
        isDisliked: true,
      }));
      dislikeButton.style.backgroundColor = "#171717"; // DISLIKE BUTTON : white -> black
      dislikeButtonImg.style.filter = "invert(1)"; // invert DISLIKE icon colors
      if (this.props.isLiked) {
        this.props.setState((state) => ({
          likes: state.likes - 1,
          isLiked: false,
        })); // LIKE button already pressed
        document.getElementById(
          "like" + this.props.shortInfos.id
        ).style.backgroundColor = "#f5f5f5"; // LIKE BUTTON : black -> white
        document.getElementById(
          "likeImg" + this.props.shortInfos.id
        ).style.filter = "none";
      }
    } else {
      this.props.setState((state) => ({
        dislikes: state.dislikes - 1,
        isDisliked: false,
      })); // DISLIKE button unpressed
      dislikeButton.style.backgroundColor = "#f5f5f5"; // DISLIKE BUTTON : black -> white
      dislikeButtonImg.style.filter = "none";
    }
  }

  render() {
    return (
      <div className="flex flex-col items-center">
        {/* Dislike button */}
        <button
          id={"dislike" + this.props.shortInfos.id}
          className="h-[5vh] w-[5vh] flex items-center justify-center rounded-full bg-[#f5f5f5] hover:bg-[#e5e5e5]"
          onClick={this.dislike}
        >
          <img
            src="dislike.png"
            id={"dislikeImg" + this.props.shortInfos.id}
            className="scale-50"
          />
        </button>

        {/* Name */}
        <p className="text-[1.5vh]">{this.props.shortInfos.nb_dislike}</p>
      </div>
    );
  }
}

export default DislikeButton;
