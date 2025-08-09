import React, { useEffect, useState } from 'react'
import AxiosTostError from '../utils/AxiosTostError';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import Loading from '../components/Loading';
import ProductCartAdmibin from '../components/ProductCartAdmibin';

const ProductPageAdmin = () => {
  const [productData, setProductData] = useState([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [loading, setLoading] = useState(false)
  const [totalPageCount, setTotalPageCount] = useState(1)
  const [search, setSearch] = useState('')
  const fetchProductData = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.allProduct,
        data: {
          page: page,
          limit: limit,
          search: search
        }
      })
      const { data: responseData } = response
      if (responseData.succsess) {
        setProductData(responseData.data)
        setTotalPageCount(responseData.totalNoPage)
      }
    } catch (error) {
      AxiosTostError(error)
    } finally {
      setLoading(false)
    }
  }
  const handleNextPage = () => {
    if (page !== totalPageCount) {
      setPage(preve => preve + 1)
    }
  }
  const hendlePreviousPage = () => {
    if (page > 1) {
      setPage(preve => preve - 1)
    }
  }
  const handleOnChange = (e) => {
    const { value } = e.target
    setSearch(value)
    setPage(1)
  }
  useEffect(() => {
    fetchProductData()
  }, [page, limit])
  useEffect(() => {
    let flag = true
    const interval = setInterval(() => {
      if (flag) {
        fetchProductData()
        flag = false
      }
    }, 300);
    return () => {
      clearInterval(interval)
    }
  }, [search])

  return (
    <section className='container mx-auto p-3'>
      <div className='p-2 shadow-md md:flex items-center justify-between overflow-auto'>
        <div>
          <h2 className='font-semibold'>Products</h2>
        </div>
        <div>
          <input
            type='text'
            placeholder='Search ...'
            className='bg-blue-50 py-1 px-4 border outline-none focus-within:border-primary-100 rounded w-full m-1'
            onChange={handleOnChange}
            value={search}
          />
        </div>
        <div>
          <input
            type="number"
            placeholder='limit'
            className='bg-blue-50 p-1 border outline-none focus-within:border-primary-100 rounded w-14 m-1'
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
          />
        </div>
      </div>
      <div className='min-h-[60vh]'>
        <div className='p-4 grid min-[375px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-3'>
          {
            productData.map((item, index) => {
              return (
                <ProductCartAdmibin key={index + "productCartAdmin"} data={item} fetchProductData={fetchProductData} />
              )
            })
          }
        </div>
      </div>
      <div className='flex justify-around md:justify-end gap-3'>
        <button
          className=' border-primary-200  hover:bg-primary-200 
                                hover:text-neutral-800 py-1 px-2 border rounded'
          onClick={hendlePreviousPage}
        >
          prev
        </button>
        <button className='bg-primary-100 py-1 px-2 rounded'>{page}/{totalPageCount}</button>
        <button
          className=' border-primary-200  hover:bg-primary-200 
                                hover:text-neutral-800 py-1 px-2 border rounded'
          onClick={handleNextPage}
        >
          next
        </button>
      </div>
      {
        loading && (
          <Loading />
        )
      }
    </section>
  )
}

export default ProductPageAdmin