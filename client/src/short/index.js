import "./short.css";
import React from "react";
import ShortRequest from "./shortRequest";
import ReactDOM from "react-dom";
import axios from "axios";

/*
function Short() {
  const videoInfos = ShortRequest();
  StartShorts();
  return (
    <div id='main'> </div>
  );
}
*/

class Short extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /* attributes that change */ views: 0,
      videosInfos: [],
      likes: 0,
      isLiked: false,
      isDisliked: false,
      dislikes: 0,
      comment: "",
      comments: ["SMOFGKNSDMGLK SDMGLK DSMGLKDS GMKLS DGMLKSD GMLKSD GMLDSK GSMOFGKNSDMGLK SDMGLK DSMGLKDS GMKLS DGMLKSD GMLKSD GMLDSK GSMOFGKNSDMGLK SDMGLK DSMGLKDS GMKLS DGMLKSD GMLKSD GMLDSK G", "cock and balls !", "i love cummies", "cock and ball TORTURE!!! I FUCKING LOVE THAT STUFF!!!!!!", "KC le KK xD"],
      commentCount: 0,
      commentsShown: false,
      sound: false,
    };
    this.like = this.like.bind(this);
    this.dislike = this.dislike.bind(this);
    this.postComment = this.postComment.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleComments = this.toggleComments.bind(this);
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

    const likeButton = document.getElementById("like");

    likeButton.addEventListener("mouseover", () => {
      // if background color is not black, set it gray
      if (likeButton.style.backgroundColor != "rgb(23, 23, 23)") {
        likeButton.style.backgroundColor = "rgb(229, 229, 229)";
      }
    });

    likeButton.addEventListener("mouseout", () => {
      // if background color is not black, set it white
      if (likeButton.style.backgroundColor != "rgb(23, 23, 23)") {
        likeButton.style.backgroundColor = "rgb(245, 245, 245)";
      }
    });

    const dislikeButton = document.getElementById("dislike");

    if (dislikeButton.getAttribute("listener") != "true") {
      dislikeButton.addEventListener("mouseover", () => {
        // if background color is not black, set it gray
        if (dislikeButton.style.backgroundColor != "rgb(23, 23, 23)") {
          dislikeButton.style.backgroundColor = "rgb(229, 229, 229)";
        }
      });

      dislikeButton.addEventListener("mouseout", () => {
        // if background color is not black, set it white
        if (dislikeButton.style.backgroundColor != "rgb(23, 23, 23)") {
          dislikeButton.style.backgroundColor = "rgb(245, 245, 245)";
        }
      });
    }

    const video = document.getElementById("video");
    document.getElementById("soundButton").addEventListener("click", () => {
      if (video.muted) {
        video.muted = false;
        document.getElementById("soundButtonImg").src = "soundButton.png";
      } else {
        video.muted = true;
        document.getElementById("soundButtonImg").src = "muteButton.png";
      }
    });

    document.addEventListener('keyup', event => {
      if (event.code === 'Space') {
        if (video.paused) {
          video.play();
          document.getElementById("playButtonImg").src = "playButton.png";
        } else {
          video.pause();
          document.getElementById("playButtonImg").src = "pauseButton.png";
        }
      }
    })

    document.getElementById("playButton").addEventListener("click", () => {
      const video = document.getElementById("video");
      if (video.paused) {
        video.play();
        document.getElementById("playButtonImg").src = "playButton.png";
      } else {
        video.pause();
        document.getElementById("playButtonImg").src = "pauseButton.png";
      }
    })
  }

  like() {
    if (!this.state.isLiked) {
      this.setState((state) => ({ likes: state.likes + 1, isLiked: true }));
      document.getElementById("like").style.backgroundColor =
        "#171717"; /* LIKE BUTTON : white -> black */
      document.getElementById("likeImg").style.filter =
        "invert(1)"; /* invert LIKE icon colors */
      if (this.state.isDisliked) {
        this.setState((state) => ({
          dislikes: state.dislikes - 1,
          isDisliked: false,
        })); /* DISLIKE button already pressed */
        document.getElementById("dislike").style.backgroundColor =
          "#f5f5f5"; /* DISLIKE BUTTON : black -> white */
        document.getElementById("dislikeImg").style.filter = "none";
      }
    } else {
      this.setState((state) => ({
        likes: state.likes - 1,
        isLiked: false,
      })); /* LIKE button unpressed */
      document.getElementById("like").style.backgroundColor =
        "#f5f5f5"; /* LIKE BUTTON : black -> white */
      document.getElementById("likeImg").style.filter = "none";
    }
  }

  dislike() {
    if (!this.state.isDisliked) {
      this.setState((state) => ({
        dislikes: state.dislikes + 1,
        isDisliked: true,
      }));
      document.getElementById("dislike").style.backgroundColor =
        "#171717"; /* DISLIKE BUTTON : white -> black */
      document.getElementById("dislikeImg").style.filter =
        "invert(1)"; /* invert DISLIKE icon colors */
      if (this.state.isLiked) {
        this.setState((state) => ({
          likes: state.likes - 1,
          isLiked: false,
        })); /* LIKE button already pressed */
        document.getElementById("like").style.backgroundColor =
          "#f5f5f5"; /* LIKE BUTTON : black -> white */
        document.getElementById("likeImg").style.filter = "none";
      }
    } else {
      this.setState((state) => ({
        dislikes: state.dislikes - 1,
        isDisliked: false,
      })); /* DISLIKE button unpressed */
      document.getElementById("dislike").style.backgroundColor =
        "#f5f5f5"; /* DISLIKE BUTTON : black -> white */
      document.getElementById("dislikeImg").style.filter = "none";
    }
  }

  postComment() {
    if (this.state.userInput != "") {
      this.setState({
        comments: this.state.comments.concat([this.state.userInput]),
      });
      console.log(this.state.userInput);
      document.getElementById("commentsInputField").value = "";
      this.setState({userInput: ''});
      let comments = document.getElementById("comments")
      comments.scrollTop = comments.scrollHeight;
    }
  }

  changeAudioState() {
    const video = document.getElementById("video");
    video.muted = !video.muted;
  }

  handleChange(event) {
    this.setState({ userInput: event.target.value });
  }

  toggleComments() {
    this.setState(state => ({commentsShown: !state.commentsShown}))
  }

  render() {
    return (
      <div
        id="shortSection"
        className="mt-[5vh] h-[80vh] w-full overflow-auto snap-y snap-mandatory no-scrollbar"
      >
        {/* Contains video and right bar */}
        <div className="mb-[1vh] flex justify-center">
          {/* Contains video and its informations */}
          <div class="videoContainer">
            <video src="1.mp4" id="video" class="short" muted autoPlay loop />

            {/* Contains video's informations */}
            <div className="flex flex-col justify-between h-full w-full group">
              {/* Contains pause button and sound button */}
              <div className="p-[1.5vh] flex justify-between items-start bg-gradient-to-b from-black to-transparent opacity-0 group-hover:opacity-100 transition ease-in-out">
                {/* Play button */}
                <button id="playButton" className="h-[4vh] w-[4vh]">
                  <img src="playButton.png" id="playButtonImg" />
                </button>

                {/* Sound button */}
                <button id="soundButton" className="h-[4vh] w-[4vh]">
                  <img src="muteButton.png" id="soundButtonImg" />
                </button>
              </div>

              {/* Contains uploader's informations and video's title */}
              <div className="mb-[2vh] p-[1vh] mb-[1vh] ml-[2vh] text-white">
                {/* Contains uploader's informations */}
                <div className="mb-[1vh] flex items-center">
                  {/* Profile picture */}
                  <button className="h-[4.5vh] w-[4.5vh] rounded-full overflow-hidden">
                    <img
                      src="picture.png"
                      alt="photo"
                      className="h-[4.5vh] w-[4.5vh]"
                    />
                  </button>

                  {/* Uploader's channel */}
                  <button className="ml-[0.95vh] font-semibold text-[2vh]">
                    @{this.state.videosInfos.pseudo}
                  </button>

                  {/* Subscribe button */}
                  <button className="ml-[0.95vh] px-[1.5vh] py-[0.95vh] bg-white text-black rounded-full text-[1.5vh]">
                    Subscribe
                  </button>
                </div>

                {/* Video's title */}
                <p className="text-[2vh]">
                  {this.state.videosInfos.description}
                </p>
              </div>
            </div>
          </div>
          {this.state.commentsShown ?
          <div className="commentsContainer bg-gray-300 rounded-r-xl">
            <div>
              <h1>hello, {this.props.test}</h1>
            </div>
            <div id='comments' className="flex-col-reverse p-[1vh] overflow-scroll">
                <div>
                {this.state.comments.map(comment => (<div className="rounded-sm bg-white m-1">{comment}</div>))}
                </div>
            </div>
              <div>
                <div className="m-2">
                  <input id='commentsInputField' className='border border-purple border-50 rounded-sm text-gray' maxLength="1024" type='text' onChange={this.handleChange}></input>
                </div>
                <div className="m-2">
                  <button onClick={this.postComment} className='rounded-full bg-blue-300 p-1'>Post comment</button>
                </div>
              </div>
            </div>
            : <div />
            }{/* Right bar */}
            <div id="optionBar" className="ml-[0.95vh] mt-[32vh] h-[48vh] flex flex-col justify-end justify-between items-center">
              {/* Contains like button and likes count */}
              <div className={buttonContainerStyle}>
                {/* Like button */}
                <button id="like" className={buttonStyle} onClick={this.like}>
                  <img src="like.png" id="likeImg" className={buttonImageStyle} />
                </button>
  
                {/* Likes count */}
                <p className={buttonTextStyle}> {this.state.videosInfos['nb_likes']} 342124</p>
              </div>
  
              {/* Contains dislike button and its name */}
              <div className={buttonContainerStyle}>
                {/* Dislike button */}
                <button
                  id="dislike"
                  className={buttonStyle}
                  onClick={this.dislike}
                >
                  <img
                    src="dislike.png"
                    id="dislikeImg"
                    className={buttonImageStyle}
                  />
                </button>
  
                {/* Name */}
                <p className={buttonTextStyle}>Dislike</p>
              </div>
  
              {/* Contains comment button and comments count */}
              <div className={buttonContainerStyle}>
                {/* Comment button */}
                <button className={buttonStyle} onClick={this.toggleComments}>
                  <img src="comment.png" className={buttonImageStyle} />
                </button>
                {/* Comments count */}
                <p className={buttonTextStyle}>1432</p>
              </div>
  
              {/* Contains share button and its name */}
              <div className={buttonContainerStyle}>
                {/* Share button */}
                <button className={buttonStyle}>
                  <img src="share.png" className={buttonImageStyle} />
                </button>
  
                {/* Name */}
                <p className={buttonTextStyle}>Share</p>
              </div>
  
              {/* More options button */}
              <button className={buttonStyle}>
                <img src="3dots.png" className={buttonImageStyle} />
              </button>
  
              {/* Sound used */}
              <button className="flex items-center justify-center bg-[#f5f5f5] w-[5vw] h-[5vw] rounded-[20]">
                {" "}
              </button>
            </div>
        </div>
      </div>
    );

    // return(

    //   <div id='shortContainer' className={shortContainer}>
    //     <ShortRequest />

    //     <div id='styleScope' className={styleScope}>
    //       <div id='shortRenderer' className={shortRenderer}>
    //       </div>

    //     </div>

    //     <div id='sideButtons' className={allButtonsAlignStyle}>
    //         <div className={buttonAlignStyle}>
    //           <button id='like' className={buttonStyle} onClick={this.like}>
    //             <img id='likeImg' src="like.png" className={innerButtonStyle} alt="I like this content"></img>
    //           </button>
    //           <span className={sideButtonsText}> Like  {/* {this.state.likes} */} </span>
    //         </div>
    //         <div className={buttonAlignStyle}>
    //           <button id='dislike' className={buttonStyle} onClick={this.dislike}>
    //             <img id='dislikeImg' src="dislike.png" className={innerButtonStyle} alt="I dislike this content"></img>
    //           </button>
    //           <span> Dislike {/* {this.state.dislikes} */} </span>
    //         </div>
    //         <div className={buttonAlignStyle}>
    //           <button className={buttonStyle} onClick=''>
    //             <img src="comment.png" className={innerButtonStyle} alt="Comments"></img>
    //           </button>
    //           <span> Comments {} </span>
    //         </div>
    //         <div className={buttonAlignStyle}>
    //           <button className={buttonStyle} onClick=''>
    //             <img src="share.png" className={innerButtonStyle} alt="Share"></img>
    //           </button>
    //           <span> Share {} </span>
    //         </div>
    //         <div className={buttonAlignStyle}>
    //           <button className={buttonStyle} onClick=''>
    //             <img src="3dots.png" className={innerButtonStyle}></img>
    //           </button>
    //           <span> More {} </span>
    //         </div>
    //         <div className={buttonAlignStyle}>
    //           <button className={audioButtonStyle} onClick=''>
    //           </button>
    //         </div>

    //         {/* COMMENTS
    //         <div>
    //           <ul>
    //             {comments}
    //           </ul>
    //         </div>
    //         */}
    //       </div>

    //   </div>

    // );
  }
}

