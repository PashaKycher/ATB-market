import React from 'react'
import banner from '../assets/banner.jpg'
import banner2 from '../assets/banner-mobile.jpg'
import { useSelector } from 'react-redux'
import valideURLConverd from '../utils/valideURLConverd'
import { useNavigate } from 'react-router-dom'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  const lodingCategory = useSelector(state => state.product.loadingCategory);
  const allCategory = useSelector(state => state.product.allCategory);
  const allSubCategory = useSelector(state => state.product.subCategory);
  const navigate = useNavigate();
  const hendleRedirectProductListPage = (id, name) => {
    const subCategory = allSubCategory.find(sub => {
      const filter = sub.category.some(cat => {
        return cat._id === id
      })
      return filter ? true : null
    })
      const url = `/${valideURLConverd(name)}-${id}/${valideURLConverd(subCategory.name)}-${subCategory._id}`;
      navigate(url);
  }

  return (
    <section className='bg-white'>
      <div className='container mx-auto'>
        <div className={`min-h-48 bg-slate-200 w-full h-full rounded ${!banner && 'animate-pulse'} my-2`}>
          <img
            src={banner}
            alt='banner'
            className='w-full h-full hidden md:block'
          />
          <img
            src={banner2}
            alt='banner-mobile'
            className='w-full h-full md:hidden block'
          />
        </div>
      </div>
      {/* <h2 className='font-bold text-lg my-2 container mx-auto'>Welcome to our store</h2> */}
      {/* display all category */}
      <div className='container mx-auto px-4 my-2 grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-2'>
        {
          lodingCategory ? (
            new Array(10).fill(0).map((item, index) => (
              <div key={index+"loadingCategory"} className='bg-white rounded p-4 min-h-36 flex flex-col justify-between animate-pulse
                                            shadow'>
                <div className='bg-blue-100 h-20 rounded'></div>
                <div className='bg-blue-100 h-6 rounded'></div>
              </div>
            ))
          ):(
            allCategory.map((item, index) => (
              <div 
                key={index+"allCategoryHome"} 
                className='bg-white rounded p-4 min-h-36 flex flex-col justify-between shadow hover:transform hover:scale-110 duration-500'
                onClick={() => hendleRedirectProductListPage(item._id, item.name)}
              >
                <div className=' rounded'>
                  <img src={item.image} alt={item.name} className='w-full h-full object-contain' />
                </div>
                <div className=' rounded'>
                  <p className='text-center text-sm md:text-base'>{item.name}</p>
                </div>
              </div>
            ))
          )
        }
      </div>
      {/* display category product */}
      {
        allCategory.length > 0 && (
          allCategory.map((item, index) => (
            <VerticalCardProduct key={index+"allCategoryHome"} name={item?.name} id={item?._id} />
          ))
        )
          
      }
    </section>
  )
}

export default Home