import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import Loading from '../components/Loading';
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import AxiosTostError from '../utils/AxiosTostError';
import DisplayPrice from '../utils/DislayPrice';
import Divider from '../components/Divider';
import image1 from '../assets/minute_delivery.png'
import image2 from '../assets/Best_Prices_Offers.png'
import image3 from '../assets/Wide_Assortment.png'
import AddToCartButton from '../components/AddToCartButton';

const ProductDisplayPage = () => {
  const scrollRef = useRef();
  const [loding, setLoading] = useState(false)
  const [productData, setProductData] = useState({
    image: [],
    name: "",
    description: "",
    discount: 0,
    more_details: {},
    price: 0,
    stock: 0,
    unit: "",
    category: "",
    subCategory: "",
  })
  const [images, setImages] = useState(0)
  const params = useParams();
  let productId = params?.productId?.split("-")?.slice(-1)[0];
  const fetchProductData = async () => {
    try {
      setLoading(true)
      const response = await Axios({ ...SummaryApi.getProductById, data: { productId: productId } })
      const { data: responseData } = response
      if (responseData.succsess) {
        setProductData(responseData.data)
      }
    } catch (error) {
      AxiosTostError(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchProductData()
  }, [params])
  // next image
  const nextImage = () => {
    scrollRef.current.scrollLeft += 100
  }
  // preve image
  const preveImage = () => {
    scrollRef.current.scrollLeft -= 100
  }

  return (
    <section className='container mx-auto p-4 grid md:grid-cols-3'>
      {/* product image */}
      <div className=''>
        <div className='rounded bg-white min-h-56 max-h-56 h-full w-full lg:min-h-[52vh] lg:max-h-[52vh]'>
          <img
            src={productData.image[images]}
            alt="product"
            className='w-full h-full object-scale-down'
          />
        </div>
        <div className='bg-white flex items-center justify-center gap-2 pb-2'>
          {
            productData.image?.map((image, index) => {
              return (
                <div
                  key={index + "imageProductDisplayPagePoiter"}
                  className={`bg-slate-200 w-5 h-5 rounded-full ${index === images && "bg-slate-400"}`}>
                </div>
              )
            })
          }
        </div>
        <div className='grid relative'>
          <div className='flex gap-3 mt-3 w-full scrollbar-none overflow-x-scroll overflow-y-hidden md:overflow-hidden items-center'
            ref={scrollRef}>
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
            {
              productData.image?.map((image, index) => {
                return (
                  <div
                    key={index + "imageProductDisplayPage"}
                    className='w-20 h-20 min-w-20 min-h-20 rounded-md cursor-pointer'>
                    <img
                      src={image}
                      alt="product"
                      className='w-full h-full object-scale-down hover:scale-110 transition-all duration-300 ease-in-out'
                      onClick={() => setImages(index)}
                    />
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
      {/* product details */}
      <div className='p-4'>
        <h2 className='text-lg font-semibold lg:text-2xl'>{productData.name}</h2>
        <p className='bg-green-300 w-fit px-2 py-1 mt-3 text-xs rounded-full'>{productData.unit}</p>
        <Divider />
        <div className='lg:flex justify-between items-center text-center'>
          <div className='mt-4 flex gap-4 lg:border lg:border-green-600 p-2 rounded w-fit lg:bg-green-50'>
            <p className='lg:text-xl text-semibold'>Price:</p>
            {
              productData.discount ?
                <div className='flex items-center gap-4'>
                  <p className='line-through text-xs lg:text-sm text-slate-400'>{DisplayPrice(productData.price)}</p>
                  <p className='text-green-600 font-semibold lg:text-xl'>
                    {DisplayPrice((productData.price - (productData.price * productData.discount / 100)).toFixed(2))}
                  </p>
                </div>
                :
                <p className='font-semibold text-xl'>{DisplayPrice(productData.price)}</p>
            }
          </div>
          {
            (productData.stock > 0) ? (
                <AddToCartButton data={productData}/>
            ) : (
              <p className='p-4 px-6 lg:p-2 xl:p-4 xl:px-6 rounded mt-4 bg-red-500 text-white'>Out of stock</p>
            )
          }
        </div>
        <Divider />
        <div className='mt-4'>
          <h3 className='text-lg font-semibold'>Description:</h3>
          <p className='text-sm'>{productData.description}</p>
        </div>
        <Divider />
        <div className='mt-4'>
          <h2 className='font-semibold'>Why shop from us?</h2>
          <div className='mt-2'>
            <div className='flex items-center gap-4'>
              <img
                src={image1}
                alt='image1'
                className='w-16 h-16'
              />
              <div className='text-sm'>
                <div className='font-semibold'>Superfast Delivery</div>
                <p>Get your order delivered to your doorstep within 30 min.</p>
              </div>
            </div>
          </div>
          <div className='mt-2'>
            <div className='flex items-center gap-4'>
              <img
                src={image2}
                alt='image2'
                className='w-16 h-16'
              />
              <div className='text-sm'>
                <div className='font-semibold'>Best Prices & Offers</div>
                <p>Get the best deals and offers on our products.</p>
              </div>
            </div>
          </div>
          <div className='mt-2'>
            <div className='flex items-center gap-4'>
              <img
                src={image3}
                alt='image3'
                className='w-16 h-16'
              />
              <div className='text-sm'>
                <div className='font-semibold'>Wide Assortment</div>
                <p>We have a wide assortment of products to choose from.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* more details */}
      <div className='border p-4'>
        {
          productData?.more_details && Object.keys(productData?.more_details).map((key, index) => {
            return (
              <div key={index + "moreDetailsProductDisplayPage"} className='mt-4'>
                <p className=' font-semibold'>{key}</p>
                <p className='text-sm mt-1'>{productData?.more_details[key]}</p>
              </div>
            )
          })
        }
      </div>
    </section>
  )
}

export default ProductDisplayPage