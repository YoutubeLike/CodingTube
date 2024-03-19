import React from 'react';

class OptionsButton extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className='flex flex-col items-center'>
                {/* Share button */}
              <button className={buttonStyle}>
                <img src="3dots.png" className={buttonImageStyle} />
              </button>
                {/* Name */}
            </div>
        )
    }
}

const buttonContainerStyle = "flex flex-col items-center";
const buttonStyle =
  "h-[5vh] w-[5vh] flex items-center justify-center rounded-full bg-[#f5f5f5] hover:bg-[#e5e5e5]";
const buttonImageStyle = "scale-50";
const buttonTextStyle = "text-[1.5vh]";

export default OptionsButton;