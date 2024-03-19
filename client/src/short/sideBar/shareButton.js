import React from 'react';

class ShareButton extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className='flex flex-col items-center'>
                {/* Share button */}
                <button className="h-[5vh] w-[5vh] flex items-center justify-center rounded-full bg-[#f5f5f5] hover:bg-[#e5e5e5]">
                  <img src="share.png" className="scale-50" />
                </button>
  
                {/* Name */}
                <p className="text-[1.5vh]">Share</p>
            </div>
        )
    }
}

export default ShareButton;