import React from 'react'
import { IoMdClose } from "react-icons/io";

const AddField = ({ close, value, onChange, submit }) => {
    return (
        <section className='fixed top-0 right-0 left-0 bottom-0 bg-neutral-800 bg-opacity-65
                                    flex items-center justify-center z-50'>
            <div className='bg-white max-w-3xl w-full p-4 rounded'>
                <div className='flex justify-between border-b border-neutral-500'>
                    <h2 className='font-semibold pb-2'>Add Field</h2>
                    <button
                        onClick={close}
                        className='hover:text-red-700 pb-2'
                    >
                        <IoMdClose size={20} />
                    </button>
                </div>
                <div className='my-3 grid gap-3'>
                    <input
                        type="text"
                        placeholder='Enter field name'
                        className='bg-blue-50 p-2 border outline-none focus-within:border-primary-100 rounded w-full'
                        value={value}
                        onChange={onChange}
                    />
                    <button
                        onClick={submit}
                        className={`py-2 rounded w-full font-semibold
                                    ${false ?
                                "bg-gray-400 cursor-not-allowed" :
                                "bg-primary-100 cursor-pointer hover:bg-primary-200"}`}>
                        Add Field
                    </button>
                </div>
            </div>
        </section>
    )
}

export default AddField