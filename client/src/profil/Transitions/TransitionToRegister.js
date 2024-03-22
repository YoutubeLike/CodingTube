import React, { useState } from "react";

class TransitionToRegister extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="flex justify-center items-center text-center w-4/5">
        <div className="text-white">
          <h1 className="text-4xl mb-8 animate-bounce">
            Hello, Friends !
          </h1>
          <p className="text-lg mb-8 space-y-3">
            Enter your personal details and start journey with us
          </p>
        </div>
      </div>
    );
  }
}

export default TransitionToRegister;
