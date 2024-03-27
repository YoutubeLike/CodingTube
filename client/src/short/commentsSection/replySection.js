import React from 'react';
import axios from "axios";

export default class ReplySection extends React.Component {
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }
  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.props.closeReply();
    }
  }

  render() {
    return (
      <div id="reply-section" ref={this.wrapperRef}>
        <div className="flex flex-row items-center p-[1.8vh] border-t-[1px]">
          <div className="rounded-full h-[4.5vh] w-[4.5vh] bg-[#e5e5e5]"></div>

          <input
            autoFocus
            id={"replyInputField"}
            className="mx-[2vh] text-[2vh]"
            maxLength="1024"
            placeholder="Add a comment..."
            type="text"
            onChange={this.props.handleChange}
          />

          <button
            onClick={this.props.postReply}
            className="rounded-full border-[1px] text-[2vh] px-[1.5vh] py-[0.95vh] hover:bg-[#e5e5e5] hover:ease-in-out duration-300"
          >
            <strong>Post</strong>
          </button>
        </div>
      </div>
    )
  }
}