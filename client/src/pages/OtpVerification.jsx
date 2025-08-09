import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import SummaryApi from '../common/SummaryApi';
import Axios from '../utils/Axios';
import AxiosTostError from '../utils/AxiosTostError';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const OtpVerification = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [data, setData] = useState(["", "", "", "", "", ""])
    const inputRef = useRef([])
    // check if all values are filled
    const valideValue = data.every((item) => item)
    // request to server
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!valideValue) {
            toast.error("Please fill all the fields")
        }
        try {
            const response = await Axios({
                ...SummaryApi.verifyOptPassword,
                data: {
                    email: location?.state?.email,
                    otp: data.join("")
                }
            })
            if (response.data.error) {
                toast.error(response.data.massage)
            }
            if (response.data.succsess) {
                toast.success(response.data.message)
                setData(["", "", "", "", "", ""])
                navigate("/reset-password", {
                    state: {
                        response: response.data,
                        email: location?.state?.email
                    }
                })
            }
        } catch (error) {
            AxiosTostError(error)
        }
    }
    useEffect(() => {
        inputRef.current[0].focus()
        if (!location?.state?.email) {
            navigate("/forgot-password")
        }
    }, [])

    return (
        <section className='w-full container mx-auto px-2'>
            <div className='my-4 bg-white w-full max-w-lg mx-auto rounded p-7'>
                <p className='font-semibold text-lg'>Enter Otp</p>
                <form className='grid gap-4 mt-6' onSubmit={handleSubmit}>
                    <div className='grid gap-1'>
                        <label htmlFor="opt">Enter your opt</label>
                        <div className='flex justify-between items-center gap-2 mt-3'>
                            {
                                data.map((item, index) => (
                                    <input
                                        key={index + "verifyOtp"}
                                        type="text"
                                        id="otp"
                                        value={data[index]}
                                        ref={(ref) => {
                                            inputRef.current[index] = ref
                                            return ref
                                        }}
                                        onChange={(e) => {
                                            const value = e.target.value
                                            setData((preve) => {
                                                preve[index] = value
                                                return [...preve]
                                            })
                                            if (value.length > 0 && index < data.length - 1) {
                                                inputRef.current[index + 1].focus()
                                            }
                                        }}
                                        maxLength={1}
                                        className='border p-1 rounded bg-blue-50 outline-none font-semibold 
                                                    focus:border-primary-200 w-full max-w-16 text-center'
                                    />
                                ))
                            }
                        </div>
                    </div>
                    <button
                        disabled={!valideValue}
                        className={`${valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"} 
                                        text-white p-2 rounded font-semibold my-3`}
                    >
                        Verify Otp
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

export default OtpVerification