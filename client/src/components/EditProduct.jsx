import React, { useState } from 'react'
import Loading from '../components/Loading'
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../utils/UploadImage';
import { MdDelete } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import AxiosTostError from '../utils/AxiosTostError';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import Context from '../context';
import AddField from '../components/AddField';

const EditProduct = ({ productData, fetchProductData, close }) => {
    const [loading, setLoading] = useState(false);
    const [fieldName, setFieldName] = useState("");
    const [openAddField, setOpenAddField] = useState(false);
    const [fullImage, setFullImage] = useState("");
    const allCategory = useSelector(state => state.product.allCategory);
    const allSubCategory = useSelector(state => state.product.subCategory);
    const [data, setData] = useState({
        productId: productData?._id,
        name: productData?.name,
        image: productData?.image,
        category: productData?.category,
        subCategory: productData?.subCategory,
        unit: productData?.unit,
        price: productData?.price,
        stock: productData?.stock,
        discount: productData?.discount,
        description: productData?.description,
        more_details: productData?.more_details || {},
        publish: true
    })
    const holderOnChange = (e) => {
        const { name, value } = e.target
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }
    const hendleUploadImage = async (e) => {
        setLoading(true)
        const file = e.target.files[0];
        if (!file) { return; }
        const response = await uploadImage(file);
        const { data: ImageResponse } = response;
        setData((preve) => {
            return {
                ...preve,
                image: [...preve.image, ImageResponse.data.url]
            }
        })
        setLoading(false)
    }
    const handleDeleteImage = async (index) => {
        data.image.splice(index, 1)
        setData((preve) => {
            return {
                ...preve
            }
        })
    }
    const hendleRemoveCategorySelecter = (categoryId) => {
        const index = data.category.findIndex((item) => item._id === categoryId);
        const newCategory = [...data.category];
        newCategory.splice(index, 1);
        setData((preve) => {
            return {
                ...preve,
                category: newCategory
            }
        })
    }
    const hendleRemoveSubCategorySelecter = (subCategoryId) => {
        const index = data.subCategory.findIndex((item) => item._id === subCategoryId);
        const newSubCategory = [...data.subCategory];
        newSubCategory.splice(index, 1);
        setData((preve) => {
            return {
                ...preve,
                subCategory: newSubCategory
            }
        })
    }
    const handleAddField = () => {
        setData((preve) => {
            return {
                ...preve,
                more_details: {
                    ...preve.more_details,
                    [fieldName]: ""
                }
            }
        })
        setFieldName("");
        setOpenAddField(false)
    }
    const holderOnSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await Axios({
                ...SummaryApi.updateProduct,
                data: data
            })
            const { data: responseData } = response;
            if (responseData.error) {
                toast.error(responseData.massage)
            }
            if (responseData.succsess) {
                toast.success(responseData.message)
                close()
                fetchProductData()
                setData({
                    name: "",
                    image: [],
                    category: [],
                    subCategory: [],
                    unit: "",
                    price: "",
                    stock: "",
                    discount: "",
                    description: "",
                    more_details: {},
                    publish: true
                })
            }
        } catch (error) {
            AxiosTostError(error)
        }
    }

    return (
        <section className='fixed top-0 right-0 left-0 bottom-0 bg-neutral-800 bg-opacity-65 
                                flex md:items-center md:justify-center z-50'>
            <div className='bg-white max-w-3xl w-full p-4 rounded overflow-y-auto max-h-[90vh]'>
                <div className='flex justify-between border-b border-neutral-500'>
                    <h2 className='font-semibold pb-2'>Add Sub Category</h2>
                    <button
                        onClick={close}
                        className='hover:text-red-700 pb-2'>
                        <IoMdClose size={20} />
                    </button>
                </div>
                <form className='my-3 grid gap-3' onSubmit={holderOnSubmit}>
                        <div className='grid gap-2'>
                            <label htmlFor='name'>Name</label>
                            <input
                                required
                                type='text'
                                name='name'
                                id='name'
                                placeholder='Enter product name'
                                onChange={holderOnChange}
                                value={data.name}
                                className='border border-blue-100 bg-blue-50 rounded w-full p-2
                                        outline-none focus:border-primary-200'
                            />
                        </div>
                        <div className='grid gap-2'>
                            <label htmlFor='description'>Description</label>
                            <textarea
                                type='text'
                                name='description'
                                id='description'
                                placeholder='Enter product description'
                                onChange={holderOnChange}
                                value={data.description}
                                multiple
                                rows={3}
                                className='border border-blue-100 bg-blue-50 rounded w-full p-2
                          outline-none focus:border-primary-200 resize-none'
                            />
                        </div>
                        <div className='grid gap-2'>
                            <p>Image</p>
                            <div className='border border-blue-100 bg-blue-50 rounded w-full p-2 h-full min-h-24 grid md:flex
                              outline-none focus:border-primary-200 items-center gap-2 '>
                                <div className='md:flex gap-2 grid'>
                                    {
                                        data.image[0] && data.image.map((item, index) => (
                                            <div
                                                key={index + 'product_image'}
                                                className='relative w-20 h-20 min-w-20 border border-gray-400 group mx-auto'>
                                                <img
                                                    src={item}
                                                    alt={"image" + item}
                                                    className='w-full h-full object-scale-down mx-auto md:mx-0 cursor-pointer'
                                                    onClick={() => { setFullImage(item) }}
                                                />
                                                <div className='absolute bottom-0 right-0 p-1 hidden group-hover:block'>
                                                    <MdDelete
                                                        size={20}
                                                        className='text-red-100 cursor-pointer hover:text-red-600'
                                                        onClick={() => { handleDeleteImage(index) }}
                                                    />
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <label htmlFor='image'>
                                    <div className='flex items-center justify-center text-center flex-col cursor-pointer'>
                                        {
                                            loading ? (<Loading />) : (
                                                <>
                                                    <FaCloudUploadAlt size={30} className='text-gray-400' />
                                                    <p className='text-gray-400'>Upload Image</p>
                                                </>
                                            )
                                        }
                                    </div>
                                    <div>
                                        <input
                                            type='file'
                                            name='image'
                                            id='image'
                                            accept='image/*'
                                            className='hidden'
                                            onChange={hendleUploadImage}
                                        />
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div className='grid gap-2'>
                            <label htmlFor='category'>Category</label>
                            {/* display valey category */}
                            {
                                data.category[0] ? (
                                    <div className='flex gap-2 flex-wrap text-sm text-neutral-600 border rounded p-2
                                border-blue-100 bg-blue-50 focus:border-primary-200'>
                                        {
                                            data.category.map((item, index) => {
                                                return (
                                                    <div key={index + "CategoryValey2"} className='shadow-md flex'>
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
                            <select
                                id='category'
                                name='category'
                                value={data.category}
                                className='border border-blue-100 bg-blue-50 rounded w-full p-2
                                                    outline-none focus:border-primary-200'
                                onChange={(e) => {
                                    const value = e.target.value
                                    const categoryIndex = allCategory.find(item => item._id === value)
                                    setData((preve) => {
                                        return {
                                            ...preve,
                                            category: [...preve.category, categoryIndex]
                                        }
                                    })
                                }}
                            >
                                <option value=''>Select Category</option>
                                {
                                    allCategory.map((item, index) => (
                                        <option key={index + "SubCategory"} value={item?._id}>{item?.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className='grid gap-2'>
                            <label htmlFor='subCategory'>Sub Category</label>
                            {/* display valey subCategory */}
                            {
                                data.subCategory[0] ? (
                                    <div className='flex gap-2 flex-wrap text-sm text-neutral-600 border rounded p-2
                                border-blue-100 bg-blue-50 focus:border-primary-200'>
                                        {
                                            data.subCategory.map((item, index) => {
                                                return (
                                                    <div key={index + "CategoryValey2"} className='shadow-md flex'>
                                                        {item?.name}<span> </span>
                                                        <div
                                                            className='hover:bg-red-600 hover:text-white 
                                        hover:border-red-600 bg-red-100 p-1 rounded-full border 
                                        border-red-100 cursor-pointer '
                                                            onClick={() => { hendleRemoveSubCategorySelecter(item._id) }}>
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
                            {/* select subCategory */}
                            <select
                                id='subCategory'
                                name='subCategory'
                                value={data.subCategory}
                                className='border border-blue-100 bg-blue-50 rounded w-full p-2
                                                    outline-none focus:border-primary-200'
                                onChange={(e) => {
                                    const value = e.target.value
                                    const subCategoryIndex = allSubCategory.find(item => item._id === value)
                                    setData((preve) => {
                                        return {
                                            ...preve,
                                            subCategory: [...preve.subCategory, subCategoryIndex]
                                        }
                                    })
                                }}
                            >
                                <option value=''>Select Sub Category</option>
                                {
                                    allSubCategory.map((item, index) => (
                                        <option key={index + "SubCategory"} value={item?._id}>{item?.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className='grid gap-2'>
                            <label htmlFor='unit'>Unit</label>
                            <input
                                required
                                type='text'
                                name='unit'
                                id='unit'
                                placeholder='Enter product unit'
                                onChange={holderOnChange}
                                value={data.unit}
                                className='border border-blue-100 bg-blue-50 rounded w-full p-2
                                        outline-none focus:border-primary-200'
                            />
                        </div>
                        <div className='grid gap-2'>
                            <label htmlFor='stock'>Nomber of Stock</label>
                            <input
                                required
                                type='number'
                                name='stock'
                                id='stock'
                                placeholder='Enter product stock'
                                onChange={holderOnChange}
                                value={data.stock}
                                className='border border-blue-100 bg-blue-50 rounded w-full p-2
                                        outline-none focus:border-primary-200'
                            />
                        </div>
                        <div className='grid gap-2'>
                            <label htmlFor='price'>Price</label>
                            <input
                                required
                                type='number'
                                name='price'
                                id='price'
                                placeholder='Enter product price'
                                onChange={holderOnChange}
                                value={data.price}
                                className='border border-blue-100 bg-blue-50 rounded w-full p-2
                                        outline-none focus:border-primary-200'
                            />
                        </div>
                        <div className='grid gap-2'>
                            <label htmlFor='discount'>Discount</label>
                            <input
                                required
                                type='number'
                                name='discount'
                                id='discount'
                                placeholder='Enter product discount'
                                onChange={holderOnChange}
                                value={data.discount}
                                className='border border-blue-100 bg-blue-50 rounded w-full p-2
                                        outline-none focus:border-primary-200'
                            />
                        </div>
                        <div className='grid gap-2'>
                            {
                                Object?.keys(data?.more_details)?.map((item, index) => {
                                    return (
                                        <div key={index + "more_details"} className='grid gap-2'>
                                            <label htmlFor={item}>{item}</label>
                                            <input
                                                type='text'
                                                id={item}
                                                onChange={(e) => {
                                                    const value = e.target.value
                                                    setData((preve) => {
                                                        return {
                                                            ...preve,
                                                            more_details: {
                                                                ...preve.more_details,
                                                                [item]: value
                                                            }
                                                        }
                                                    })
                                                }}
                                                value={data?.more_details[item]}
                                                className='border border-blue-100 bg-blue-50 rounded w-full p-2
                                        outline-none focus:border-primary-200'
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div
                            className='grid gap-2 cursor-pointer border hover:bg-primary-200 py-1 
                        px-3 rounded w-28 text-center border-primary-200'
                            onClick={() => setOpenAddField(true)}>
                            Add Fields
                        </div>
                        <button className='bg-primary-100 hover:bg-primary-200 py-1 px-3 rounded'>
                            Upload Product
                        </button>
                </form>
            </div>
            {
                openAddField && (
                    <div>
                        <AddField
                            close={() => { setOpenAddField(false) }}
                            value={fieldName}
                            onChange={(e) => { setFieldName(e.target.value) }}
                            submit={handleAddField} />
                    </div>
                )
            }
            {
                fullImage && (
                    <div className='fixed top-0 left-0 right-0 bottom-0 bg-neutral-900 bg-opacity-60 p-4 flex 
                          items-center justify-center z-50 '>
                        <img
                            src={fullImage}
                            alt={"image" + fullImage}
                            className='w-full h-full object-scale-down cursor-pointer'
                            onClick={() => { setFullImage("") }}
                        />
                    </div>
                )
            }
        </section>
    )
}

export default EditProduct