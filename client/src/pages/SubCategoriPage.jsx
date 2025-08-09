import React, { useEffect, useState } from 'react'
import UploadSubCategory from '../components/UploadSubCategory'
import Loading from '../components/Loading';
import NoData from '../components/NoData';
import { useSelector } from 'react-redux';
import DisplayTable from '../components/DisplayTable';
import { createColumnHelper } from '@tanstack/react-table';
import ViewImage from '../components/ViewImage';

const SubCategoriPage = () => {
  const [openAddSubCategory, setOpenAddSubCategory] = useState(false)
  const [openBigImage, setOpenBigImage] = useState(false);
  const [editData, setEditData] = useState({ _id: "", name: "", image: "", category: [] });
  const [loading, setLoading] = useState(false);
  const allSubCategory = useSelector(state => state.product.subCategory);
  const columnHelper = createColumnHelper()
  const column = [
    columnHelper.accessor('name', {
      header: 'Name',
      cell: ({ row }) => {
        return (
          <div
            className='cursor-pointer'
            onClick={() => { setOpenBigImage(true); setEditData(row.original) }}>
            <p className='truncate'>{row.original.name}</p>
          </div>
        )
      }
    }),
    columnHelper.accessor('image', {
      header: 'Image',
      cell: ({ row }) => {
        return (
          <div className='flex items-center justify-center'>
            <img
              src={row.original.image}
              alt="image"
              className='w-8 h-8 object-scale-down'
              onClick={() => { setOpenBigImage(true); setEditData(row.original) }}
            />
          </div>
        )
      }
    }),
    columnHelper.accessor('category', {
      header: 'Category',
      cell: ({ row }) => {
        return (
          <div
            className='cursor-pointer'
            onClick={() => { setOpenBigImage(true); setEditData(row.original) }}>
            <p className='truncate'>{
              row.original.category.map((item) => item.name).join('; ')
            }</p>
          </div>
        )
      }
    }),
  ];
  const subCategoriesLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500)
  }
  useEffect(() => {
    subCategoriesLoading()
  }, [])

  return (
    <section className='container mx-auto p-3'>
      <div className='p-2 shadow-md flex items-center justify-between overflow-auto'>
        <h2 className='font-semibold'>Sub Category</h2>
        <button
          onClick={() => setOpenAddSubCategory(true)}
          className='text-sm border-primary-200 text-primary-200 hover:bg-primary-200 
                      hover:text-neutral-800 py-1 px-2 border rounded'>
          Add Sub Category
        </button>
      </div>
      {
        loading && (
          <Loading />
        )
      }
      {
        !allSubCategory[0] && !loading && (
          <div className='p-4 text-center flex flex-col items-center justify-center gap-4'>
            <div className='w-36'><NoData /></div>
            <p className='text-sm text-neutral-500'>No category found</p>
          </div>
        )
      }
      <div className=' max-w-[88vw] md:max-w-[60vw] lg:w-full overflow-auto'>
        {
          allSubCategory[0] && !loading && (
            <DisplayTable data={allSubCategory} column={column}/>
          )
        }
      </div>
      {
        openAddSubCategory && (
          <UploadSubCategory
            close={() => setOpenAddSubCategory(false)}
            subCategoriesLoading={subCategoriesLoading}
          />
        )
      }
      {
        openBigImage && (
          <ViewImage
            close={() => setOpenBigImage(false)}
            data={editData}
          />
        )
      }
    </section>
  )
}

export default SubCategoriPage