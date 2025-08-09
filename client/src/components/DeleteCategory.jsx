import React, { useContext } from 'react'
import { IoMdClose } from "react-icons/io";
import AxiosTostError from '../utils/AxiosTostError';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import Context from '../context';

const DeleteCategory = ({ close, categoriesLoading, categoryData }) => {
    const { fetchCategories } = useContext(Context);
    const categoryId = categoryData._id
    const categoryName = categoryData.name
    const hendleDeleteCategory = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.deleteCategory,
                data: { categoryId: categoryId }
            });
            const { data: responseData } = response;
            if (responseData.succsess) {
                close()
                toast.success(responseData.message)
                fetchCategories()
                categoriesLoading()
            }
        } catch (error) {
            AxiosTostError(error)
        }
    }

    return (
        <section className='fixed top-0 right-0 left-0 bottom-0 bg-neutral-800 bg-opacity-65
                                flex items-center justify-center z-50'>
            <div className='bg-white max-w-2xl w-full p-4 rounded'>
                <div className='flex justify-between border-b border-neutral-500'>
                    <h2 className='font-semibold pb-2'>Delete Category</h2>
                    <button
                        onClick={close}
                        className='hover:text-red-700 pb-2'
                    >
                        <IoMdClose size={20} />
                    </button>
                </div>
                <div className='my-4 font-medium'>
                    <p>
                        Are you sure you want to delete  
                        : <span className='font-semibold text-red-500'>{categoryName}</span> ?
                    </p>
                </div>
                <div className='flex justify-end mt-4'>
                    <button
                        onClick={close}
                        className='border border-green-700 bg-green-200 px-4 py-1 rounded
                                    hover:bg-green-700 hover:text-white mr-3'>
                        Cancel
                    </button>
                    <button
                        onClick={hendleDeleteCategory}
                        className='border border-red-700 bg-red-200 px-4 py-1 rounded
                                    hover:bg-red-700 hover:text-white'>
                        Delete
                    </button>
                </div>
            </div>
        </section>
    )
}

export default DeleteCategory