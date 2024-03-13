import React from 'react';

class FormSignup extends React.Component {
  render() {
    return (
      <div className='flex flex-col space-y-4'>
        <label>
          <input className='block mb-2 text-sm font-medium text-gray-900 dark:text-black w-full px-4 py-4 rounded-none bg-gray-200' type="text" name="name" placeholder='Username' required />
        </label>
        <label>
          <input className='block mb-2 text-sm font-medium text-gray-900 dark:text-black w-full px-4 py-4 rounded-none bg-gray-200' type="email" name="mail" placeholder='Mail' required />
        </label>
        <label>
          <input className='block mb-2 text-sm font-medium text-gray-900 dark:text-black w-full px-4 py-4 rounded-none bg-gray-200' type="password" name="password" placeholder='Password' required />
        </label>
        <label>
          <input className='block mb-2 text-sm font-medium text-gray-900 dark:text-black w-full px-4 py-4 rounded-none bg-gray-200' type="password" name="confirm_password" placeholder='Confirm Password' required />
        </label>
      </div>
    );
  }
}

export default FormSignup;