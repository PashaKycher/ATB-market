import React from 'react'
import UserMenu from '../components/UserMenu'
import { IoClose } from "react-icons/io5";

const UserMenuMobilePages = () => {
    return (
        <section className='bg-white h-full w-full py-2'>
            <button 
                onClick={() => { window.history.back() }} 
                className='block w-fit ml-auto mr-2 p-2 bg-white rounded-full shadow-md'
            >
                <IoClose size={20} />
            </button>
            <div className='container mx-auto px-3 pb-8'>
                <UserMenu />
            </div>
        </section>
    )
}

export default UserMenuMobilePages