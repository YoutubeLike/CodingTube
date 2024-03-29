import React from "react";
import { PasswordInput, ConfirmPasswordInput } from "../Forms/InputPassword";

class MonComposant extends React.Component {
  render() {
    return (
      <div className="flex flex-col space-y-4 relative">
        {/* Champ Username */}
        <label>
          <input
            className={`block mb-2 text-sm font-medium ${this.props.darkMode ? 'text-white bg-gray-600' : 'text-gray-900 bg-gray-200'} w-full px-4 py-4 rounded-none border border-transparent`}
            type="text"
            name="username"
            placeholder="Username"
            required
            value={this.props.RegisterData.username}
            onChange={this.props.onRegisterChange}
          />
        </label>
        
        {/* Champ Email */}
        <label>
          <input
            className={`block mb-2 text-sm font-medium ${this.props.darkMode ? 'text-white bg-gray-600' : 'text-gray-900 bg-gray-200'} w-full px-4 py-4 rounded-none border border-transparent`}
            type="email"
            name="mail"
            placeholder="Mail"
            required
            value={this.props.RegisterData.mail}
            onChange={this.props.onRegisterChange}
          />
        </label>

        {/* Champ Password avec PasswordInput */}
        <PasswordInput
          darkMode={this.props.darkMode}
          name="password"
          placeholder="Password"
          required
          value={this.props.RegisterData.password}
          onChange={this.props.onRegisterChange}
        />

        {/* Champ Confirm Password avec ConfirmPasswordInput */}
        <ConfirmPasswordInput
          darkMode={this.props.darkMode}
          name="confirmPassword"
          placeholder="Confirm Password"
          required
          value={this.props.RegisterData.confirmPassword}
          onChange={this.props.onRegisterChange}
        />
      </div>
    );
  }
}

export default MonComposant;
