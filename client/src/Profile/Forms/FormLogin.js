import React from 'react';

class FormLogin extends React.Component {
  render() {
    return (
      <div className='flex flex-col space-y-4'>
        <label>
          <input className='block mb-2 text-sm font-medium text-gray-900 dark:text-black w-full px-4 py-4 rounded-none bg-gray-200' type="text" name="mail/username" placeholder='Mail or Username' required />
        </label>
        <label>
          <input className='block mb-2 text-sm font-medium text-gray-900 dark:text-black w-full px-4 py-4 rounded-none bg-gray-200' type="password" name="password" placeholder='Password' required />
        </label>
      </div>
    );
  }
}

export default FormLogin;