import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AxiosTostError from '../utils/AxiosTostError';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import Loading from '../components/Loading';
import CartProduct from '../components/CartProduct';
import { useSelector } from 'react-redux';
import valideURLConverd from '../utils/valideURLConverd';

const ProductListPage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [loading, setLoading] = useState(false);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const params = useParams();
  const categoryId = params.category.split('-').slice(-1)[0]
  const subCategoryId = params.subCategory.split('-').slice(-1)[0]
  const subCategoryLength = params?.subCategory.split('-')
  const subCategoryName = subCategoryLength?.slice(0, subCategoryLength?.length - 1)?.join(' ')
  const subCategory = useSelector(state => state.product.subCategory)
  const [displaySubCategory, setDisplaySubCategory] = useState([])
  const fetchProductData = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: {
          page: page,
          limit: limit,
          categoryId: categoryId,
          subCategoryId: subCategoryId
        }
      })
      const { data: responseData } = response
      if (responseData.succsess) {
        if (responseData.page === 1) {
          setData(responseData.data)
        } else {
          setData([...data, ...responseData.data])
        }
        setTotalPageCount(responseData.totalNoPage)
        setTotalCount(responseData.totalCount)
      }
    } catch (error) {
      AxiosTostError(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchProductData()
  }, [page, limit, params])
  useEffect(() => {
    const sub = subCategory.filter(s => {
      const filterData = s.category.some(el => {
        return el._id == categoryId
      })
      return filterData ? filterData : null
    })
    setDisplaySubCategory(sub)
  }, [params, subCategory])

  return (
    <section className='sticky top-24 lg:top-28 md:mt-1'>
      <div className='container mx-auto grid grid-cols-[90px,1fr] md:grid-cols-[200px,1fr] lg:grid-cols-[280px,1fr]
                      sticky top-24'>
        {/* sub category */}
        <div className='min-h-[73vh] max-h-[73vh] overflow-auto lg:mt-10 scrollbarCustom'>
          {
            displaySubCategory.map((item, index) => {
              const category = item?.category[0]
              const link = `/${valideURLConverd(category?.name)}-${category?._id}/${valideURLConverd(item.name)}-${item._id}`;
              // const link = ''

              return (
                <div
                  key={index + 'subCategoryInprodyctList'}
                  className={`bg-white shadow-md p-2 mb-2 cursor-pointer
                  ${subCategoryId === item._id ? 'text-primary-100' : ''}
                  ${subCategoryId === item._id ? 'hover:text-primary-100' : 'hover:text-green-600 '}`}>
                  <Link to={link} className='lg:flex items-center justify-between'>
                    <div className='w-14 h-14 lg:w-20 lg:h-20 overflow-hidden mx-auto lg:ml-1'>
                      <img
                        src={item.image}
                        alt={item.name}
                        className='w-full h-full object-scale-down'
                      />
                    </div>
                    <p className='text-xs text-center text-ellipsis line-clamp-2 lg:text-xl lg:font-semibold'>
                      {item.name}
                    </p>
                  </Link>
                </div>
              )
            })
          }
        </div>
        {/* Product */}
        <div className=''>
          <div className='bg-white shadow-md p-2 '>
            <h3 className='font-semibold'>{subCategoryName}</h3>
          </div>
          <div>
            <div className='grid mx-auto p-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3'>
              {
                data.map((item, index) => {
                  return (
                    <div key={index + 'CartProductCategory&SubCategory'} className='flex gap-4 items-center'>
                      <CartProduct data={item} />
                    </div>
                  )
                })
              }
            </div>
            {
              loading && (
                <Loading />
              )
            }
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductListPage