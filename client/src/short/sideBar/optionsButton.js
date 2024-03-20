import React from "react";

class OptionsButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="flex flex-col items-center">
        <button className="h-[5vh] w-[5vh] flex items-center justify-center rounded-full bg-[#f5f5f5] hover:bg-[#e5e5e5]">
          <img src="3dots.png" className="scale-50" />
        </button>
      </div>
    );
  }
}

export default OptionsButton;
