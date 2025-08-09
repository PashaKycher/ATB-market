import React, { useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import useMobile from '../hooks/useMobile';
import { FaArrowLeft } from "react-icons/fa";

const Search = () => {
    const [isMobile] = useMobile();
    // location show in the url
    const location = useLocation();
    const [isSearchPage, setIsSearchPage] = useState(false);
    const params = useLocation()
    const searchText = params.search.slice(3)
    useEffect(() => {
        const isSearch = location.pathname === '/search';
        setIsSearchPage(isSearch);
    }, [location])
    const navigate = useNavigate();
    const redirectToSearchPage = () => {
        navigate('/search');
    }
    const handleOnChange = (e) => {
        const { value } = e.target
        const url = `/search?q=${value}`
        navigate(url);
    }

    return (
        <div className='w-full min-w-[300px] lg:min-w-[420px] h-14 rounded-lg border 
                text-neutral-500 overflow-hidden flex items-center bg-slate-50 group
                focus-within:border-primary-200'>
            {
                !(isSearchPage && isMobile) ? (
                    <button onClick={redirectToSearchPage}
                        className='p-3 h-full flex items-center justify-center group-focus-within:text-primary-200'>
                        <IoSearch size={22} />
                    </button>
                ) : (
                    <Link to={'/'}
                        className='p-2 m-1 flex items-center justify-center group-focus-within:text-primary-200
                                    bg-white rounded-full shadow-md'>
                        <FaArrowLeft size={22} />
                    </Link>
                )
            }
            <div className='w-full' onClick={redirectToSearchPage}>
                {
                    !isSearchPage ? (
                        <div>
                            <TypeAnimation
                                sequence={[
                                    // Same substring at the start will only be typed out once, initially
                                    'Search "milk"',
                                    1000, // wait 1s before replacing "milk" with "bread"
                                    'Search "bread"',
                                    1000,
                                    'Search "sugar"',
                                    1000,
                                    'Search "panner"',
                                    1000,
                                    'Search "chocolate"',
                                    1000,
                                    'Search "curd"',
                                    1000,
                                    'Search "rice"',
                                    1000,
                                    'Search "egg"',
                                    1000,
                                    'Search "chips"',
                                    1000
                                ]}
                                wrapper="span"
                                speed={50}
                                repeat={Infinity}
                            />
                        </div>
                    ) : (
                        <div className='w-full'>
                            <input
                                type="text"
                                placeholder='Search for products, brands and more'
                                defaultValue={searchText}
                                autoFocus
                                className='w-full h-full outline-none border-none bg-transparent'
                                onChange={handleOnChange}
                            />
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Search