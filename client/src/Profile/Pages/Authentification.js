import React from 'react';
import FormLogin from '../Forms/FormLogin'; 
import FormSignup from '../Forms/FormSignup'; 

class Authentifaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
      formData: {
        email: '',
        password: '',
        name: ''
      }
    };
  }

  toggleForm = () => {
    this.setState((prevState) => ({
      isLogin: !prevState.isLogin,
    }));
  };

  render() {
    return (
      <div>
        <h2>{this.state.isLogin ? 'Connexion' : 'Inscription'}</h2> {/* A enlever plus tard */}


        <form>
          {this.state.isLogin ? <FormLogin /> : <FormSignup />}
          <button type="submit">{this.state.isLogin ? 'Se connecter' : 'S\'inscrire'}</button>
        </form>

        <p>

          <button onClick={this.toggleForm}>
            {this.state.isLogin ? "Vous n'avez pas de compte ?" : "Vous avez déjà un compte ?"}
          </button>
        </p>
      </div>
    );
  }
}

export default Authentifaction;
