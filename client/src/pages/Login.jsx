import React, { useContext, useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import SummaryApi from '../common/SummaryApi';
import Axios from '../utils/Axios';
import AxiosTostError from '../utils/AxiosTostError';
import { Link, useNavigate } from 'react-router-dom';
import fetchUserDitails from '../utils/fetchUserDitails';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';
import Context from '../context';

const Login = () => {
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const { fetchCartItems } = useContext(Context)
  const navigate = useNavigate()
  const [data, setData] = useState({
    email: "",
    password: "",
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
  const valideValue = Object.values(data).every((item) => item.length > 0)
  // request to server
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!valideValue) {
      toast.error("Please fill all the fields")
    }
    try {
      const response = await Axios({
        ...SummaryApi.login,
        data: data
      })
      if(response.data.error) {
        toast.error(response.data.massage)
      }
      if(response.data.succsess) {
        toast.success(response.data.message)
        localStorage.setItem("accessToken", response.data.data.accessToken)
        localStorage.setItem("refreshToken", response.data.data.refreshToken)
        const userDetails = await fetchUserDitails()
        dispatch(setUserDetails(userDetails.data))
        setData({
          email: "",
          password: "",
        })
        navigate("/")
        fetchCartItems()
      }
    } catch (error) {
      AxiosTostError(error)
    }
  }

  return (
    <section className='w-full container mx-auto px-2'>
      <div className='my-4 bg-white w-full max-w-lg mx-auto rounded p-7'>
        <p>Welcom to ATB-market</p>
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
          <div className='grid gap-1'>
            <label htmlFor="password">Password</label>
            <div className='border p-1 rounded bg-blue-50 flex items-center focus-within:border-primary-200'>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                className='w-full outline-none bg-blue-50'
                value={data.password}
                onChange={handleChange}
                placeholder='Enter your password'
              />
              <div className='cursor-pointer'>
                {
                  showPassword ? (
                    <FaRegEyeSlash onClick={() => setShowPassword(false)} />
                  ) : (
                    <FaRegEye onClick={() => setShowPassword(true)} />
                  )
                }
              </div>
            </div>
            <Link to={"/forgot-password"} className='text-green-800 hover:text-green-700 ml-auto'>
              Forgot password?
            </Link>
          </div>
          <button
            disabled={!valideValue}
            className={`${valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"} 
                                        text-white p-2 rounded font-semibold my-3`}
          >
            Login
          </button>
        </form>
        <p className='text-center font-semibold '>
          Don't have account?   
          <Link to="/register" className='text-green-800 hover:text-green-700'> Register</Link>
        </p>
      </div>
    </section>
  )
}

export default Login