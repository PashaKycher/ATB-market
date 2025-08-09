import React, { useEffect, useState } from 'react'
import AxiosTostError from '../utils/AxiosTostError';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import Context from '../context';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { FaMinus, FaPlus } from 'react-icons/fa6';

const AddToCartButton = ({ data }) => {
    const cartItems = useSelector((state) => state.cartItem.cart);
    const { fetchCartItems, deleteItem, updateQty } = useContext(Context);
    const [loading, setLoading] = useState(false);
    const [isAvailable, setIsAvailable] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const [cartItemsDetails, setCartItemsDetails] = useState();
    const handleAddToCart = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.addToCart,
                data: { productId: data?._id }
            })
            if (response.data.error) {
                toast.error(response.data.massage)
            }
            if (response.data.succsess) {
                toast.success(response.data.message)
            }
            fetchCartItems()
        } catch (error) {
            AxiosTostError(error)
        } finally {
            setLoading(false)
        }
    }
    // check if the product is already in the cart
    useEffect(() => {
        const checkingiitem = cartItems.some(item => item.productId._id === data?._id)
        setIsAvailable(checkingiitem)
        const product = cartItems.find(item => item.productId._id === data?._id)
        setQuantity(checkingiitem ? product.quantity : 0)
        setCartItemsDetails(product)
    }, [data, cartItems])
    const increaseQuantity = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        updateQty(cartItemsDetails._id, quantity + 1)
    }
    const decreaseQuantity = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (quantity === 1) {
            deleteItem(cartItemsDetails._id)
        } else {
            updateQty(cartItemsDetails._id, quantity - 1)
        }
    }

    return (
        <div>
            {
                isAvailable ? (
                    <div className='flex items-center'>
                        <button
                            onClick={decreaseQuantity}
                            className='bg-green-700 hover:bg-green-600 text-white p-2 rounded cursor-pointer'>
                            <FaMinus />
                        </button>
                        <p className='px-3'>{quantity}</p>
                        <button
                            onClick={increaseQuantity}
                            className='bg-green-700 hover:bg-green-600 text-white p-2 rounded cursor-pointer'>
                            <FaPlus />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={handleAddToCart}
                        className='bg-green-700 text-white px-3 py-1 rounded hover:bg-green-600 cursor-pointer'>
                        {
                            loading ? "Adding..." : "Add"
                        }
                    </button>
                )
            }
        </div>
    )
}

export default AddToCartButton