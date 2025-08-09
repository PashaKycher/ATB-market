import React from 'react'
import { useSelector } from 'react-redux'

const AdminPermision = ({ children }) => {
    const user = useSelector(state => state?.user);

    return (
        <>
            {
                user?.role === "ADMIN" ? children : <p className='text-red-600 p-4 bg-red-100'>Do not have permission</p>
            }
        </>
    )
}

export default AdminPermision