import React, { useState } from "react";
import axios from 'axios';

class TransitionToLogin extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="flex justify-center items-center text-center w-4/5">
        <div className="text-white">
          <h1 className="text-4xl mb-8 animate-bounce">Welcome Back !</h1>
          <p className="text-lg mb-8 space-y-3">
            To keep connecting with us please login with your personal info
          </p>
        </div>
      </div>
    );
  }
}

export default TransitionToLogin;
