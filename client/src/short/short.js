import React from 'react'
import axios from "axios";
import SideBar from './sideBar/sideBar.js';
import Video from './video.js'
import CommentBar from './commentBar.js';

class Short extends React.Component{
    constructor(props){
        super(props);
        this.state={
            videosInfos: [],
        }
    }
    async componentDidMount() {
        try {
        const response = await axios.get(
            "http://localhost:5000/api/short/short-request"
        );
        this.setState({ videosInfos: response.data });
        } catch (error) {
        console.error("Error fetching videos:", error);
        }
    }

    render(){
        return(
            <div
              id="shortSection"
              className="mt-[5vh] h-[80vh] w-full overflow-auto snap-y snap-mandatory no-scrollbar"
            >
                <Video videosInfos={this.state.videosInfos}/>
            </div>
        )
    }
}

export default Short;