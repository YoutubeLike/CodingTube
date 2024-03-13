import React, { useState } from 'react';

class FormLogin extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
      return (
        <>
          <label>
            <input className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' type="email" name="email" placeholder='Email' required />
          </label>
          <label>
            <input className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' type="password" name="password" placeholder='Password' required />
          </label>
        </>
      );
    }
  }

export default FormLogin