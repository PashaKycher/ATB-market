import React, { useContext } from 'react'
import DisplayPrice from '../utils/DislayPrice';
import { FaCartShopping } from "react-icons/fa6";
import Context from '../context';
import { Link } from 'react-router-dom';
import { FaCaretRight } from "react-icons/fa";
import { useSelector } from 'react-redux';

const CartMobileLink = () => {
    const { totalPrice, totalQuantity } = useContext(Context);
    const cartItom = useSelector(state => state.cartItem.cart)

    return (
        <>
            {
                cartItom[0] && (
                    <div className='p-2 sticky bottom-4'>
                        <div className='bg-green-700 px-2 py-1 rounded text-neutral-100 flex justify-between text-sm lg:hidden'>
                            <div className='flex gap-2 items-center'>
                                <div className='p-2 bg-green-600 rounded w-fit'>
                                    <FaCartShopping />
                                </div>
                                <div className='text-xs'>
                                    <p>{totalQuantity} Items</p>
                                    <p>{DisplayPrice(totalPrice)}</p>
                                </div>
                            </div>
                            <Link to={'/cart'} className='flex items-center gap-2 bg-green-600 rounded p-1 px-2'>
                                <span className='text-sm'>View Cart</span>
                                <FaCaretRight />
                            </Link>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default CartMobileLink