import React from 'react'

const CatdLoading = () => {
    return (
        <div className='mx-auto border p-4 grid gap-3 max-w-56 rounded animate-pulse'>
            <div className='min-h-20 bg-blue-50 rounded'></div>
            <div className='p-3 bg-blue-50 rounded w-20'></div>
            <div className='p-3 bg-blue-50 rounded'></div>
            <div className='p-3 bg-blue-50  rounded w-14'></div>
            {/*  */}
            <div className='flex items-center justify-between gap-3'>
                <div className='p-3 bg-blue-50 rounded w-20'></div>
                <div className='p-3 bg-blue-50 rounded w-20'></div>
            </div>
        </div>
    )
}

export default CatdLoading