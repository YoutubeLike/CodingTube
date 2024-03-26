import React from "react";
import FormLogin from "../Forms/FormLogin";
import FormSignup from "../Forms/FormSignup";
import TransitionToLogin from "../Transitions/TransitionToLogin";
import TransitionToRegister from "../Transitions/TransitionToRegister";
import axios from "axios";
import "../../index.css";

class Authentification extends React.Component {
  constructor(props) {
    super(props);
    // Initialisation de l'état local
    this.state = {
      isLogin: true, // Indique si l'utilisateur est en train de se connecter (true) ou de s'inscrire (false)
      RegisterData: {
        mail: "",
        username: "",
        password: "",
        confirmPassword: "",
      }, // Données pour le formulaire d'inscription
      LoginData: {
        usernameOrMail: "",
        password: "",
      }, // Données pour le formulaire de connexion
      errorLogin: null, // Message d'erreur pour la connexion
      errorRegister: null, // Message d'erreur pour l'inscription
      goodLogin: null, // Message de succès pour la connexion
      goodRegister: null, // Message de succès pour l'inscription
      heightBiggerThanWidth: true, // Indique si la hauteur est plus grande que la largeur
      darkMode: false, // Indique si le mode sombre est activé ou non
    };
  }

  // Méthode appelée lors du changement de taille de la fenêtre
  checkHeightWidthRatio = () => {
    // Vérifie si la hauteur est plus grande que la largeur
    const heightBiggerThanWidth = window.innerHeight > window.innerWidth;
    // Met à jour l'état correspondant
    this.setState({ heightBiggerThanWidth });
  };

  componentDidMount() {
    // Ajoute un écouteur d'événement pour détecter les changements de taille de la fenêtre
    window.addEventListener("resize", this.checkHeightWidthRatio);
    // Vérifie initialement la taille de la fenêtre
    this.checkHeightWidthRatio();
  }

  componentWillUnmount() {
    // Supprime l'écouteur d'événement lors du démontage du composant pour éviter les fuites de mémoire
    window.removeEventListener("resize", this.checkHeightWidthRatio);
  }

  // Méthode pour basculer entre le formulaire de connexion et d'inscription
  toggleForm = () => {
    // Inverse la valeur de isLogin pour basculer entre le formulaire de connexion et d'inscription
    this.setState((prevState) => ({
      isLogin: !prevState.isLogin,
    }));
  };

  // Méthode pour basculer entre le mode sombre et le mode clair
  toggleDarkMode = () => {
    // Inverse la valeur de darkMode pour basculer entre le mode sombre et le mode clair
    this.setState((prevState) => ({
      darkMode: !prevState.darkMode,
    }));
  };

  // Méthode appelée lors de la saisie dans les champs de formulaire
  onChange = (e) => {
    const { name, value } = e.target;
    // Détermine quelles données de formulaire doivent être mises à jour en fonction de l'état actuel (connexion ou inscription)
    const formType = this.state.isLogin ? "LoginData" : "RegisterData";
    // Met à jour les données du formulaire correspondantes avec la nouvelle valeur
    this.setState((prevState) => ({
      [formType]: {
        ...prevState[formType],
        [name]: value,
      },
    }));
  };

  // Méthode appelée lors de la soumission du formulaire
  handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le comportement par défaut du formulaire (rechargement de la page)
    // Crée un objet formData contenant les données du formulaire, le type de formulaire (connexion ou inscription) et les données de connexion ou d'inscription
    const formData = {
      isLogin: this.state.isLogin,
      loginData: this.state.LoginData,
      registerData: this.state.RegisterData,
    };

