import React, { useState } from "react";

class FormSignup extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <label>
          Nom:
          <input
            type="text"
            name="username"
            required
            value={this.props.RegisterData.username}
            onChange={this.props.onRegisterChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="mail"
            required
            value={this.props.RegisterData.mail}
            onChange={this.props.onRegisterChange}
          />
        </label>
        <label>
          Mot de passe:
          <input
            type="password"
            name="password"
            required
            value={this.props.RegisterData.password}
            onChange={this.props.onRegisterChange}
          />
        </label>
      </>
    );
  }
}

export default FormSignup;
