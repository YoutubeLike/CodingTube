import React, { useState } from 'react';

class FormLogin extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
      return (
        <>
          <label>
            Email:
            <input type="email" name="email" required />
          </label>
          <label>
            Mot de passe:
            <input type="password" name="password" required />
          </label>
        </>
      );
    }
  }

export default FormLogin