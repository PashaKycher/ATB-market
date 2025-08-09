import React, { useEffect, useState } from 'react'
import UploadCategory from '../components/UploadCategory'
import Loading from '../components/Loading';
import NoData from '../components/NoData';
import EditCategory from '../components/EditCategory';
import DeleteCategory from '../components/DeleteCategory';
import { useSelector } from 'react-redux';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const CategoryPage = () => {
    const [openUploadCategory, setOpenUploadCategory] = useState(false);
    const [loading, setLoading] = useState(false);
    const [categoriesData, setCategoriesData] = useState([]);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [editData, setEditData] = useState({ _id: "", name: "", image: "" });
    const allCategory = useSelector(state => state.product.allCategory);
    const categoriesLoading = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000)
    }
    useEffect(() => {
        setCategoriesData(allCategory);
    }, [allCategory])

    return (
        <section className='container mx-auto p-3'>
            <div className='p-2 shadow-md flex items-center justify-between'>
                <h2 className='font-semibold'>Category</h2>
                <button className='text-sm border-primary-200 text-primary-200 hover:bg-primary-200 
                                hover:text-neutral-800 py-1 px-2 border rounded'
                    onClick={() => { setOpenUploadCategory(true) }}
                >
                    Add Category
                </button>
            </div>
            {
                loading && (
                    <Loading />
                )
            }
            {
                !categoriesData[0] && !loading && (
                    <div className='p-4 text-center flex flex-col items-center justify-center gap-4'>
                        <div className='w-36'><NoData /></div>
                        <p className='text-sm text-neutral-500'>No category found</p>
                    </div>
                )
            }
            <div className='p-4 grid min-[375px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-3'>
                {
                    categoriesData[0] && !loading && (
                        categoriesData.map((category, index) => {
                            return (
                                <div
                                    key={index + "categoryAdmin"}
                                    className='shadow-md border m-1 rounded group hover:transform hover:scale-105 
                                             duration-500 grid justify-between'>
                                    <div className='p-1'>
                                        <img
                                            src={category.image}
                                            alt={category.name}
                                            className='w-full object-scale-down'
                                        />
                                    </div>
                                    <div className='mt-auto'>
                                        <p className='font-medium lg:text-base px-1 text-ellipsis line-clamp-1 
                                                    text-black text-center text-xs'>
                                            {category?.name}
                                        </p>
                                        <div className='p-2 flex items-center justify-around text-xs lg:text-xs'>
                                            <button
                                                onClick={() => {
                                                    setOpenUpdate(true)
                                                    setEditData(category)
                                                }}
                                                className='border border-green-700 bg-green-200 px-3 py-1 rounded
                                                        hover:bg-green-700 hover:text-white'>
                                                <MdEdit size={20} />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setOpenDelete(true)
                                                    setEditData(category)
                                                }}
                                                className='border border-red-700 bg-red-200 px-3 py-1 rounded
                                                        hover:bg-red-700 hover:text-white'>
                                                <MdDelete size={20}/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    )
                }
            </div>
            {
                openUpdate && (
                    <EditCategory
                        categoryData={editData}
                        categoriesLoading={categoriesLoading}
                        close={() => { setOpenUpdate(false) }}
                    />
                )
            }
            {
                openDelete && (
                    <DeleteCategory
                        categoryData={editData}
                        categoriesLoading={categoriesLoading}
                        close={() => { setOpenDelete(false) }}
                    />
                )
            }
            {
                openUploadCategory && (
                    <UploadCategory
                        categoriesLoading={categoriesLoading}
                        close={() => { setOpenUploadCategory(false) }}
                    />
                )
            }
        </section >
    )
}

export default CategoryPage