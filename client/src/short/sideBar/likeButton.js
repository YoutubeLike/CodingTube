import React from "react";

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.like = this.like.bind(this);
  }

  async componentDidMount() {
    const likeButton = document.getElementById("like");

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
    if (!this.props.isLiked) {
      this.props.setState((state) => ({
        likes: state.likes + 1,
        isLiked: true,
      }));
      document.getElementById("like").style.backgroundColor = "#171717"; // LIKE BUTTON : white -> black
      document.getElementById("likeImg").style.filter = "invert(1)"; // invert LIKE icon colors
      if (this.props.isDisliked) {
        this.props.setState((state) => ({
          dislikes: state.dislikes - 1,
          isDisliked: false,
        })); // DISLIKE button already pressed
        document.getElementById("dislike").style.backgroundColor = "#f5f5f5"; // DISLIKE BUTTON : black -> white
        document.getElementById("dislikeImg").style.filter = "none";
      }
    } else {
      this.props.setState((state) => ({
        likes: state.likes - 1,
        isLiked: false,
      })); // LIKE button unpressed
      document.getElementById("like").style.backgroundColor = "#f5f5f5"; // LIKE BUTTON : black -> white
      document.getElementById("likeImg").style.filter = "none";
    }
  }

  render() {
    return (
      <div className="flex flex-col items-center">
        {/* Like button */}
        <button
          id="like"
          className="h-[5vh] w-[5vh] flex items-center justify-center rounded-full bg-[#f5f5f5] hover:bg-[#e5e5e5]"
          onClick={this.like}
        >
          <img src="like.png" id="likeImg" className="scale-50" />
        </button>
        {/* Likes count */}
        <p className="text-[1.5vh]">
          {/*this.props.videosInfos['nb_likes']*/ this.props.likes}
        </p>
      </div>
    );
  }
}

export default LikeButton;
