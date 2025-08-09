import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import EditSubCategory from './EditSubCategory';
import DeleteSubCategory from './DeleteSubCategory';
import { useSelector } from 'react-redux';

const ViewImage = ({ data, close }) => {
    const [openDelete, setOpenDelete] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const user = useSelector(state => state?.user);


    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 bg-neutral-900 bg-opacity-60 
                        p-4 flex md:items-center md:justify-center z-50'>
            <div className='bg-white max-w-3xl w-full p-4 rounded overflow-auto'>
                <div className='flex justify-between border-b border-neutral-500'>
                    <h2 className='font-semibold pb-2'>Sub Category Details</h2>
                    <button
                        onClick={close}
                        className='hover:text-red-700 pb-2'
                    >
                        <IoMdClose size={20} />
                    </button>
                </div>
                <div className='md:flex gap-3'>
                    <div className='w-full'>
                        <img src={data.image} alt="image" className='w-96 h-96 object-scale-down mx-auto p-1' />
                    </div>
                    <div className='mt-6 flex flex-col justify-between w-full'>
                        <div>
                            <p className=''>
                                <span className='font-semibold mr-2'>Name</span>
                                {data.name}
                            </p>
                            <div className='flex'>
                                <span className='font-semibold mr-2 line-clamp-1'>Category</span>
                                <div>
                                    {
                                        data.category[0] ? (data.category.map((item, index) => {
                                            return (
                                                <p key={index + "SubCategoryValey"}> {item?.name}; </p>
                                            )
                                        })
                                        ) : (
                                            <div></div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div>
                            {
                                user?.role === 'ADMIN' && (
                                    <div className='p-2 flex items-center justify-between text-xs lg:text-base'>
                                        <button
                                            onClick={() => {
                                                setOpenUpdate(true)
                                            }}
                                            className='border border-green-700 bg-green-200 px-3 py-1 rounded
                                            hover:bg-green-700 hover:text-white'>
                                            Update
                                        </button>
                                        <button
                                            onClick={() => {
                                                setOpenDelete(true)
                                            }}
                                            className='border border-red-700 bg-red-200 px-3 py-1 rounded
                                            hover:bg-red-700 hover:text-white'>
                                            Delete
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            {
                openUpdate && (
                    <EditSubCategory
                        subCategoryData={data}
                        close={() => setOpenUpdate(false)}
                        closeView={() => close()}
                    />
                )
            }
            {
                openDelete && (
                    <DeleteSubCategory
                        subCategoryData={data}
                        close={() => setOpenDelete(false)}
                        closeView={() => close()}
                    />
                )
            }
        </div>
    )
}

export default ViewImage