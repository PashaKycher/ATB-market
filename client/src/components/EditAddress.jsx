import React, { useContext, useEffect, useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { useForm } from "react-hook-form";
import Divider from './Divider';
import AxiosTostError from '../utils/AxiosTostError';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import Context from '../context';

const EditAddress = ({ close, _id, address }) => {
    const [dataAddress, setDataAddress] = useState({})
    const id = _id
    const { fetchAddress } = useContext(Context)
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const hendleOnSubmit = (data) => {
        setDataAddress(data)
    }
    const handleEditAddress = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.updateAddress,
                data: {
                    dataAddress,
                    addressId: id
                }
            })
            if (response.data.error) {
                toast.error(response.data.massage)
            }
            if (response.data.succsess) {
                toast.success(response.data.message)
                close()
                fetchAddress()
                reset()
            }
        } catch (error) {
            AxiosTostError(error)
        }
    }
    useEffect(() => {
        if (dataAddress.city) {
            handleEditAddress()
        }
    }, [dataAddress])
    console.log(address)

    return (
        <section>
            <div className='fixed top-0 left-0 right-0 bottom-0 bg-neutral-900 bg-opacity-60 flex items-center justify-center z-50'>
                <div className='bg-white max-w-2xl w-full p-4 rounded overflow-auto min-h-screen max-h-screen'>
                    <div className='flex justify-between border-b border-neutral-500'>
                        <h2 className='font-semibold pb-2'>Update Address</h2>
                        <button
                            onClick={close}
                            className='hover:text-red-700 pb-2'
                        >
                            <IoMdClose size={20} />
                        </button>
                    </div>
                    <form className='mt-4 grid gap-3' onSubmit={handleSubmit(hendleOnSubmit)}>
                        <div className='grid gap-3 md:flex justify-around md:gap-1'>
                            <div className='grid gap-3'>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor='country'>Country: </label>
                                    <input
                                        type="text"
                                        id='country'
                                        className='border bg-blue-50 p-2 outline-none focus-within:border-primary-100 rounded w-full'
                                        placeholder={address.country}
                                        {...register("country", { required: false })}
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor='state'>State: </label>
                                    <input
                                        type="text"
                                        id='state'
                                        className='border bg-blue-50 p-2 outline-none focus-within:border-primary-100 rounded w-full'
                                        placeholder={address.state}
                                        {...register("state", { required: false })}
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor='city'>City: </label>
                                    <input
                                        type="text"
                                        id='city'
                                        className='border bg-blue-50 p-2 outline-none focus-within:border-primary-100 rounded w-full'
                                        placeholder={address.city}
                                        {...register("city", { required: false })}
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor='pincode'>Pincode: </label>
                                    <input
                                        type="text"
                                        id='pincode'
                                        className='border bg-blue-50 p-2 outline-none focus-within:border-primary-100 rounded w-full'
                                        placeholder={address.pincode}
                                        {...register("pincode", { required: false })}
                                    />
                                </div>
                            </div>
                            <div className='grid gap-3'>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor='street'>Street: </label>
                                    <input
                                        type="text"
                                        id='street'
                                        className='border bg-blue-50 p-2 outline-none focus-within:border-primary-100 rounded w-full'
                                        placeholder={address.street}
                                        {...register("street", { required: false })}
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor='bilding'>Bilding: </label>
                                    <input
                                        type="text"
                                        id='bilding'
                                        className='border bg-blue-50 p-2 outline-none focus-within:border-primary-100 rounded w-full'
                                        placeholder={address.bilding}
                                        {...register("bilding", { required: false })}
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor='address_line'>Address Line: </label>
                                    <input
                                        type="text"
                                        id='address_line'
                                        className='border bg-blue-50 p-2 outline-none focus-within:border-primary-100 rounded w-full'
                                        placeholder={address.address_line}
                                        {...register("address_line", { required: false })}
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor='mobile'>Mobile: </label>
                                    <input
                                        type="text"
                                        id='mobile'
                                        className='border bg-blue-50 p-2 outline-none focus-within:border-primary-100 rounded w-full'
                                        placeholder={address.mobile}
                                        {...register("mobile", { required: false })}
                                    />
                                </div>
                            </div>
                        </div>
                        <Divider />
                        <button type='submit'
                            className='py-2 rounded w-full max-w-[150px] font-semibold bg-primary-100 cursor-pointer 
                        hover:bg-primary-200 mt-1'>
                            Update
                        </button>
                    </form>
                    <p className='text-neutral-400 p-2 mt-3 lg:mt-6 text-xs'>
                        <span className='text-neutral-900 font-semibold'>Please Note: </span>All fields are required and must be completed before submitting the form. Please carefully review all information provided to ensure accuracy and completeness. Inaccurate or missing data may result in delays or processing errors. By submitting this form, you confirm that all entered details are correct and up to date. We recommend double-checking your responses prior to submission. If you have any questions or need assistance, please contact our support team before proceeding.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default EditAddress