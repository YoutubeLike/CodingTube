import React from "react";
import FormLogin from "../Forms/FormLogin";
import FormSignup from "../Forms/FormSignup";

class Authentification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
      RegisterData: {
        mail: "",
        username: "",
        password: "",
        comfirmPassword: "",
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
      <div className="flex justify-center items-center h-screen">
        <div className="relative w-3/4 h-3/4 shadow-2xl rounded-2xl">
          <div className="flex flex-col justify-center space-y-10 items-center absolute inset-0 w-1/2 h-100 bg-gray-50 shadow-inner rounded-l-2xl p-4">
            <h2 className="flex justify-center items-center text-4xl font-sans font-bold mb-8">
              {this.state.isLogin ? "Sign in" : "Sign up"}
            </h2>

            <form className="w-full md:w-3/4 overflow-auto">
              {this.state.isLogin ? (
                <FormLogin
                  LoginData={this.state.LoginData}
                  onLoginChange={this.onChange}
                />
              ) : (
                <FormSignup
                  RegisterData={this.state.RegisterData}
                  onRegisterChange={this.onChange}
                />
              )}
            </form>

            <div className="flex flex-col justify-center items-center space-y-4 w-full">
              <p>
                <button
                  className="text-sm text-slate-400"
                  onClick={this.toggleForm}
                >
                  {this.state.isLogin
                    ? "Forgot your password ? "
                    : "I have a Account"}
                </button>
              </p>

              <button
                className="w-full md:w-auto h-10 md:min-w-[130px] text-white px-2 py-1 font-bold cursor-pointer transition-all duration-300 relative inline-block outline-none rounded-full border-2 border-red-600 bg-red-600 hover:bg-white hover:text-red-600"
                type="submit"
                onClick={this.handleSubmit}
              >
                {this.state.isLogin ? "SIGN IN" : " SIGN UP"}
              </button>
            </div>
          </div>
          <div className="absolute right-0 top-0 w-1/2 h-full bg-gray-300 shadow-inner rounded-r-2xl">
            {/* Contenu de la deuxième div */}
          </div>
        </div>
      </div>
    );
  }
}

export default Authentification;
