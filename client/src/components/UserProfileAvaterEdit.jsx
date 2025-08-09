import React, { useState } from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosTostError from '../utils/AxiosTostError';
import { updateAvatar } from '../store/userSlice';
import { IoClose } from "react-icons/io5";

const UserProfileAvaterEdit = ({close}) => {
    const user = useSelector(state => state?.user);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const hendleAploadAvatar = async (e) => {
        const file = e.target.files[0];
        if (!file) { return; }
        setLoading(true);
        const formData = new FormData();
        formData.append("avatar", file);
        try {
            const response = await Axios({
                ...SummaryApi.uploadAvatar,
                data: formData
            })
            const { data: responseData } = response;
            dispatch(updateAvatar(responseData.data.avatar));
        } catch (error) {
            AxiosTostError(error)
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className='fixed top-0 left-0 right-0 bottom-0 bg-neutral-900 
                        bg-opacity-60 p-4 flex items-center justify-center'>
            <div className='bg-white max-w-sm w-full p-4 rounded flex flex-col
                                items-center justify-center'
            >
                <button onClick={close} className='text-neutral-800 w-fit block ml-auto'>
                    <IoClose size={20} />
                </button>
                <div className='w-24 h-24 flex items-center justify-center rounded-full overflow-hidden drop-shadow-md'>
                    {
                        user?.avatar ?
                            (<img className='w-full h-full' src={user?.avatar} alt={user?.name} />)
                            :
                            (<FaRegUserCircle size={60} />)
                    }
                </div>
                <form onSubmit={(e) => { e.preventDefault() }}>
                    <label htmlFor="uploadProfile">
                        <div className='border border-primary-200 hover:bg-primary-200 cursor-pointer
                                            hover:text-white px-4 py-1 rounded text-sm my-3'
                        >
                            {
                                loading ? "Loading..." : "Upload"
                            }
                        </div>
                    </label>
                    <input type="file" id='uploadProfile' className='hidden' onChange={hendleAploadAvatar} />
                </form>
            </div>
        </section>
    )
}

export default UserProfileAvaterEdit