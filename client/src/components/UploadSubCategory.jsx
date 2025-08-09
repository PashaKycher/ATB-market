import React, { useContext, useState } from 'react'
import { IoMdClose } from "react-icons/io";
import uploadImage from '../utils/UploadImage';
import AxiosTostError from '../utils/AxiosTostError';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import Context from '../context';

const UploadSubCategory = ({ close, subCategoriesLoading }) => {
    const { fetchSubCategories } = useContext(Context);
    const [subCategoryData, setSubCategoryData] = useState({
        name: '',
        image: '',
        category: []
    })
    const allCategory = useSelector(state => state.product.allCategory);
    const handleOnChange = (e) => {
        const { name, value } = e.target
        setSubCategoryData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }
    const hendleUploadSubCategoryImage = async (e) => {
        const file = e.target.files[0];
        if (!file) { return; }
        const response = await uploadImage(file);
        const { data: ImageResponse } = response;
        setSubCategoryData((preve) => {
            return {
                ...preve,
                image: ImageResponse.data.url
            }
        })
    }
    const hendleRemoveCategorySelecter = (categoryId) => {
        const index = subCategoryData.category.findIndex((item) => item._id === categoryId);
        const newSubCategory = [...subCategoryData.category];
        newSubCategory.splice(index, 1);
        setSubCategoryData((preve) => {
            return {
                ...preve,
                category: newSubCategory
            }
        })
    }
    const hendleOnSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await Axios({
                ...SummaryApi.addSubCategory,
                data: subCategoryData
            })
            const { data: responseData } = response;
            if (responseData.error) {
                toast.error(responseData.massage)
            }
            if (responseData.succsess) {
                toast.success(responseData.message)
                setSubCategoryData({
                    name: "",
                    image: "",
                    category: []
                })
                close()
                fetchSubCategories()
                subCategoriesLoading()
            }
        } catch (error) {
            AxiosTostError(error)
        }
    }

    return (
        <section className='fixed top-0 right-0 left-0 bottom-0 bg-neutral-800 bg-opacity-65
                        flex items-center justify-center z-50'>
            <div className='bg-white max-w-3xl w-full p-4 rounded'>
                <div className='flex justify-between border-b border-neutral-500'>
                    <h2 className='font-semibold pb-2'>Add Sub Category</h2>
                    <button
                        onClick={close}
                        className='hover:text-red-700 pb-2'>
                        <IoMdClose size={20} />
                    </button>
                </div>
                <form className='my-3 grid gap-3' onSubmit={hendleOnSubmit}>
                    <div className='grid gap-2'>
                        <label htmlFor='subCategoryName'>Sub Category Name</label>
                        <input
                            id='nasubCategoryNameme'
                            name='name'
                            type="text"
                            value={subCategoryData.name}
                            placeholder='Sub Category Name'
                            className='border border-blue-100 bg-blue-50 rounded w-full p-2
                                        outline-none focus:border-primary-200'
                            onChange={handleOnChange}

                        />
                    </div>
                    <div className='grid gap-2'>
                        {/* display valey category */}
                        {
                            subCategoryData.category[0] ? (
                                <div className='flex gap-2 flex-wrap text-sm text-neutral-600 border rounded p-2
                                                border-blue-100 bg-blue-50 focus:border-primary-200'>
                                    {
                                        subCategoryData.category.map((item, index) => {
                                            return (
                                                <div key={index + "SubCategoryValey1"} className='shadow-md flex'>
                                                    {item?.name}<span> </span>
                                                    <div
                                                        className='hover:bg-red-600 hover:text-white 
                                                            hover:border-red-600 bg-red-100 p-1 rounded-full border 
                                                            border-red-100 cursor-pointer '
                                                        onClick={() => { hendleRemoveCategorySelecter(item._id) }}>
                                                        <IoMdClose size={10} />
                                                    </div><span> </span>;
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            ) : (
                                <div></div>
                            )

                        }
                        {/* select category */}
                        <label htmlFor='subCategoryCategory'>Select Category</label>
                        <select
                            id='subCategoryCategory'
                            name='category'
                            value={subCategoryData.category}
                            className='border border-blue-100 bg-blue-50 rounded w-full p-2
                                        outline-none focus:border-primary-200'
                            onChange={(e) => {
                                const value = e.target.value
                                const categoryIndex = allCategory.find(item => item._id == value)
                                setSubCategoryData((preve) => {
                                    return {
                                        ...preve,
                                        category: [...preve.category, categoryIndex]
                                    }
                                })
                            }}
                        >
                            <option value='' disabled>Select Category</option>
                            {
                                allCategory.map((item, index) => (
                                    <option key={index + "SubCategory"} value={item?._id}>{item?.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='grid gap-2'>
                        <p>Sub Category Image</p>
                        <div className='flex gap-4 flex-col md:flex-row items-center'>
                            <div className='border border-blue-100 bg-blue-50 rounded h-32 md:w-32 p-2
                                        flex items-center justify-center w-full'>
                                {
                                    subCategoryData.image ? (
                                        <img
                                            src={subCategoryData.image}
                                            alt='subCategoryImage'
                                            className='w-full h-full object-scale-down'
                                        />
                                    ) : (
                                        <p className='text-sm text-neutral-500'>No image</p>
                                    )
                                }
                            </div>
                            <label htmlFor='subCategoryImage'>
                                <div
                                    disabled={!subCategoryData.name || !subCategoryData.category}
                                    className={`px-4 py-2 rounded border font-medium
                                                ${!subCategoryData.name ? "bg-gray-400 cursor-not-allowed" :
                                            "border-primary-200 cursor-pointer hover:bg-primary-200"}`}>
                                    Upload Image
                                </div>
                                <input
                                    id='subCategoryImage'
                                    name='image'
                                    type="file"
                                    className='hidden'
                                    disabled={!subCategoryData.name || !subCategoryData.category}
                                    onChange={hendleUploadSubCategoryImage}
                                />
                            </label>
                        </div>
                    </div>
                    <button
                        disabled={!subCategoryData.name || !subCategoryData.image || !subCategoryData.category[0]}
                        className={`py-2 rounded w-full font-semibold
                                    ${!subCategoryData.name || !subCategoryData.image || !subCategoryData.category[0] ?
                                "bg-gray-400 cursor-not-allowed" :
                                "bg-primary-100 cursor-pointer hover:bg-primary-200"}`}>
                        Add Sub Category
                    </button>
                </form>
            </div>
        </section>
    )
}

export default UploadSubCategory