    // Gestion de l'inscription ou de la connexion en fonction de l'état du formulaire
    if (!this.state.isLogin) {
      try {
        // Envoie les données d'inscription au serveur
        const response = await axios.post(
          "http://localhost:5000/api/profil/register",
          formData
        );

        // Met à jour l'état avec le message de succès et réinitialise les données du formulaire
        this.setState({
          goodRegister: response.data.message,
          errorRegister: null,
          goodLogin: null,
          errorLogin: null,
          RegisterData: {
            mail: "",
            username: "",
            password: "",
            confirmPassword: "",
          },
        });
      } catch (error) {
        // En cas d'erreur, met à jour l'état avec le message d'erreur
        this.setState({
          errorRegister: error.response.data.error,
          goodRegister: null,
          goodLogin: null,
          errorLogin: null,
        });
      }
    } else {
      try {
        // Envoie les données de connexion au serveur
        const response = await axios.post(
          "http://localhost:5000/api/profil/login",
          formData,
          {
            withCredentials: true,
          }
        );
        // const { Cookies } = require('react-cookie')
        // new Cookies().set("SuperCookie", response.data)
        //window.location.href = response.data.redirectTo;
        // Met à jour l'état avec le message de succès et réinitialise les données du formulaire
        this.setState({
          goodLogin: response.data.message,
          errorLogin: null,
          errorRegister: null,
          goodRegister: null,
          LoginData: {
            usernameOrMail: "",
            password: "",
          },
        });
      } catch (error) {
        // En cas d'erreur, met à jour l'état avec le message d'erreur
        this.setState({
          errorLogin: error.response.data.error,
          goodRegister: null,
          errorRegister: null,
          goodLogin: null,
        });
      }
    }
  };

  render() {
    const { darkMode } = this.state; // Récupération de l'état du mode sombre
    return (
      <div
        className={`flex justify-center items-center h-screen min-h-screen min-w-screen ${
          darkMode ? "bg-gray-900" : "bg-white"
        } ${
          this.state.heightBiggerThanWidth
            ? `min-h-[1120px] min-w-[200px]`
            : `min-h-[800px] min-w-[768px]`
        }`}
      >
        {" "}
        {/* Div qui englobe tout */}
        <div
          className={`${
            this.state.heightBiggerThanWidth
              ? `relative w-full h-full shadow-2xl flex flex-col ${
                  darkMode ? "dark-mode" : ""
                }`
              : `relative w-4/5 h-3/4 shadow-2xl rounded-2xl flex ${
                  darkMode ? "dark-mode" : ""
                }`
          }`}
        >
          {" "}
          {/* Partie Rouge */}
          <div
            className={`${
              this.state.heightBiggerThanWidth
                ? `relative h-1/2 w-full flex-col bg-gradient-to-r from-red-700 via-red-600 to-red-700 shadow-inner ${
                    darkMode
                      ? "bg-gradient-to-r from-red-900 via-red-800 to-red-900 "
                      : "bg-gradient-to-r from-red-700 via-red-600 to-red-700 "
                  }`
                : `relative w-1/2 h-full flex-col bg-gradient-to-r from-red-700 via-red-600 to-red-700 shadow-inner ${
                    darkMode
                      ? "bg-gradient-to-r from-red-900 via-red-800 to-red-900 "
                      : "bg-gradient-to-r from-red-700 via-red-600 to-red-700 "
                  }`
            } ${
              this.state.isLogin
                ? `${
                    this.state.heightBiggerThanWidth
                      ? "transform translate-y-full"
                      : "transform translate-x-full"
                  }`
                : `${
                    this.state.heightBiggerThanWidth
                      ? "transform translate-y-0"
                      : "transform translate-x-0"
                  }`
            } ${
              this.state.isLogin
                ? `${this.state.heightBiggerThanWidth ? "" : "rounded-r-2xl"}`
                : `${this.state.heightBiggerThanWidth ? "" : "rounded-l-2xl"}`
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
              className={`flex flex-col justify-center space-y-10 items-center absolute ${
                this.state.heightBiggerThanWidth
                  ? "top-0 h-1/2 w-full"
                  : "rounded-l-2xl left-0 w-1/2 h-full"
              } ${darkMode ? "bg-gray-800" : "bg-white"}
            bg-gray-50 shadow-inner p-4`}
            >
              <h2
                className={`flex justify-center items-center text-4xl ${
                  darkMode ? "text-white" : "text-black"
                }`}
              >
                Sign in
              </h2>
              <form className="w-full md:w-3/4 overflow-auto">
                <FormLogin
                  LoginData={this.state.LoginData}
                  onLoginChange={this.onChange}
                  darkMode={this.state.darkMode}
                />
              </form>
              {this.state.errorLogin && (
                <p className="!mt-2 text-red-600">{this.state.errorLogin}</p>
              )}
              {this.state.goodLogin && (
                <p className="!mt-2 text-green-600">{this.state.goodLogin}</p>
              )}
              <div className="flex flex-col justify-center items-center space-y-4 w-full">
                <a
                  href="https://discord.com/oauth2/authorize?client_id=1222106872736383056&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2FloginDiscord&scope=identify+email"
                  class="inline-block px-4 py-2 mt-5 text-lg rounded-full text-black"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                    height="32"
                    width="32"
                    stroke="black"
                  >
                    <path d="M524.5 69.8a1.5 1.5 0 0 0 -.8-.7A485.1 485.1 0 0 0 404.1 32a1.8 1.8 0 0 0 -1.9 .9 337.5 337.5 0 0 0 -14.9 30.6 447.8 447.8 0 0 0 -134.4 0 309.5 309.5 0 0 0 -15.1-30.6a1.9 1.9 0 0 0 -1.9-.9A483.7 483.7 0 0 0 116.1 69.1a1.7 1.7 0 0 0 -.8 .7C39.1 183.7 18.2 294.7 28.4 404.4a2 2 0 0 0 .8 1.4A487.7 487.7 0 0 0 176 479.9a1.9 1.9 0 0 0 2.1-.7A348.2 348.2 0 0 0 208.1 430.4a1.9 1.9 0 0 0 -1-2.6 321.2 321.2 0 0 1 -45.9-21.9 1.9 1.9 0 0 1 -.2-3.1c3.1-2.3 6.2-4.7 9.1-7.1a1.8 1.8 0 0 1 1.9-.3c96.2 43.9 200.4 43.9 295.5 0a1.8 1.8 0 0 1 1.9 .2c2.9 2.4 6 4.9 9.1 7.2a1.9 1.9 0 0 1 -.2 3.1 301.4 301.4 0 0 1 -45.9 21.8 1.9 1.9 0 0 0 -1 2.6 391.1 391.1 0 0 0 30 48.8 1.9 1.9 0 0 0 2.1 .7A486 486 0 0 0 610.7 405.7a1.9 1.9 0 0 0 .8-1.4C623.7 277.6 590.9 167.5 524.5 69.8zM222.5 337.6c-29 0-52.8-26.6-52.8-59.2S193.1 219.1 222.5 219.1c29.7 0 53.3 26.8 52.8 59.2C275.3 311 251.9 337.6 222.5 337.6zm195.4 0c-29 0-52.8-26.6-52.8-59.2S388.4 219.1 417.9 219.1c29.7 0 53.3 26.8 52.8 59.2C470.7 311 447.5 337.6 417.9 337.6z" />
                  </svg>
                </a>

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
              className={`flex flex-col justify-center space-y-10 items-center absolute ${
                this.state.heightBiggerThanWidth
                  ? "bottom-0 h-1/2 w-full"
                  : "rounded-r-2xl right-0 w-1/2 h-full"
              } ${darkMode ? "bg-gray-800" : "bg-white"}
            bg-gray-50 shadow-inner p-4`}
            >
              <h2
                className={`flex justify-center items-center text-4xl ${
                  darkMode ? "text-white" : "text-black"
                }`}
              >
                Sign up
              </h2>

              <form className="w-full md:w-3/4 overflow-auto">
                <FormSignup
                  RegisterData={this.state.RegisterData}
                  onRegisterChange={this.onChange}
                  darkMode={this.state.darkMode}
                />
              </form>
              {this.state.errorRegister && (
                <p className="!mt-2 text-red-600">{this.state.errorRegister}</p>
              )}
              {this.state.goodRegister && (
                <p className="!mt-2 text-green-600">
                  {this.state.goodRegister}
                </p>
              )}
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
            </div>
          </div>
        </div>
        {/* Bouton Dark Mode */}
        <button
          className="absolute top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-md z-50"
          onClick={this.toggleDarkMode}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
        {/* Bouton Dark Mode */}
      </div>
    );
  }
}

export default Authentification;
