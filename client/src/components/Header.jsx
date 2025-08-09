import React, { useContext, useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import Search from './Search'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaRegCircleUser } from "react-icons/fa6";
import useMobile from '../hooks/useMobile';
import { BsCart4 } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { GoTriangleDown } from "react-icons/go";
import { GoTriangleUp } from "react-icons/go";
import UserMenu from './UserMenu';
import DisplayPrice from '../utils/DislayPrice';
import Context from '../context';
import DisplayCartItem from './DisplayCartItem';

const Header = () => {
    const user = useSelector(state => state?.user);
    const { totalPrice, totalQuantity } = useContext(Context);
    const cartItem = useSelector(state => state.cartItem.cart);
    const navigate = useNavigate();
    const [isMobile] = useMobile();
    // location show in the url
    const location = useLocation();
    const [isSearchPage, setIsSearchPage] = useState(false);
    const [openUserMenu, setOpenUserMenu] = useState(false);
    const [openCartMenu, setOpenCartMenu] = useState(false);
    useEffect(() => {
        const isSearch = location.pathname === '/search';
        setIsSearchPage(isSearch);
    }, [location]);
    const redirectToLoginPage = () => {
        navigate('/login');
    }
    const handleMobileUser = () => {
        if (!user?._id) {
            navigate('/login');
            return
        }
        if (user?._id) {
            navigate('/user-menu-mobile')
        } else {
            navigate('/')
        }
    }

    return (
        <>
            <header className='md:h-20 md:shadow-md sticky top-0 z-40  py-2 bg-white'>
                {/* logo and search and login */}
                {
                    !(isMobile && isSearchPage) && (
                        <div className='container mx-auto items-center h-16 flex justify-between px-2'>
                            {/* logo */}
                            <Link to={'/'}>
                                <img src={logo} alt="logo" className='h-14 mix-blend-multiply' />
                            </Link>
                            {/* search */}
                            <div className='hidden md:block'>
                                <Search />
                            </div>
                            {/* login and cart */}
                            <div>
                                {/* mobail login */}
                                <button className='text-neutral-500 mt-4 md:mt-0 lg:hidden'
                                    onClick={handleMobileUser}>
                                    <FaRegCircleUser size={26} />
                                </button>
                                {/* disktop login and cart */}
                                <div className='hidden lg:flex items-center gap-10'>
                                    {/* login and logout and menu */}
                                    {
                                        user?._id ? (
                                            <div className='relative'>
                                                <div
                                                    className='flex items-center gap-1 cursor-pointer select-none'
                                                    onClick={() => setOpenUserMenu(!openUserMenu)}
                                                >
                                                    <p>Account</p>
                                                    {
                                                        !openUserMenu ? (
                                                            <GoTriangleDown size={25} />
                                                        ) : (
                                                            <GoTriangleUp size={25} />
                                                        )
                                                    }
                                                </div>
                                                {openUserMenu &&
                                                    <div className='absolute right-0 top-12'>
                                                        <div className='bg-white rounded p-4 min-w-52 lg:shadow-lg'>
                                                            <UserMenu closeMenu={() => setOpenUserMenu(false)} />
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        ) : (
                                            <button onClick={redirectToLoginPage}
                                                className='text-lg font-semibold'>
                                                Login
                                            </button>
                                        )
                                    }
                                    {/* cart */}
                                    <button
                                        onClick={() => setOpenCartMenu(!openCartMenu)}
                                        className='flex items-center gap-2 bg-green-700 p-2 rounded text-white
                                                        hover:bg-green-600'>
                                        {/* cart icon */}
                                        <div className='animate-bounce'>
                                            <BsCart4 size={26} />
                                        </div>
                                        {/* items and total price */}
                                        <div className='text-sm font-semibold'>
                                            {
                                                cartItem[0] ? (
                                                    <div>
                                                        <p>{totalQuantity} Items</p>
                                                        <p>{DisplayPrice(totalPrice)}</p>
                                                    </div>
                                                ) : (
                                                    <div className='font-semibold'>
                                                        <p>My Cart</p>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }
                <div className='container mx-auto md:hidden px-2 my-2 h-16'>
                    <Search />
                </div>
                {
                    openCartMenu && (
                        <DisplayCartItem close={() => setOpenCartMenu(false)} />
                    )
                }
            </header>
        </>
    )
}

export default Header