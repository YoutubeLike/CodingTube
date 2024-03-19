import React from 'react';

class SoundButton extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className='flex flex-col items-center'>
                {/* Share button */}
              <button className="flex items-center justify-center bg-[#f5f5f5] w-[5vw] h-[5vw] rounded-[20]">
                {" "}
              </button>
                {/* Name */}
            </div>
        )
    }
}

export default SoundButton;