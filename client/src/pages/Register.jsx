import React, { useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import SummaryApi from '../common/SummaryApi';
import Axios from '../utils/Axios';
import AxiosTostError from '../utils/AxiosTostError';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConform, setShowPasswordConform] = useState(false)
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    conformPassword: ""
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
    if (data.password !== data.conformPassword) {
      toast.error("Password does not match")
      return
    }
    if (!valideValue) {
      toast.error("Please fill all the fields")
    }
    try {
      const response = await Axios({
        ...SummaryApi.register,
        data: data
      })
      if(response.data.error) {
        toast.error(response.data.massage)
      }
      if(response.data.succsess) {
        toast.success(response.data.message)
        setData({
          name: "",
          email: "",
          password: "",
          conformPassword: ""
        })
        navigate("/login")
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
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              autoFocus
              className='border p-1 rounded bg-blue-50 outline-none focus:border-primary-200'
              value={data.name}
              onChange={handleChange}
              placeholder='Enter your name'
            />
          </div>
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
          </div>
          <div className='grid gap-1'>
            <label htmlFor="conformPassword">Conform Password</label>
            <div className='border p-1 rounded bg-blue-50 flex items-center focus-within:border-primary-200'>
              <input
                type={showPasswordConform ? "text" : "password"}
                name="conformPassword"
                id="conformPassword"
                className='w-full outline-none bg-blue-50'
                value={data.conformPassword}
                onChange={handleChange}
                placeholder='Enter your conform password'
              />
              <div className='cursor-pointer'>
                {
                  showPasswordConform ? (
                    <FaRegEyeSlash onClick={() => setShowPasswordConform(false)} />
                  ) : (
                    <FaRegEye onClick={() => setShowPasswordConform(true)} />
                  )
                }
              </div>
            </div>
          </div>
          <button
            disabled={!valideValue}
            className={`${valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"} 
                                        text-white p-2 rounded font-semibold my-3`}
          >
            Register
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

export default Register