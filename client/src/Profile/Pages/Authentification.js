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
        <div className="relative w-3/4 h-3/5 shadow-2xl rounded-2xl">
          <div className="flex flex-col justify-center items-center absolute inset-0 w-1/2 h-full bg-gray-50 shadow-inner rounded-l-2xl">
            <h2 className="">
              {this.state.isLogin ? "Connexion" : "Inscription"}
            </h2>
            <form className="">
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
              <button type="submit" onClick={this.handleSubmit}>
                {this.state.isLogin ? "Se connecter" : "S'inscrire"}
              </button>
            </form>
            <p>
              <button onClick={this.toggleForm}>
                {this.state.isLogin
                  ? "Vous n'avez pas de compte ?"
                  : "Vous avez déjà un compte ?"}
              </button>
            </p>
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
