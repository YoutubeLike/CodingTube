import React from "react";

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.like = this.like.bind(this);
  }

  async componentDidMount() {
    const likeButton = document.getElementById(
      "like" + this.props.shortInfos.id
    );

    likeButton.addEventListener("mouseover", () => {
      // if background color is not black, set it gray
      if (likeButton.style.backgroundColor != "rgb(23, 23, 23)") {
        likeButton.style.backgroundColor = "rgb(229, 229, 229)";
      }
    });

    likeButton.addEventListener("mouseout", () => {
      // if background color is not black, set it white
      if (likeButton.style.backgroundColor != "rgb(23, 23, 23)") {
        likeButton.style.backgroundColor = "rgb(245, 245, 245)";
      }
    });
  }

  like() {
    const likeButton = document.getElementById(
      "like" + this.props.shortInfos.id
    );
    const likeButtonImg = document.getElementById(
      "likeImg" + this.props.shortInfos.id
    );

    if (!this.props.isLiked) {
      this.props.setState((state) => ({
        likes: state.likes + 1,
        isLiked: true,
      }));

      likeButton.style.backgroundColor = "#171717"; // LIKE BUTTON : white -> black
      likeButtonImg.style.filter = "invert(1)"; // invert LIKE icon colors

      if (this.props.isDisliked) {
        this.props.setState((state) => ({
          dislikes: state.dislikes - 1,
          isDisliked: false,
        })); // DISLIKE button already pressed

        document.getElementById(
          "dislike" + this.props.shortInfos.id
        ).style.backgroundColor = "#f5f5f5"; // DISLIKE BUTTON : black -> white
        document.getElementById(
          "dislikeImg" + this.props.shortInfos.id
        ).style.filter = "none";
      }
    } else {
      this.props.setState((state) => ({
        likes: state.likes - 1,
        isLiked: false,
      })); // LIKE button unpressed

      likeButton.style.backgroundColor = "#f5f5f5"; // LIKE BUTTON : black -> white
      likeButtonImg.style.filter = "none";
    }
  }

  render() {
    return (
      <div className="flex flex-col items-center">
        {/* Like button */}
        <button
          id={"like" + this.props.shortInfos.id}
          className="h-[5vh] w-[5vh] flex items-center justify-center rounded-full bg-[#f5f5f5] hover:bg-[#e5e5e5]"
          onClick={this.like}
        >
          <img
            src="like.png"
            id={"likeImg" + this.props.shortInfos.id}
            className="scale-50"
          />
        </button>
        {/* Likes count */}
        <p className="text-[1.5vh]">{this.props.shortInfos.nb_like}</p>
      </div>
    );
  }
}

export default LikeButton;
