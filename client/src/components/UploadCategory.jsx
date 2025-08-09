import React, { useContext, useState } from 'react'
import { IoMdClose } from "react-icons/io";
import uploadImage from '../utils/UploadImage';
import AxiosTostError from '../utils/AxiosTostError';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import Context from '../context';

const UploadCategory = ({ close, categoriesLoading }) => {
    const { fetchCategories } = useContext(Context);
    const [data, setData] = useState({
        name: "",
        image: ""
    })
    const hendleOnChange = (e) => {
        const { name, value } = e.target
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }
    const hendleOnSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await Axios({
                ...SummaryApi.addCategory,
                data: data
            })
            const { data: responseData } = response;
            if(responseData.error) {
                toast.error(responseData.massage)
            }
            if(responseData.succsess) {
                toast.success(responseData.message)
                setData({
                    name: "",
                    image: ""
                })
                close()
                fetchCategories()
                categoriesLoading()
            }
        } catch (error) {
            AxiosTostError(error)
        }
    }
    const hendleUploadCategoryImage = async(e) => {
        const file = e.target.files[0];
        if(!file) { return; }
        const response = await uploadImage(file);
        const { data: ImageResponse } = response;
        setData((preve) => {
            return {
                ...preve,
                image: ImageResponse.data.url
            }
        })
    }

    return (
        <section className='fixed top-0 right-0 left-0 bottom-0 bg-neutral-800 bg-opacity-65
                                flex items-center justify-center z-50'>
            <div className='bg-white max-w-3xl w-full p-4 rounded'>
                <div className='flex justify-between border-b border-neutral-500'>
                    <h2 className='font-semibold pb-2'>Add Category</h2>
                    <button
                        onClick={close}
                        className='hover:text-red-700 pb-2'
                    >
                        <IoMdClose size={20} />
                    </button>
                </div>
                <form className='my-3 grid gap-3' onSubmit={hendleOnSubmit}>
                    <div className='grid gap-2'>
                        <label htmlFor='categoryName'>Category Name</label>
                        <input
                            type='text'
                            name='name'
                            id='categoryName'
                            className='border border-blue-100 bg-blue-50 rounded w-full p-2
                                        outline-none focus:border-primary-200'
                            value={data.name}
                            placeholder='Enter category name'
                            onChange={hendleOnChange}
                        />
                    </div>
                    <div className='grid gap-2'>
                        <p>Category Image</p>
                        <div className='flex gap-4 flex-col md:flex-row items-center'>
                            <div className='border border-blue-100 bg-blue-50 rounded h-32 md:w-32 p-2
                                        flex items-center justify-center w-full'>
                                {
                                    data.image ? (
                                        <img 
                                            src={data.image} 
                                            alt={data.name} 
                                            className='w-full h-full object-scale-down'
                                        />
                                    ) : (
                                        <p className='text-sm text-neutral-500'>No image</p>
                                    )
                                }
                            </div>
                            <label htmlFor='uploadCategoryImage'>
                                <div
                                    disabled={!data.name}
                                    className={`px-4 py-2 rounded border font-medium
                                                ${!data.name ? "bg-gray-400 cursor-not-allowed" :
                                            "border-primary-200 cursor-pointer hover:bg-primary-200"}`}>
                                    Upload Image
                                </div>
                                <input
                                    onChange={hendleUploadCategoryImage}
                                    type='file'
                                    className='hidden'
                                    id='uploadCategoryImage'
                                    disabled={!data.name}
                                />
                            </label>
                        </div>
                    </div>
                    <button
                        disabled={!data.image || !data.name}
                        className={`py-2 rounded w-full font-semibold
                                    ${!data.image || !data.name ? 
                                        "bg-gray-400 cursor-not-allowed" :
                                        "bg-primary-100 cursor-pointer hover:bg-primary-200"}`}>
                        Add Category
                    </button>
                </form>
            </div>
        </section>
    )
}

export default UploadCategory