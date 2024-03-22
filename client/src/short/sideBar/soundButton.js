import React from "react";

class SoundButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="flex flex-col items-center">
        <button className="flex items-center justify-center bg-[#f5f5f5] w-[5vh] h-[5vh] rounded-md"></button>
      </div>
    );
  }
}

export default SoundButton;
