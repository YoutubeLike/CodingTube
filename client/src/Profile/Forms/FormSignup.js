import React from "react";

class FormSignup extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="flex flex-col space-y-4">
        <label>
          <input
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-full px-4 py-4 rounded-none bg-gray-200"
            type="text"
            name="username"
            placeholder="Username"
            required
            value={this.props.RegisterData.username}
            onChange={this.props.onRegisterChange}
          />
        </label>
        <label>
          <input
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-full px-4 py-4 rounded-none bg-gray-200"
            type="email"
            name="mail"
            placeholder="Mail"
            required
            value={this.props.RegisterData.mail}
            onChange={this.props.onRegisterChange}
          />
        </label>
        <label>
          <input
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-full px-4 py-4 rounded-none bg-gray-200"
            type="password"
            name="password"
            placeholder="Password"
            required
            value={this.props.RegisterData.password}
            onChange={this.props.onRegisterChange}
          />
        </label>
        <label>
          <input
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-full px-4 py-4 rounded-none bg-gray-200"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            value={this.props.RegisterData.confirmPassword}
            onChange={this.props.onRegisterChange}
          />
        </label>
      </div>
    );
  }
}

export default FormSignup;
