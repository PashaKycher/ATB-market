import React, { useEffect, useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import SummaryApi from '../common/SummaryApi';
import Axios from '../utils/Axios';
import AxiosTostError from '../utils/AxiosTostError';
import { useLocation, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordConform, setShowPasswordConform] = useState(false)
    useEffect(() => {
        if (!(location?.state?.response?.succsess)) {
            toast.error("Please verify your email")
            navigate("/")
        }
    }, [])
    const [data, setData] = useState({
        email: location?.state?.email,
        newPassword: "",
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
        if (!valideValue) {
            toast.error("Please fill all the fields")
        }
        if (data.newPassword !== data.conformPassword) {
            toast.error("Password does not match")
            return
        }
        try {
            const response = await Axios({
                ...SummaryApi.resetPassword,
                data: data
            })
            if (response.data.error) {
                toast.error(response.data.massage)
            }
            if (response.data.succsess) {
                toast.success(response.data.message)
                navigate("/login")
                setData({
                    email: "",
                    password: "",
                    conformPassword: ""
                })
            }
        } catch (error) {
            AxiosTostError(error)
        }
    }

    return (
        <section className='w-full container mx-auto px-2'>
            <div className='my-4 bg-white w-full max-w-lg mx-auto rounded p-7'>
                <p>Create New Password</p>
                <form className='grid gap-4 mt-6' onSubmit={handleSubmit}>
                    <div className='grid gap-1'>
                        <label htmlFor="newPassword">Password</label>
                        <div className='border p-1 rounded bg-blue-50 flex items-center focus-within:border-primary-200'>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="newPassword"
                                id="newPassword"
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
                        Create
                    </button>
                </form>
            </div>
        </section>
    )
}

export default ResetPassword