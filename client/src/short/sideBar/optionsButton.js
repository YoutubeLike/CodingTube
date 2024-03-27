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
      </div>
    );
  }
}

export default OptionsButton;
