import React, { useState } from 'react';

class FormSignup extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
      return (
        <>
          <label>
            Nom:
            <input type="text" name="name" required />
          </label>
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


export default FormSignup