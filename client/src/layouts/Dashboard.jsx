import React from 'react'
import UserMenu from '../components/UserMenu'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
    return (
        <section className='bg-white'>
            <div className='container mx-auto p-3 grid md:grid-cols-[250px,1fr] '>
                {/* left side for menu */}
                <div className='py-4 sticky top-24 max-h-[calc(100vh-160px)] overflow-auto hidden md:block border-r'>
                    <UserMenu />
                </div>
                {/* right side for content */}
                <div className='bg-white min-h-[76vh]'>
                    <Outlet />
                </div>
            </div>
        </section>
    )
}

export default Dashboard