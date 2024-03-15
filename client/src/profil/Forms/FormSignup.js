import React from "react";

class FormSignup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      showConfirmPassword: false,
    };
  }

  togglePasswordVisibility = () => {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword,
    }));
  };

  toggleConfirmPasswordVisibility = () => {
    this.setState((prevState) => ({
      showConfirmPassword: !prevState.showConfirmPassword,
    }));
  };

  render() {
    return (
      <div className="flex flex-col space-y-4 relative">
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
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-full px-4 py-4 rounded-none bg-gray-200 pr-12"
            type="email"
            name="mail"
            placeholder="Mail"
            required
            value={this.props.RegisterData.mail}
            onChange={this.props.onRegisterChange}
          />
        </label>
        <label className="relative">
          <input
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-full px-4 py-4 rounded-none bg-gray-200 pr-12"
            type={this.state.showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            required
            value={this.props.RegisterData.password}
            onChange={this.props.onRegisterChange}
          />
          <span
            className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
            onClick={this.togglePasswordVisibility}
          >
            {this.state.showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 20 20"
                >
                  <g fill="none">
                    <path
                      d="M2.854 2.146a.5.5 0 1 0-.708.708l3.5 3.498a8.097 8.097 0 0 0-3.366 5.046a.5.5 0 1 0 .979.204a7.09 7.09 0 0 1 3.108-4.528L7.95 8.656a3.5 3.5 0 1 0 4.884 4.884l4.313 4.314a.5.5 0 0 0 .708-.708l-15-15z"
                      fill="currentColor"
                    />
                    <path
                      d="M10.124 8.003l3.363 3.363a3.5 3.5 0 0 0-3.363-3.363z"
                      fill="currentColor"
                    />
                    <path
                      d="M7.531 5.41l.803.803A6.632 6.632 0 0 1 10 6c3.206 0 6.057 2.327 6.74 5.602a.5.5 0 1 0 .98-.204C16.943 7.673 13.693 5 10 5c-.855 0-1.687.143-2.469.41z"
                      fill="currentColor"
                    />
                  </g>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 16 16"
                >
                  <g fill="none">
                    <path
                      d="M2.984 8.625v.003a.5.5 0 0 1-.612.355c-.431-.114-.355-.611-.355-.611l.017-.062s.026-.084.047-.145a6.7 6.7 0 0 1 1.117-1.982C4.097 5.089 5.606 4 8 4c2.395 0 3.904 1.089 4.801 2.183a6.7 6.7 0 0 1 1.117 1.982a3.916 3.916 0 0 1 .06.187l.003.013l.002.004v.002a.5.5 0 0 1-.966.258l-.001-.004l-.008-.025a4.9 4.9 0 0 0-.2-.52a5.703 5.703 0 0 0-.78-1.263C11.285 5.912 10.044 5 8 5c-2.044 0-3.286.912-4.028 1.817a5.701 5.701 0 0 0-.945 1.674a3.018 3.018 0 0 0-.035.109l-.008.025z"
                      fill="currentColor"
                    />
                    <path
                      d="M5.5 9.5a2.5 2.5 0 1 1 5 0a2.5 2.5 0 0 1-5 0z"
                      fill="currentColor"
                    />
                  </g>
                </svg>
              )}
          </span>
        </label>
        <label className="relative">
          <input
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-full px-4 py-4 rounded-none bg-gray-200 pr-12"
            type={this.state.showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            value={this.props.RegisterData.confirmPassword}
            onChange={this.props.onRegisterChange}
          />
          <span
            className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
            onClick={this.toggleConfirmPasswordVisibility}
          >
            {this.state.showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 20 20"
                >
                  <g fill="none">
                    <path
                      d="M2.854 2.146a.5.5 0 1 0-.708.708l3.5 3.498a8.097 8.097 0 0 0-3.366 5.046a.5.5 0 1 0 .979.204a7.09 7.09 0 0 1 3.108-4.528L7.95 8.656a3.5 3.5 0 1 0 4.884 4.884l4.313 4.314a.5.5 0 0 0 .708-.708l-15-15z"
                      fill="currentColor"
                    />
                    <path
                      d="M10.124 8.003l3.363 3.363a3.5 3.5 0 0 0-3.363-3.363z"
                      fill="currentColor"
                    />
                    <path
                      d="M7.531 5.41l.803.803A6.632 6.632 0 0 1 10 6c3.206 0 6.057 2.327 6.74 5.602a.5.5 0 1 0 .98-.204C16.943 7.673 13.693 5 10 5c-.855 0-1.687.143-2.469.41z"
                      fill="currentColor"
                    />
                  </g>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 16 16"
                >
                  <g fill="none">
                    <path
                      d="M2.984 8.625v.003a.5.5 0 0 1-.612.355c-.431-.114-.355-.611-.355-.611l.017-.062s.026-.084.047-.145a6.7 6.7 0 0 1 1.117-1.982C4.097 5.089 5.606 4 8 4c2.395 0 3.904 1.089 4.801 2.183a6.7 6.7 0 0 1 1.117 1.982a3.916 3.916 0 0 1 .06.187l.003.013l.002.004v.002a.5.5 0 0 1-.966.258l-.001-.004l-.008-.025a4.9 4.9 0 0 0-.2-.52a5.703 5.703 0 0 0-.78-1.263C11.285 5.912 10.044 5 8 5c-2.044 0-3.286.912-4.028 1.817a5.701 5.701 0 0 0-.945 1.674a3.018 3.018 0 0 0-.035.109l-.008.025z"
                      fill="currentColor"
                    />
                    <path
                      d="M5.5 9.5a2.5 2.5 0 1 1 5 0a2.5 2.5 0 0 1-5 0z"
                      fill="currentColor"
                    />
                  </g>
                </svg>
              )}
          </span>
        </label>
      </div>
    );
  }
}

export default FormSignup;
