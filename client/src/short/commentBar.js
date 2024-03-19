import React from 'react'

class CommentBar extends React.Component{
    constructor(props){
        super(props);
        this.state={
            comments: ["SMOFGKNSDMGLK SDMGLK DSMGLKDS GMKLS DGMLKSD GMLKSD GMLDSK GSMOFGKNSDMGLK SDMGLK DSMGLKDS GMKLS DGMLKSD GMLKSD GMLDSK GSMOFGKNSDMGLK SDMGLK DSMGLKDS GMKLS DGMLKSD GMLKSD GMLDSK G", "cock and balls !", "i love cummies", "cock and ball TORTURE!!! I FUCKING LOVE THAT STUFF!!!!!!", "KC le KK xD"],
            userInput: '',
            likes: 0,
            dislikes: 0,
        }
        this.postComment = this.postComment.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    countComments(){}

    handleChange(event) {
      this.setState({ userInput: event.target.value });
    }

    postComment() {
        if (this.state.userInput != "") {
        this.setState({
            comments: this.state.comments.concat([this.state.userInput]),
        });
        document.getElementById("commentsInputField").value = "";
        this.setState({userInput: ''});
        }
    }

    render(){
        return(
            <div className="commentsContainer bg-gray-300 rounded-r-xl">
            <div className='p-2'>
              Comments <strong>{this.state.comments.length}</strong>
              <button></button>
            </div>
            <div className='overflow-scroll'>
              <div id='comments' className="flex-col-reverse p-[1vh]">
                  <div>
                    {this.state.comments.map(comment => (<div className="rounded-sm bg-white m-1">{comment}</div>))}
                  </div>
              </div>
                <div>
                  <div className="m-2">
                    <input id='commentsInputField' className='w-full border border-purple border-50 rounded-sm text-gray' maxLength="1024" type='text' onChange={this.handleChange}></input>
                  </div>
                  <div className="m-2">
                    <button onClick={this.postComment} className='rounded-full bg-blue-300 p-1'>Post comment</button>
                  </div>
                </div>
              </div>
            </div>
        )
    }
}

export default CommentBar;