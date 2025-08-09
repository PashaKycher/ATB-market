import React, { useEffect, useState } from 'react'
import DisplayPrice from '../utils/DislayPrice';
import { Link } from 'react-router-dom';
import valideURLConverd from '../utils/valideURLConverd';
import AddToCartButton from './AddToCartButton';

const CartProduct = ({ data }) => {
    // rander left time for product
    const getRandomMinutes = () => Math.floor(Math.random() * 6) + 10;
    const [timeLeft, setTimeLeft] = useState(() => {
        const minutes = getRandomMinutes()
        return minutes * 60
    });
    useEffect(() => {
        if (timeLeft <= 0) return;
        const interval = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timeLeft]);
    const fotmatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? `0` : ''}${seconds}`
    }
    const url = `/product/${valideURLConverd(data.name)}-${data._id}`

    return (
        <Link to={url} className='mx-auto border p-4 grid gap-3 max-w-56 min-w-48 rounded bg-white'>
            <div className='min-h-20 max-h-32 rounded'>
                <img
                    src={data?.image[0]}
                    alt={data?.name}
                    className='w-full h-full object-scale-down lg:scale-125 mix-blend-multiply'
                />
            </div>
            <div className='mt-2 px-2 rounded-md text-sm w-fit p-1 text-green-600 bg-green-100'>
                {fotmatTime(timeLeft)}
            </div>
            <div className='font-medium text-ellipsis line-clamp-2 h-12'>
                {data.name}
            </div>
            {
                data.discount ?
                    <div className='flex items-center justify-between gap-3'>
                        <p className='line-through text-xs lg:text-sm text-slate-400'>{DisplayPrice(data.price)}</p>
                        <p className='text-green-600 font-semibold lg:text-xl'>
                            {DisplayPrice((data.price - (data.price * data.discount / 100)).toFixed(2))}
                        </p>
                    </div>
                    :
                    <p className='font-semibold text-xl'>{DisplayPrice(data.price)}</p>
            }
            {/*  */}
            <div className='flex items-center justify-between gap-3'>
                <div className='w-fit text-ellipsis line-clamp-1'>
                    {data.unit}
                </div>
                {
                    (data.stock > 0) ? (
                        <AddToCartButton data={data} />
                    ) : (
                        <p className='bg-red-500 text-white px-3 py-1 rounded cursor-pointer'>Out</p>
                    )
                }
            </div>
        </Link>
    )
}

export default CartProduct