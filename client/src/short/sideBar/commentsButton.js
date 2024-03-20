import React from "react";
import axios from "axios";

class CommentsButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentsCount: 0,
    };
    this.toggleComments = this.toggleComments.bind(this);
  }

  async componentDidMount() {
    // Get comments count
    try {
      const response = await axios.get(
        "http://localhost:5000/api/short/get-comments",
        {
          params: {
            shortId: this.props.shortInfos.id,
          },
        }
      );
      this.setState({ commentsCount: response.data.length });
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  }

  toggleComments() {
    this.props.setState((state) => ({ commentsShown: !state.commentsShown }));
  }

  render() {
    return (
      <div className="flex flex-col items-center">
        {/* Comment button */}
        <button
          className="h-[5vh] w-[5vh] flex items-center justify-center rounded-full bg-[#f5f5f5] hover:bg-[#e5e5e5]"
          onClick={this.toggleComments}
        >
          <img src="comment.png" className="scale-50" />
        </button>
        {/* Comments count */}
        <p className="text-[1.5vh]">{this.state.commentsCount}</p>
      </div>
    );
  }
}

export default CommentsButton;
