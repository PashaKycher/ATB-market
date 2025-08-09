import React, { useContext } from 'react'
import { IoMdClose } from "react-icons/io";
import { Link } from 'react-router-dom';
import Context from '../context';
import DisplayPrice from '../utils/DislayPrice';
import { FaCaretRight } from "react-icons/fa";
import AddToCartButton from './AddToCartButton';
import { useSelector } from 'react-redux'; 
import imageEmpty from '../assets/empty_cart.webp'

const DisplayCartItem = ({ close }) => {
    const { totalPrice, totalQuantity, totalPriceNoDis } = useContext(Context);
    const savings = (totalPriceNoDis - totalPrice).toFixed(2)
    const cartItem = useSelector(state => state.cartItem.cart)

    return (
        <section className='fixed top-0 right-0 left-0 bottom-0 bg-neutral-800 bg-opacity-65 flex z-50'>
            <div className='bg-blue-50 max-w-sm w-full p-4 min-h-screen max-h-screen ml-auto'>
                <div className='flex justify-between border-b border-neutral-500'>
                    <h2 className='font-semibold pb-2'>Cart</h2>
                    <Link to={'/'} className='hover:text-red-700 pb-2 lg:hidden'>
                        <IoMdClose size={20} />
                    </Link>
                    <button onClick={close} className='hover:text-red-700 pb-2 hidden lg:block'>
                        <IoMdClose size={20} />
                    </button>
                </div>
                <div className='min-h-[80vh] max-h-[calc(100vh-120px)] h-full flex flex-col gap-4'>
                    {/* display items */}
                    {
                        cartItem[0] ? (
                            <>
                                <div className='flex items-center bg-blue-100 text-blue-500 gap-3 rounded-full px-4 py-2 justify-between'>
                                    <p>Your total savings:</p>
                                    <p>{DisplayPrice(savings)}</p>
                                </div>
                                <div className='p-2 grid gap-2 overflow-y-auto'>
                                    {
                                        cartItem[0] && (
                                            cartItem.map((item, index) => {
                                                return (
                                                    <div key={index + 1 + item._id} className='bg-white rounded-lg p-2 flex w-full gap-2'>
                                                        <div className='w-16 h-16 min-w-16 min-h-16 border rounded'>
                                                            <img
                                                                src={item?.productId?.image[0]}
                                                                alt={item.name}
                                                                className='w-full h-full'
                                                            />
                                                        </div>
                                                        <div className='w-full max-w-sm'>
                                                            <p className='text-xs text-ellipsis line-clamp-2'>
                                                                {item?.productId?.name}
                                                            </p>
                                                            <p className='text-slate-400 mt-1 text-xs rounded-full
                                                                 text-ellipsis line-clamp-1'>
                                                                {item?.productId?.unit}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <AddToCartButton data={item?.productId} />
                                                            {
                                                                item?.productId?.discount ?
                                                                    <p className='font-semibold text-green-600 m-auto w-fit pt-1'>
                                                                        {DisplayPrice((item?.productId?.price - (item?.productId?.price * item?.productId?.discount / 100)).toFixed(2))}
                                                                    </p> :
                                                                    <p className='font-semibold m-auto w-fit pt-1'>
                                                                        {DisplayPrice(item?.productId?.price)}
                                                                    </p>
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        )
                                    }
                                </div>
                                <div className='bg-white p-4'>
                                    <h3 className='font-semibold'>Bill details</h3>
                                    <div>
                                        <p>Quntity total: {totalQuantity} items</p>
                                        <p className='line-through text-neutral-400'>
                                            Total price: {DisplayPrice(totalPriceNoDis)}
                                        </p>
                                        <p className='text-green-500'>
                                            Current price: {DisplayPrice(totalPrice)}
                                        </p>
                                        <p className='font-semibold text-green-500'>
                                            Savings: {DisplayPrice(savings)}
                                        </p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className='bg-white flex flex-col justify-center items-center'>
                                <img
                                    src={imageEmpty}
                                    alt='empty cart'
                                    className='w-full h-full object-scale-down'
                                />
                                <div className='p-4'>
                                    <Link to={'/'} onClick={close}
                                        className='bg-green-700 text-neutral-100 py-2 px-4 rounded hover:bg-green-600'>
                                        Shop Now
                                    </Link>
                                </div>
                            </div>
                        )
                    }
                </div>
                {
                    cartItem[0] && (
                        <div className='py-2'>
                            <div className='bg-green-700 text-neutral-100 p-2 sticky rounded bottom-3
                                    flex gap-4 justify-between'>
                                <div className='p-1 px-2'>
                                    {DisplayPrice(totalPrice)}
                                </div>
                                <Link to={'/checkout'} onClick={close} 
                                className='flex items-center gap-1 hover:bg-green-600 rounded p-1 px-2'>
                                    Procced
                                    <span><FaCaretRight /></span>
                                </Link>
                            </div>
                        </div>
                    )
                }

            </div>
        </section>
    )
}

export default DisplayCartItem