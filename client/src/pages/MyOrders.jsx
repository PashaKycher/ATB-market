import React from 'react'
import { useSelector } from 'react-redux'
import valideURLConverd from '../utils/valideURLConverd'
import { Link } from 'react-router-dom'

const MyOrders = () => {
  const order = useSelector(state => state.order.orderList)

  return (
    <div>
      <div className='p-2 shadow-md flex items-center justify-between mb-2'>
        <h2 className='font-semibold'>Order</h2>
      </div>
      <div>
        {
          !order[0] ? <h1>No orders found</h1> : order.map((order) => {
            return (
              <div key={order._id + "order"} className='p-4 text-sm bg-blue-50 rounded shadow-md m-2'>
                <div className='md:flex justify-between pb-2'>
                  <p className='font-semibold p-1'>
                    <span>Order Id: </span>{order.orderId}
                  </p>
                  <p className='text-green-500 p-1'>
                    <span className='font-semibold text-neutral-900'>Order Status: </span>{order.payment_status}
                  </p>
                </div>
                <Link to={`/product/${valideURLConverd(order.productId.name)}-${order.productId._id}`}>
                  <div className='flex gap-3 text-center'>
                    <img
                      src={order.product_details.image}
                      alt={order.product_details.name}
                      className='w-16 h-16 object-cover'
                    />
                    <p className='font-medium'>
                      {order.product_details.name}
                    </p>
                  </div>
                </Link>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default MyOrders