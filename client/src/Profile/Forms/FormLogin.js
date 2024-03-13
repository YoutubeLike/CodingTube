import React, { useState } from "react";

class FormLogin extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <div className='flex flex-col space-y-4'>
          <label>
            <input
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-black w-full px-4 py-4 rounded-none bg-gray-200'
              type="text"
              name="usernameOrMail"
              placeholder="Email or Username"
              required
              value={this.props.LoginData.usernameOrMail}
              onChange={this.props.onLoginChange}
            />
          </label>
          <label>
            <input
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-black w-full px-4 py-4 rounded-none bg-gray-200'
              type="password"
              name="password"
              placeholder="Password"
              required
              value={this.props.LoginData.password}
              onChange={this.props.onLoginChange}
            />
          </label>
        </div>
      </>
    );
  }
}

export default FormLogin;
