import React, { useEffect, useState } from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import UserProfileAvaterEdit from '../components/UserProfileAvaterEdit';
import AxiosTostError from '../utils/AxiosTostError';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import { setUserDetails } from '../store/userSlice';
import fetchUserDitails from '../utils/fetchUserDitails';

const Profile = () => {
    const user = useSelector(state => state?.user);
    const [openProfileAvaterEdit, setOpenProfileAvaterEdit] = useState(false);
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({
        name: user?.name,
        mobile: user?.mobile,
        email: user?.email,
    })
    useEffect(() => {
        setUserData({
            name: user?.name,
            mobile: user?.mobile,
            email: user?.email,
        })
    }, [user])
    const hendleOnChange = (e) => {
        const { name, value } = e.target;
        setUserData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.updateUser,
                data: userData
            })
            const { data: responseData } = response;
            if (responseData.succsess) {
                setLoading(false)
                toast.success(responseData.message)
                const userData = await fetchUserDitails();
                dispatch(setUserDetails(userData.data));
            }
        } catch (error) {
            AxiosTostError(error)
        } finally { setLoading(false) }
    }

    return (
        <div className='p-4'>
            {/* profile avater */}
            <div className='w-20 h-20 flex items-center justify-center rounded-full overflow-hidden drop-shadow-md'>
                {
                    user?.avatar ?
                        (<img className='w-full h-full' src={user?.avatar} alt={user?.name} />)
                        :
                        (<FaRegUserCircle size={60} />)
                }
            </div>
            <button className='text-xs min-w-20 border p-1 mt-2 rounded-full border-primary-100 
                            hover:border-primary-200 hover:bg-primary-200'
                onClick={() => { setOpenProfileAvaterEdit(!openProfileAvaterEdit) }}
            >
                Edit
            </button>
            {
                openProfileAvaterEdit && (
                    <UserProfileAvaterEdit close={() => { setOpenProfileAvaterEdit(!openProfileAvaterEdit) }} />
                )
            }
            {/* user profile ditails */}
            <form className='my-4 grid gap-4' onSubmit={handleSubmit}>
                <div className='grid'>
                    <label htmlFor='name'>Name</label>
                    <input
                        type="text"
                        name='name'
                        id='name'
                        placeholder='Enter your name'
                        className='p-2 bg-blue-50 border focus-within:border-primary-200 outline-none rounded'
                        value={userData.name}
                        onChange={hendleOnChange}
                        required
                    />
                </div>
                <div className='grid'>
                    <label htmlFor='email'>Email</label>
                    <input
                        type="email"
                        name='email'
                        id='email'
                        placeholder='Enter your email'
                        className='p-2 bg-blue-50 border focus-within:border-primary-200 outline-none rounded'
                        value={userData.email}
                        onChange={hendleOnChange}
                        required
                    />
                </div>
                <div className='grid'>
                    <label htmlFor='mobile'>Mobile</label>
                    <input
                        type="text"
                        name='mobile'
                        id='mobile'
                        placeholder='Enter your mobile'
                        className='p-2 bg-blue-50 border focus-within:border-primary-200 outline-none rounded'
                        value={userData.mobile}
                        onChange={hendleOnChange}
                        required
                    />
                </div>
                <button className='border px-4 py-2 font-semibold border-primary-200 hover:bg-primary-200
                                    text-primary-200 hover:text-neutral-800 rounded'
                >
                    {
                        loading ? "Loading..." : "Submit"
                    }
                </button>
            </form>
        </div>
    )
}

export default Profile