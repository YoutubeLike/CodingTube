import React from "react";

class OptionsButton extends React.Component {
  constructor(props) {
    super(props);
    this.toggleMore = this.toggleMore.bind(this);
  }

  toggleMore() {
    this.props.setState((state) => ({
      descriptionShown: !state.descriptionShown,
      commentsShown: false,
    }));
  }

  render() {
    return (
      <div className="flex flex-col items-center">
        <div>
          <button
            onClick={this.toggleMore}
            className={
              "h-[5vh] w-[5vh] flex items-center justify-center rounded-full bg-[#f5f5f5] hover:bg-[#e5e5e5]"
            }
          >
            <img src="3dots.png" alt="more" className="scale-50" />
          </button>
        </div>

        {/*
        <div id='more' className="flex content-center relative bg-white text-[1.5vh] h-[15vh] w-[22vh] rounded-md z-10 shadow-2xl py-[10px] flex-wrap overflow-hidden flex-column">
          <button className="flex no-wrap items-center w-[100%] hover:bg-[#f5f5f5]">
            <img src="commentsFilter.png" className="h-[4vh] w-[4vh] scale-75"/>
            Description
          </button>

          <button className="flex no-wrap items-center w-[100%] hover:bg-[#f5f5f5]">
            <img src="commentsFilter.png" className="h-[4vh] w-[4vh] scale-75"/>
            Save to playlist
          </button>

          <button className="flex no-wrap items-center w-[100%] hover:bg-[#f5f5f5]">
            <img src="commentsFilter.png" className="h-[4vh] w-[4vh] scale-75"/>
            Captions
          </button>

          <button className="flex no-wrap items-center w-[100%] hover:bg-[#f5f5f5]">
            <img src="commentsFilter.png" className="h-[4vh] w-[4vh] scale-75"/>
            Report
          </button>
          
        </div>*/}
      </div>
    );
  }
}

export default OptionsButton;
