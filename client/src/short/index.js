import "./short.css";
import React from "react";
import ShortRequest from "./shortRequest";
import ReactDOM from "react-dom";

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
    this.state={ /* attributes that change */
      views: 0,
      likes: 0,
      isLiked: false,
      isDisliked: false,
      dislikes: 0,
      comment: '',
      comments: [],
      commentCount: 0
    }
    this.like = this.like.bind(this);
    this.dislike = this.dislike.bind(this);
    this.postComment = this.postComment.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  like()  {
    if(!this.state.isLiked){
      this.setState(state => ({likes: state.likes+1, isLiked: true}))
      document.getElementById('like').style.backgroundColor = "#171717"; /* LIKE BUTTON : white -> black */
      document.getElementById('likeImg').style.filter = "invert(1)"; /* invert LIKE icon colors */
      if(this.state.isDisliked){
        this.setState(state => ({dislikes: state.dislikes-1, isDisliked: false})) /* DISLIKE button already pressed */
        document.getElementById('dislike').style.backgroundColor = "#f5f5f5"; /* DISLIKE BUTTON : black -> white */
        document.getElementById('dislikeImg').style.filter = "none";
      }
    } else {
      this.setState(state => ({likes: state.likes-1, isLiked: false})) /* LIKE button unpressed */
      document.getElementById('like').style.backgroundColor = "#f5f5f5"; /* LIKE BUTTON : black -> white */
      document.getElementById('likeImg').style.filter = "none";
    }
  }

  dislike()  {
    if(!this.state.isDisliked){
      this.setState(state => ({dislikes: state.dislikes+1, isDisliked: true}))
      document.getElementById('dislike').style.backgroundColor = "#171717"; /* DISLIKE BUTTON : white -> black */
      document.getElementById('dislikeImg').style.filter = "invert(1)"; /* invert DISLIKE icon colors */
      if(this.state.isLiked){
        this.setState(state => ({likes: state.likes-1, isLiked: false})) /* LIKE button already pressed */
        document.getElementById('like').style.backgroundColor = "#f5f5f5"; /* LIKE BUTTON : black -> white */
        document.getElementById('likeImg').style.filter = "none";
      }
    } else {
      this.setState(state => ({dislikes: state.dislikes-1, isDisliked: false})) /* DISLIKE button unpressed */
      document.getElementById('dislike').style.backgroundColor = "#f5f5f5"; /* DISLIKE BUTTON : black -> white */
      document.getElementById('dislikeImg').style.filter = "none";
    }
  }

  postComment(){
    if(this.state.userInput != ""){
      this.setState({comments: this.state.comments.concat([this.state.userInput])});
      console.log(this.state.userInput)
      document.getElementById('commentsInputField').value = "";
    }
  }

  handleChange(event){
    this.setState({userInput: event.target.value})
  }

  render(){

    const comments = this.state.comments.map(comment => (<li>{comment}</li>));
    const infos = ShortRequest();
    return(

      <div id='shortContainer' className={shortContainer}>

        <div>
          {infos.title}
          {infos.description}
          {infos.upload_video_url}
        </div>

        <div id='shortRenderer' className={shortRenderer}>
        </div>

        <div id='sideButtons' className={allButtonsAlignStyle}>
          <div className={buttonAlignStyle}>
            <button id='like' className={buttonStyle} onClick={this.like}>
              <img id='likeImg' src="like.png" className={innerButtonStyle} alt="I like this content"></img>
            </button>
            <span className={sideButtonsText}> Likes  {/* {this.state.likes} */} </span>
          </div>
          <div className={buttonAlignStyle}>
            <button id='dislike' className={buttonStyle} onClick={this.dislike}>
              <img id='dislikeImg' src="dislike.png" className={innerButtonStyle} alt="I dislike this content"></img>
            </button>
            <span> Dislikes {/* {this.state.dislikes} */} </span>
          </div>
          <div className={buttonAlignStyle}>
            <button className={buttonStyle} onClick=''>
              <img src="comment.png" className={innerButtonStyle} alt="Comments"></img>
            </button>
            <span> Comments {} </span>
          </div>
          <div className={buttonAlignStyle}>
            <button className={buttonStyle} onClick=''>
              <img src="share.png" className={innerButtonStyle} alt="Share"></img>
            </button>
            <span> Share {} </span>
          </div>
          <div className={buttonAlignStyle}>
            <button className={buttonStyle} onClick=''>
              <img src="3dots.png" className={innerButtonStyle}></img>
            </button>
            <span> More {} </span>
          </div>
          <div className={buttonAlignStyle}>
            <button className={audioButtonStyle} onClick=''>
            </button>
          </div>

          {/* COMMENTS
          <div className="p-[1vh]">
              <input id='commentsInputField' className={inputStyle} type='text' onChange={this.handleChange}></input>
              <button onClick={this.postComment}className={buttonStyle}>Post comment</button>
          </div>
          <div>
            <ul>
              {comments}
            </ul>
          </div>
          */}

        </div>

      </div>
    );
  }
}

const audioButtonStyle = "flex items-center justify-center bg-[#f5f5f5] w-[3vw] h-[3vw] rounded-[20]";
const buttonStyle = "flex items-center justify-center p-4 bg-[#f5f5f5] w-[5vh] h-[5vh] rounded-full hover:bg-[#e5e5e5]";
const allButtonsAlignStyle = "flex justify-end items-center flex-col";
const buttonAlignStyle = "flex items-center justify-center flex-col mb-[0.7vw] ml-[1vw]";

const innerButtonStyle = "w-[2.5vh] h-[2.5vh]";
const sideButtonsText = "text-ellipsis";

const inputStyle = "bg-white border-solid border-2 rounded-md";



const shortContainer = "flex justify-center items-center";
const shortRenderer = "h-[560px] w-[315px] min-h-[560px] min-w-[315px] w-full overflow-auto snap-y snap-mandatory no-scrollbar rounded-lg bg-[#f5f5f5]"

/*filter:var(--tw-invert)*/

ReactDOM.render(<Short />, document.getElementById('root'));


export default Short;
