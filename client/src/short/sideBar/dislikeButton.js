import React from "react";

class DislikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.dislike = this.dislike.bind(this);
  }

  async componentDidMount() {
    const dislikeButton = document.getElementById("dislike");

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
    if (!this.props.isDisliked) {
      this.props.setState((state) => ({
        dislikes: state.dislikes + 1,
        isDisliked: true,
      }));
      document.getElementById("dislike").style.backgroundColor = "#171717"; // DISLIKE BUTTON : white -> black
      document.getElementById("dislikeImg").style.filter = "invert(1)"; // invert DISLIKE icon colors
      if (this.props.isLiked) {
        this.props.setState((state) => ({
          likes: state.likes - 1,
          isLiked: false,
        })); // LIKE button already pressed
        document.getElementById("like").style.backgroundColor = "#f5f5f5"; // LIKE BUTTON : black -> white
        document.getElementById("likeImg").style.filter = "none";
      }
    } else {
      this.props.setState((state) => ({
        dislikes: state.dislikes - 1,
        isDisliked: false,
      })); // DISLIKE button unpressed
      document.getElementById("dislike").style.backgroundColor = "#f5f5f5"; // DISLIKE BUTTON : black -> white
      document.getElementById("dislikeImg").style.filter = "none";
    }
  }

  render() {
    return (
      <div className="flex flex-col items-center">
        {/* Dislike button */}
        <button
          id="dislike"
          className="h-[5vh] w-[5vh] flex items-center justify-center rounded-full bg-[#f5f5f5] hover:bg-[#e5e5e5]"
          onClick={this.dislike}
        >
          <img src="dislike.png" id="dislikeImg" className="scale-50" />
        </button>

        {/* Name */}
        <p className="text-[1.5vh]">{this.props.dislikes}</p>
      </div>
    );
  }
}

export default DislikeButton;
