import React from "react";
import FormLogin from "./Login";
import FormSignup from "./Register";

class Authentifaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
      formData: {
        email: "",
        password: "",
        username: "",
      },
    };
  }

  toggleForm = () => {
    this.setState((prevState) => ({
      isLogin: !prevState.isLogin,
    }));
  };

  handleFormChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.formData);
    // Back de l'inscription ici
  };

  render() {
    return (
      <div>
        <h2>{this.state.isLogin ? "Connexion" : "Inscription"}</h2>

        <form onSubmit={this.handleSubmit}>
          {this.state.isLogin ? (
            <FormLogin
              formData={this.state.formData}
              onChange={this.handleFormChange}
            />
          ) : (
            <FormSignup
              formData={this.state.formData}
              onChange={this.handleFormChange}
            />
          )}
          <button type="submit">
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
    );
  }
}

export default Authentifaction;
