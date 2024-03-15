import React from "react";
import FormLogin from "../Forms/FormLogin";
import FormSignup from "../Forms/FormSignup";
import TransitionToLogin from "../Transitions/TransitionToLogin";
import TransitionToRegister from "../Transitions/TransitionToRegister";

class Authentification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
      RegisterData: {
        mail: "",
        username: "",
        password: "",
        confirmPassword: "",
      },
      LoginData: {
        usernameOrMail: "",
        password: "",
      },
    };
  }

  toggleForm = () => {
    this.setState((prevState) => ({
      isLogin: !prevState.isLogin,
    }));
  };

  onChange = (e) => {
    const { name, value } = e.target;
    const formType = this.state.isLogin ? "LoginData" : "RegisterData";
    this.setState((prevState) => ({
      [formType]: {
        ...prevState[formType],
        [name]: value,
      },
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const formData = this.state.isLogin
      ? this.state.LoginData
      : this.state.RegisterData;
    console.log(formData);
    // Back de l'inscription ici
  };

  render() {
    return (
      <div className="flex justify-center items-center h-screen min-h-screen min-w-screen min-h-[750px] min-w-[700px]">
        {" "}
        {/* Div qui englobe tout */}
        <div className="relative w-3/4 h-3/4 shadow-2xl rounded-2xl flex">
          {" "}
          {/* Partie Rouge */}
          <div
            className={`absolute w-1/2 h-full flex-col bg-red-700 shadow-inner ${
              this.state.isLogin
                ? "transform translate-x-full"
                : "transform translate-x-0"
            } ${
              this.state.isLogin ? "rounded-r-2xl" : "rounded-l-2xl"
            } flex justify-center items-center z-50 transition-all duration-1000`}
          >
            {this.state.isLogin ? (
              <>
                <TransitionToRegister />
                <div className="flex justify-center items-center text-center w-4/5">
                  <button
                    className="w-full md:w-auto h-10 md:min-w-[130px] text-white px-2 py-1 cursor-pointer transition-all duration-300 relative inline-block outline-none rounded-full border-2 border-withe-600 hover:bg-white hover:text-red-600"
                    onClick={this.toggleForm}
                  >
                    {this.state.isLogin ? "SIGN UP " : "SIGN IN"}
                  </button>
                </div>
              </>
            ) : (
              <>
                <TransitionToLogin />
                <div className="flex justify-center items-center text-center w-4/5">
                  <button
                    className="w-full md:w-auto h-10 md:min-w-[130px] text-white px-2 py-1 cursor-pointer transition-all duration-300 relative inline-block outline-none rounded-full border-2 border-white -600 hover:bg-white hover:text-red-600"
                    onClick={this.toggleForm}
                  >
                    {this.state.isLogin ? "SIGN UP " : "SIGN IN"}
                  </button>
                </div>
              </>
            )}
          </div>
          {/* Partie Rouge */}
          <div>
            {/* 1er Form */}
            <div
              className={`flex flex-col justify-center space-y-10 items-center absolute left-0
            w-1/2 h-full bg-gray-50 shadow-inner rounded-l-2xl p-4`}
            >
              <h2 className="flex justify-center items-center text-4xl">
                Sign in
              </h2>

              <form className="w-full md:w-3/4 overflow-auto">
                <FormLogin
                  LoginData={this.state.LoginData}
                  onLoginChange={this.onChange}
                />
              </form>

              <div className="flex flex-col justify-center items-center space-y-4 w-full">
                <p>
                  <button
                    className="text-sm text-slate-400"
                    onClick={this.toggleForm}
                  >
                    Forgot your password ?
                  </button>
                </p>

                <button
                  className="w-full md:w-auto h-10 md:min-w-[130px] text-white px-2 py-1 cursor-pointer transition-all duration-300 relative inline-block outline-none rounded-full border-2 border-red-600 bg-red-600 hover:bg-white hover:text-red-600"
                  type="submit"
                  onClick={this.handleSubmit}
                >
                  SIGN IN
                </button>
              </div>
            </div>
            {/* 1er Form */}

            {/* 2eme Form */}
            <div
              className={`flex flex-col justify-center space-y-10 items-center absolute right-0
            w-1/2 h-full bg-gray-50 shadow-inner rounded-r-2xl p-4`}
            >
              <h2 className="flex justify-center items-center text-4xl">
                Sign up
              </h2>

              <form className="w-full md:w-3/4 overflow-auto">
                <FormSignup
                  RegisterData={this.state.RegisterData}
                  onRegisterChange={this.onChange}
                />
              </form>
              <div className="flex flex-col justify-center items-center space-y-4 w-full">
                <p>
                  <button
                    className="text-sm text-slate-400"
                    onClick={this.toggleForm}
                  >
                    I have a Account
                  </button>
                </p>

                <button
                  className="w-full md:w-auto h-10 md:min-w-[130px] text-white px-2 py-1 cursor-pointer transition-all duration-300 relative inline-block outline-none rounded-full border-2 border-red-600 bg-red-600 hover:bg-white hover:text-red-600"
                  type="submit"
                  onClick={this.handleSubmit}
                >
                  SIGN UP
                </button>
              </div>
              {/* 2eme Form */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Authentification;
