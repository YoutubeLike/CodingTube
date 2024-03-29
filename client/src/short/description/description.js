import React from "react";
import axios from "axios";

class Description extends React.Component {
  constructor(props) {
    super(props);
    this.closeDescription = this.closeDescription.bind(this);
  }

  closeDescription() {
    this.props.setState({ descriptionShown: false });
  }

  render() {
    const date = new Date(this.props.shortInfos.date);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return (
      <div className="flex flex-col shadow-2xl translate-y-px h-[80vh] w-[45vh] rounded-[0.7vh] rounded-r-lg text-[2vh]">
        {/* Upper title section */}
        <div className="my-[0.5vh] flex justify-between items-center">
          <div className=" ml-[2vh] flex justify-between w-1/3 text-[2.5vh]">
            <strong> Description </strong>
          </div>

          <div className="flex flex-row space-x-[2vh]">
            <button className="h-[5vh] w-[5vh] hover:bg-[#e5e5e5] hover:ease-in-out hover:rounded-full hover:animate-pulse duration-300">
              <img
                src="commentsArrow.png"
                className="scale-75"
                onClick={this.closeDescription}
              />
            </button>
          </div>
        </div>

        <div id="descriptionContent" className="flex flex-col mx-[2vh]">
          <div
            id="description"
            className="mb-[20px] max-h-[30vh] w-[100%] break-words overflow-y-auto no-scrollbar"
          >
            <p>{this.props.shortInfos.description}</p>
          </div>

          <div
            id="border"
            className="flex border-b-[1px] justify-between w-[100%]"
          ></div>

          <div
            id="metadataSection"
            className="flex flex-row justify-center content-center mt-[20px] mb-[5vh]"
          >
            <div className="flex flex-col mx-[2vh] justify-between items-center">
              <strong className="mx-[2vh]">{this.props.likes}</strong>
              <p>{this.props.likes <= 1 ? "Like" : "Likes"}</p>
            </div>

            <div className="flex flex-col mx-[2vh] justify-between items-center">
              <strong className="mx-[2vh]">
                {this.props.shortInfos.number_view}
              </strong>
              <p>{this.props.shortInfos.number_view <= 1 ? "View" : "Views"}</p>
            </div>

            <div className="flex flex-col mx-[2vh] justify-between items-center">
              <strong>{months[date.getMonth()] + " " + date.getDate()}</strong>
              <p>{date.getFullYear()}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Description;
