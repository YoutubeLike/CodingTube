import React from "react";
import axios from "axios";

class Description extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: 0,
    };
    this.closeDescription = this.closeDescription.bind(this);
  }

  async componentDidMount() {
    // Get likes count
    try {
      const response = await axios.get(
        "http://localhost:5000/api/short/get-short-likes",
        {
          params: {
            shortId: this.props.shortInfos.id,
          },
        }
      );
      this.setState({ likes: response.data.length });
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  }

  closeDescription() {
    this.props.setState({ descriptionShown: false });
  }

  render() {
    const date = new Date(this.props.shortInfos.date)
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return (
      <div className="flex flex-col shadow-2xl translate-y-px h-[80vh] w-[45vh] rounded-[0.7vh] rounded-r-lg">
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
          <div id="tagsSection" className="mb-[20px]">
            <span>{this.props.shortInfos.description}</span>
            <span className="text-[#0ea5e9]">#sample #tag</span>
          </div>

          {/* <div id="decriptionSection">
            <p>{this.props.shortInfos.description}</p>
          </div> */}

          <div id="metadataSection" className="flex flex-row">
            <p className="mx-[2vh]">{this.state.likes}</p>
            <p className="mx-[2vh]">{this.props.shortInfos.number_view}</p>

            <div className="flex flex-col mx-[2vh]">
              <p>{months[date.getMonth()] + ", " + date.getDate()}</p>
              <p>{date.getFullYear()}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Description;
