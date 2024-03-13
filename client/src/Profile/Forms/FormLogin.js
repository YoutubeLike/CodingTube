import React, { useState } from "react";

class FormLogin extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <label>
          <input
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            type="email"
            name="usernameOrMail"
            placeholder="Email"
            required
            value={this.props.LoginData.usernameOrMail}
            onChange={this.props.onLoginChange}
          />
        </label>
        <label>
          <input
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            type="password"
            name="password"
            placeholder="Password"
            required
            value={this.props.LoginData.password}
            onChange={this.props.onLoginChange}
          />
        </label>
      </>
    );
  }
}

export default FormLogin;
