import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import CatdLoading from '../components/CatdLoading'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'
import AxiosTostError from '../utils/AxiosTostError'
import CartProduct from '../components/CartProduct'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useLocation } from 'react-router-dom'
import NoData from '../components/NoData'

const SearchPage = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const loadingArray = new Array(10).fill(null)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [totalPageCount, setTotalPageCount] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [search, setSearch] = useState('')
  const location = useLocation()
  const searchText = location.search.slice(3)

  const fetchProductData = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.searchProduct,
        data: {
          page: page,
          limit: limit,
          search: searchText
        }
      })
      const { data: responseData } = response
      if (responseData.succsess) {
        if (responseData.page === 1) {
          setData(responseData.data)
        } else {
          setData((prevData) => [...prevData, ...responseData.data])
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
  }, [page, limit, searchText])

  return (
    <section className='bg-white'>
      <div className='container mx-auto p-4'>
        <p className='font-semibold'>Search Resullts: {data.length}</p>
        <div >
          <InfiniteScroll
            dataLength={data.length}
            next={() => setPage(page + 1)}
            hasMore={page < totalPageCount}
            loader={<Loading />}
            className='p-4 grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'
          >
            {
              data.map((item, index) => {
                return (
                  <CartProduct key={index + "searchPageProduct" + item._id} data={item} />
                )
              })
            }
          </InfiniteScroll>
          {
            data.length === 0 && !loading && (
              <div className='bg-white w-fit mx-auto h-full'>
                <NoData />
                <p className='text-center font-semibold mt-2'>No Data Found</p>
              </div>
            )
          }
          {
            loading && (
              <div className='p-4 grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                {
                  loadingArray.map((item, index) => {
                    return (
                      <CatdLoading key={index + "loadingSearchPage"} />
                    )
                  })
                }
              </div>
            )
          }
        </div>
      </div>
    </section>
  )
}

export default SearchPage