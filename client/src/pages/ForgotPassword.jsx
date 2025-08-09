import React, { useState } from 'react'
import toast from 'react-hot-toast';
import SummaryApi from '../common/SummaryApi';
import Axios from '../utils/Axios';
import AxiosTostError from '../utils/AxiosTostError';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    email: "",
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }
  // check if all values are filled
  const valideValue = Object.values(data).every((item) => item)
  // request to server
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!valideValue) {
      toast.error("Please fill all the fields")
    }
    try {
      const response = await Axios({
        ...SummaryApi.forgetPassword,
        data: data
      })
      if(response.data.error) {
        toast.error(response.data.massage)
      }
      if(response.data.succsess) {
        toast.success(response.data.message)
        navigate("/verify-otp", {state: {email: data.email}})
        setData({
          email: "",
        })
      }
    } catch (error) {
      AxiosTostError(error)
    }
  }

  return (
    <section className='w-full container mx-auto px-2'>
      <div className='my-4 bg-white w-full max-w-lg mx-auto rounded p-7'>
        <p className='font-semibold text-lg'>Forgot Password</p>
        <form className='grid gap-4 mt-6' onSubmit={handleSubmit}>
          <div className='grid gap-1'>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className='border p-1 rounded bg-blue-50 outline-none focus:border-primary-200'
              value={data.email}
              onChange={handleChange}
              placeholder='Enter your email'
            />
          </div>
          <button
            disabled={!valideValue}
            className={`${valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"} 
                                        text-white p-2 rounded font-semibold my-3`}
          >
            Send Otp
          </button>
        </form>
        <p className='text-center font-semibold '>
        Already have an account?   
          <Link to="/login" className='text-green-800 hover:text-green-700'> Login</Link>
        </p>
      </div>
    </section>
  )
}

export default ForgotPassword