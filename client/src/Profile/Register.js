import React from "react";

class FormSignup extends React.Component {
  render() {
    return (
      <>
        <label>
          Nom:
          <input
            type="text"
            name="name"
            required
            value={this.props.fromData.username}
            onChange={this.props.onChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            required
            value={this.props.fromData.email}
            onChange={this.props.onChange}
          />
        </label>
        <label>
          Mot de passe:
          <input
            type="password"
            name="password"
            required
            value={this.props.fromData.password}
            onChange={this.props.onChange}
          />
        </label>
      </>
    );
  }
}

export default FormSignup;
