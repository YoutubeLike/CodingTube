import React, { useState } from "react";
import axios from 'axios';

class TransitionToLogin extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="flex justify-center items-center text-center w-full w-4/5">
        <div className="text-white">
          <h1 className="text-4xl font-sans font-bold mb-8">Welcome Back !</h1>
          <p className="text-2xl font-sans mb-8 space-y-3">
            To keep connecting with us please login with your personal info
          </p>
        </div>
      </div>
    );
  }
}

export default TransitionToLogin;
