import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Divider from './Divider';
import Axios from '../utils/Axios';
import AxiosTostError from '../utils/AxiosTostError';
import SummaryApi from '../common/SummaryApi';
import { logout } from '../store/userSlice'
import { toast } from 'react-hot-toast';
import { FaExternalLinkAlt } from "react-icons/fa";
import { hendleAddToCartStore } from '../store/cartProductSlice';

const UserMenu = ({ closeMenu }) => {
    const user = useSelector(state => state?.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.userLogout
            })
            if (response.data.succsess) {
                if (closeMenu) {
                    closeMenu();
                }
                dispatch(logout()); 
                localStorage.clear();
                dispatch(hendleAddToCartStore([]))
                toast.success(response.data.message);
                navigate("/");
            }
        } catch (error) {
            AxiosTostError(error)
        }
    }
    return (
        <div onClick={closeMenu}>
            <div className='fond-semibold'>My Account</div>
            <div className='text-sm flex items-center gap-2'>
                <span className='max-w-52 text-ellipsis line-clamp-1'>
                    {user?.name || user?.mobile}
                    <span className='text-red-700 font-medium'>
                        {user?.role === "ADMIN" ? " (Admin)" : ""}
                    </span>
                </span>
                <Link to={"/dashboard/profile"} className='hover:text-primary-200'>
                    <FaExternalLinkAlt size={12} />
                </Link>
            </div>
            <Divider />
            <div className='text-sm grid gap-1'>
                {
                    user?.role === "ADMIN" ? (
                        <>
                            <Link to={"/dashboard/category"} className='px-2 hover:bg-orange-200 rounded py-1'>
                                Category
                            </Link>
                            <Link to={"/dashboard/sub-category"} className='px-2 hover:bg-orange-200 rounded py-1'>
                                Sub Category
                            </Link>
                            <Link to={"/dashboard/upload-product"} className='px-2 hover:bg-orange-200 rounded py-1'>
                                Upload Product
                            </Link>
                            <Link to={"/dashboard/product"} className='px-2 hover:bg-orange-200 rounded py-1'>
                                Product
                            </Link>
                            <Link to={"/dashboard/my-orders"} className='px-2 hover:bg-orange-200 rounded py-1'>
                                My Orders
                            </Link>
                            <Link to={"/dashboard/save-address"} className='px-2 hover:bg-orange-200 rounded py-1'>
                                Save Address
                            </Link>
                            <button
                                onClick={handleLogout}
                                className='text-left px-2 hover:text-red-600 hover:bg-orange-200 rounded py-1'
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to={"/dashboard/my-orders"} className='px-2 hover:bg-orange-200 rounded py-1'>
                                My Orders
                            </Link>
                            <Link to={"/dashboard/save-address"} className='px-2 hover:bg-orange-200 rounded py-1'>
                                Save Address
                            </Link>
                            <button
                                onClick={handleLogout}
                                className='text-left px-2 hover:text-red-600 hover:bg-orange-200 rounded py-1'
                            >
                                Logout
                            </button>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default UserMenu