import React from "react";

class FormLogin extends React.Component {
  render() {
    return (
      <>
        <label>
          Email:
          <input
            type="email"
            name="email"
            required
            value={this.props.formData.email}
            onChange={this.props.onChange}
          />
        </label>
        <label>
          Mot de passe:
          <input
            type="password"
            name="password"
            required
            value={this.props.formData.password}
            onChange={this.props.onChange}
          />
        </label>
      </>
    );
  }
}

export default FormLogin;
