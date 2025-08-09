import React, { useState } from 'react'
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import DeleteProduct from './DeleteProduct';
import EditProduct from './EditProduct';

const ProductCartAdmibin = ({ data, key, fetchProductData }) => {
  const [openDelete, setOpenDelete] = useState(false)
  const [openUpdate, setOpenUpdate] = useState(false)

  return (
    <div key={key} className='shadow-md border m-1 rounded grid justify-between'>
      <div>
        <img
          src={data?.image[0]}
          alt={data?.name}
          className='w-full h-full object-scale-down'
        />
      </div>
      <p className='px-1 text-ellipsis line-clamp-2 font-medium'>{data?.name}</p>
      <p className='px-1 text-slate-400'>{data?.unit}</p>
      <div className='p-2 flex items-center justify-around text-xs lg:text-xs'>
        <button
          onClick={() => {
            setOpenUpdate(true)
          }}
          className='border border-green-700 bg-green-200 px-3 py-1 rounded
                    hover:bg-green-700 hover:text-white'>
          <MdEdit size={20} />
        </button>
        <button
          onClick={() => {
            setOpenDelete(true)
          }}
          className='border border-red-700 bg-red-200 px-3 py-1 rounded
                    hover:bg-red-700 hover:text-white'>
          <MdDelete size={20} />
        </button>
      </div>
      {
        openDelete && (
          <DeleteProduct
            productData={data}
            fetchProductData={fetchProductData}
            close={() => { setOpenDelete(false) }}
          />
        )
      }
      {
        openUpdate && (
          <EditProduct
            productData={data}
            fetchProductData={fetchProductData}
            close={() => { setOpenUpdate(false) }}
          />
        )
      }
    </div>
  )
}

export default ProductCartAdmibin