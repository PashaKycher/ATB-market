import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const SuccessOrder = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const hendleOnClick = () => {
        navigate('/');
    }

  return (
    <div className='m-2 w-full max-w-md p-4 py-5 bg-green-200 rounded-md mx-auto'>
        <p className='text-center text-green-800 font-bold text-lg'>
            {Boolean(location?.state?.text) ? location?.state?.text : "Payment"} Successfully
        </p>
        <button onClick={hendleOnClick} 
            className='block mx-auto mt-5 px-4 py-2 bg-green-700 hover:bg-green-600 text-white rounded-md'>
            Go To Home
        </button>
    </div>
  )
}

export default SuccessOrder