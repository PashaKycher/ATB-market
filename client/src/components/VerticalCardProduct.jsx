import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import AxiosTostError from '../utils/AxiosTostError';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import CatdLoading from './CatdLoading';
import CartProduct from './CartProduct';
import { useSelector } from 'react-redux';
import valideURLConverd from '../utils/valideURLConverd';

const VerticalCardProduct = ({ name, id }) => {
  const scrollRef = useRef();
  // state for products
  const [data, setData] = useState([]);
  // loading state
  const [loading, setLoading] = useState(false);
  const allSubCategory = useSelector(state => state.product.subCategory);
  const hendleRedirectProductListPage = () => {
    const subCategory = allSubCategory.find(sub => {
      const filter = sub.category.some(cat => {
        return cat._id === id
      })
      return filter ? true : null
    })
      const url = `/${valideURLConverd(name)}-${id}/${valideURLConverd(subCategory?.name)}-${subCategory?._id}`;
      return url
  }
  // fetch data from backend and set to state whith funtion from helper
  const fetchProductData = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getProductByCategory,
        data: {
          categoryId: id
        }
      })
      const { data: responseData } = response
      if (responseData.succsess) {
        if (responseData.data[0]) {
          setData(responseData.data)
        }
      }
    } catch (error) {
      AxiosTostError(error)
    } finally {
      setLoading(false)
    }
  }
  // next image
  const nextImage = () => {
    scrollRef.current.scrollLeft += 200
  }
  // preve image
  const preveImage = () => {
    scrollRef.current.scrollLeft -= 200
  }
  // loading list
  const loadingList = new Array(12).fill(null);
  useEffect(() => {
    fetchProductData()
  }, [])

  return (
    <div>
      {
        (data.length > 0) && (
          <div className='container mx-auto px-4 my-6 relative'>
            {/* title */}
            <div className='p-4 container mx-auto flex items-center justify-between gap-4'>
              <h2 className='font-bold text-lg'>{name}</h2>
              <Link
                title='see all'
                to={hendleRedirectProductListPage()}
                className='text-green-800 text-semibold hover:text-green-700 hover:transform hover:scale-110 cursor-pointer'>
                All
              </Link>
            </div>
            {/* products and buttons */}
            <div
              className='flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all scroll-smooth'
              ref={scrollRef}
            >
              {/* preve button */}
              <button
                className='bg-white shadow-md rounded-full p-1 absolute text-lg hidden md:block left-0 z-10 hover:bg-slate-200'
                onClick={preveImage}
              >
                <FaAngleLeft />
              </button>
              {/* next button */}
              <button
                className='bg-white shadow-md rounded-full p-1 absolute text-lg hidden md:block right-0 z-10 hover:bg-slate-200'
                onClick={nextImage}
              >
                <FaAngleRight />
              </button>
              {/* map data products */}
              {
                loading ? (
                  <div className='flex gap-4 items-center'>
                    {
                      loadingList.map((item, index) => {
                        return (
                          <CatdLoading key={index + "loadingListHome"} />
                        )
                      })
                    }
                  </div>
                ) : (
                  data.length > 0 ?
                    data.map((item, index) => {
                      return (
                        <div key={index + 'CartProductHome'} className='flex gap-4 items-center'>
                          <CartProduct data={item} />
                        </div>
                      )
                    }) : <h2 className='text-center w-full text-slate-400'>No product found</h2>
                )
              }
            </div>
          </div>
        )
      }
    </div>
  )
}

export default VerticalCardProduct