const buttonContainerStyle = "flex flex-col items-center";
const buttonStyle =
  "h-[5vh] w-[5vh] flex items-center justify-center rounded-full bg-[#f5f5f5] hover:bg-[#e5e5e5]";
const buttonImageStyle = "scale-50";
const buttonTextStyle = "text-[1.5vh]";

// const audioButtonStyle = "flex items-center justify-center bg-[#f5f5f5] w-[3vw] h-[3vw] rounded-[20]";
// const buttonStyle = "flex items-center justify-center p-4 bg-[#f5f5f5] w-[5vh] h-[5vh] rounded-full hover:bg-[#e5e5e5]";
// const allButtonsAlignStyle = "flex justify-end items-center flex-col";
// const buttonAlignStyle = "flex items-center justify-center flex-col mb-[0.7vw] ml-[1vw]";

// const innerButtonStyle = "w-[15px] h-[15px] scale-125 object-contain";
// const sideButtonsText = "text-ellipsis";

// const inputStyle = "bg-white border-solid border-2 rounded-md";

// const shortContainer = "flex justify-center items-center space-y-6";
// const shortRenderer = "relative h-[80vh] w-[45vh] bg-[#e5e5e5] rounded-lg";
// const styleScope = "flex flex-row";

/*  width: calc(56.25vh - 72px - var(--ytd-shorts-top-spacing, 0px)* .5625);
    height: calc(100vh - 128px - var(--ytd-shorts-top-spacing, 0px)); */


const short = <Short test={"cock and ball torture"}/>

ReactDOM.render(short, document.getElementById("root"));

export default Short;
