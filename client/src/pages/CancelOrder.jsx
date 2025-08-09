import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const CancelOrder = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const hendleOnClick = () => {
        navigate('/');
    }

  return (
    <div className='m-2 w-full max-w-md p-4 py-5 bg-red-200 rounded-md mx-auto'>
        <p className='text-center text-red-900 font-bold text-lg'>
            Order Cancel
        </p>
        <button onClick={hendleOnClick}
            className='block mx-auto mt-5 px-4 py-2 bg-red-700 hover:bg-red-600 text-white rounded-md'>
            Go To Home
        </button>
    </div>
  )
}

export default CancelOrder