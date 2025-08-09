import React, { useContext, useState } from 'react'
import DisplayPrice from '../utils/DislayPrice'
import Context from '../context';
import AddAddress from '../components/AddAddress';
import { useSelector } from 'react-redux';
import DeleteAddress from '../components/DeleteAddress';
import AxiosTostError from '../utils/AxiosTostError';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js'

const CheckoutPage = () => {
    const [deleteAddress, setDeleteAddress] = useState(false);
    const [addressId, setAddressId] = useState('');
    const [selectAdderss, setSelectAddress] = useState(0)
    const { totalPrice, totalQuantity, totalPriceNoDis, fetchCartItems, fetchOrder } = useContext(Context);
    const savings = (totalPriceNoDis - totalPrice).toFixed(2)
    const [openAddAddress, setOpenAddAddress] = useState(false);
    const addressList = useSelector(state => state.address.addressList);
    const list_items = useSelector(state => state.cartItem.cart);
    const totalAmt = totalPrice;
    const sudTotalAmt = (totalPrice - savings).toFixed(2);
    const delivery_address = addressList[selectAdderss]?._id;
    const navigate = useNavigate();
    const hendleCashOnDelivery = async() => {
        try {
            const response = await Axios({
                ...SummaryApi.cashOnDelivery,
                data: {
                    list_items, 
                    totalAmt: totalAmt, 
                    delivery_address, 
                    sudTotalAmt: sudTotalAmt,
                }
            })
            const {data: responseData} = response;
            if(responseData.succsess){
                toast.success(responseData.message)
                fetchCartItems()
                fetchOrder()
                navigate('/order-success', {state: {text: "Order"}})
            }
        } catch (error) {
            AxiosTostError(error)
        }
    }
    const hendleOnlinePayment = async() => {
        try {
            toast.loading("Redirecting to payment page...")
            const stripeKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY
            const stripePromise = await loadStripe(stripeKey)
            const response = await Axios({
                ...SummaryApi.onlinePayment,
                data: {
                    list_items, 
                    totalAmt: totalAmt, 
                    delivery_address, 
                    sudTotalAmt: sudTotalAmt,
                }
            })
            const {data: responseData} = response;
            stripePromise.redirectToCheckout({sessionId: responseData.id})
            if(responseData.succsess){
                toast.success(responseData.message)
                fetchCartItems()
                fetchOrder()
                navigate('/order-success', {state: {text: "Order"}})
            }
        } catch (error) {
            AxiosTostError(error)
            console.log(error);
        }
    }

    return (
        <section className='bg-white'>
            <div className='container mx-auto p-4 flex flex-col lg:flex-row w-full gap-5 justify-between'>
                <div className='w-full max-w-2xl py-4 px-2'>
                    {/* address */}
                    <h3 className='text-lg font-semibold'>Choose your address</h3>
                    <div className='grid gap-3'>
                        {
                            addressList[0] && addressList.map((address, index) => {
                                return (
                                    <div key={index + address._id + "89"} 
                                        className='bg-blue-50 p-4 border shadow-md hover:bg-blue-100'>
                                        <label htmlFor={"address" + index} className='md:flex gap-6'>
                                            <div className='flex items-center'>
                                                <input
                                                    type='radio'
                                                    value={index}
                                                    name='address'
                                                    id={"address" + index}
                                                    onChange={(e) => setSelectAddress(e.target.value)} />
                                            </div>
                                            <div className='md:flex justify-between gap-3'>
                                                <div>
                                                    <p className='text-sm text-neutral-600'>
                                                        <span className='font-semibold text-neutral-950'>Country: </span>
                                                        {address.country}
                                                    </p>
                                                    <p className='text-sm text-neutral-600'>
                                                        <span className='font-semibold text-neutral-950'>State: </span>
                                                        {address.state}
                                                    </p>
                                                    <p className='text-sm text-neutral-600'>
                                                        <span className='font-semibold text-neutral-950'>City: </span>
                                                        {address.city}
                                                    </p>
                                                    <p className='text-sm text-neutral-600'>
                                                        <span className='font-semibold text-neutral-950'>Pincode: </span>
                                                        {address.pincode}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className='text-sm text-neutral-600'>
                                                        <span className='font-semibold text-neutral-950'>Street: </span>
                                                        {address.street}
                                                    </p>
                                                    <p className='text-sm text-neutral-600'>
                                                        <span className='font-semibold text-neutral-950'>Bilding: </span>
                                                        {address.bilding}
                                                    </p>
                                                    <p className='text-sm text-neutral-600'>
                                                        <span className='font-semibold text-neutral-950'>Address line: </span>
                                                        {address.address_line}
                                                    </p>
                                                    <p className='text-sm text-neutral-600'>
                                                        <span className='font-semibold text-neutral-950'>Mobile: </span>
                                                        {address.mobile}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='flex items-center ml-auto mt-6'>
                                                <button className='py-1 px-2 bg-red-500 hover:bg-red-600 text-white 
                                                                text-xs rounded-md'
                                                    onClick={() => {
                                                        setDeleteAddress(true)
                                                        setAddressId(address._id)
                                                    }}>
                                                    Delete
                                                </button>
                                            </div>
                                        </label>
                                    </div>
                                )
                            })
                        }
                        <div className='h-16 bg-blue-50 border-2 border-dashed flex items-center justify-center 
                                        cursor-pointer shadow-md'
                            onClick={() => setOpenAddAddress(true)}>
                            Add Address
                        </div>
                    </div>
                </div>
                <div className='w-full max-w-md py-4 px-2'>
                    {/* sammary */}
                    <h3 className='text-lg font-semibold'>Summary</h3>
                    <div className='bg-blue-50 p-4'>
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
                    <div className='w-full max-w-sm flex flex-col gap-4 mx-auto mt-4'>
                        <button 
                            onClick={hendleOnlinePayment}
                            className='py-2 px-4 bg-green-700 hover:bg-green-600 text-white font-semibold rounded-md'>
                            Online Payment
                        </button>
                        <button 
                            onClick={hendleCashOnDelivery}
                            className='py-2 px-4 bg-green-700 hover:bg-green-600 text-white font-semibold rounded-md'>
                            Cash on delivery
                        </button>
                    </div>
                </div>
            </div>
            {
                openAddAddress && (
                    <AddAddress close={() => setOpenAddAddress(false)} />
                )
            }
            {
                deleteAddress && (
                    <DeleteAddress
                        _id={addressId}
                        close={() => { setDeleteAddress(false) }}
                    />
                )
            }
        </section >
    )
}

export default CheckoutPage