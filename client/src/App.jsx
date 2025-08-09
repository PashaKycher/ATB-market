import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { fetchUserDitails } from './utils/fetchUserDitails';
import { setUserDetails } from './store/userSlice'
import { useDispatch } from 'react-redux';
import Axios from './utils/Axios';
import AxiosTostError from './utils/AxiosTostError';
import SummaryApi from './common/SummaryApi';
import { setAllCategory, setSubCategory, setLoadingCategory } from './store/productSlice';
import { hendleAddToCartStore } from './store/cartProductSlice'
import Context from './context';
import { useSelector } from 'react-redux';
import CartMobileLink from './components/CartMobileLink';
import { hendleAddAddressStore } from './store/addressSlice';
import { setOrder } from './store/orderSlice';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  // check if user is logged in
  const fetchUser = async () => {
    const userData = await fetchUserDitails();
    dispatch(setUserDetails(userData.data));
  }
  const fetchCategories = async () => {
    try {
      dispatch(setLoadingCategory(true))
      const response = await Axios({ ...SummaryApi.allCategory });
      const { data: responseData } = response;
      if (responseData.succsess) {
        dispatch(setAllCategory(responseData.data))
      }
    } catch (error) {
      AxiosTostError(error)
    } finally {
      dispatch(setLoadingCategory(false))
    }
  }
  const fetchSubCategories = async () => {
    try {
      const response = await Axios({ ...SummaryApi.allSubCategory });
      const { data: responseData } = response;
      if (responseData.succsess) {
        dispatch(setSubCategory(responseData.data))
      }
    } catch (error) {
      AxiosTostError(error)
    }
  }
  const fetchCartItems = async () => {
    try {
      const response = await Axios({ ...SummaryApi.getCart });
      const { data: responseData } = response;
      if (responseData.succsess) {
        dispatch(hendleAddToCartStore(responseData.data))
      } else {
        dispatch(hendleAddToCartStore([]))
      }
    } catch (error) {
      console.log(error);
    }
  }
  const fetchAddress = async () => {
    try {
      const response = await Axios({ ...SummaryApi.getAddress });
      const { data: responseData } = response;
      if (responseData.succsess) {
        dispatch(hendleAddAddressStore(responseData.data))
      } else {
        dispatch(hendleAddAddressStore([]))
      }
    } catch (error) {
      console.log(error)
    }
  }
  const fetchOrder = async () => {
    try {
      const response = await Axios({ ...SummaryApi.getOrderList });
      const { data: responseData } = response;
      if (responseData.succsess) {
        dispatch(setOrder(responseData.data))
      } else {
        dispatch(setOrder([]))
      }
    } catch (error) {
      console.log(error)
    }
  }
  const updateQty = async (id, quantity) => {
    try {
      const response = await Axios({
        ...SummaryApi.updateCartItemQuantity,
        data: {
          _id: id,
          qty: quantity
        }
      });
      const { data: responseData } = response;
      if (responseData.succsess) {
        toast.success(responseData.message)
        fetchCartItems()
      }
    } catch (error) {
      AxiosTostError(error)
    }
  }
  const deleteItem = async (id) => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCart,
        data: {
          _id: id
        }
      });
      const { data: responseData } = response;
      if (responseData.succsess) {
        toast.success(responseData.message)
        fetchCartItems()
      }
    } catch (error) {
      AxiosTostError(error)
    }
  }
  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
    fetchUser();
    fetchCartItems();
    fetchAddress();
    fetchOrder();
  }, [])
  // total item and total price
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPriceNoDis, setTotalPriceNoDis] = useState(0);
  const cartItem = useSelector(state => state.cartItem.cart)
  useEffect(() => {
    let NoDisTotal = 0;
    let total = 0;
    let quantity = 0;
    cartItem.forEach(item => {
      const price = item.productId.price - (item.productId.price * item.productId.discount / 100)
      total += price * item.quantity;
      quantity += item.quantity;
      NoDisTotal += item.productId.price * item.quantity
    });
    setTotalPrice(total.toFixed(2));
    setTotalQuantity(quantity);
    setTotalPriceNoDis(NoDisTotal.toFixed(2));
  }, [cartItem]);

  return (
    // category ditails fetch in context
    <Context.Provider value={{
      fetchCategories, fetchSubCategories, fetchCartItems, updateQty, deleteItem, fetchAddress, fetchOrder,
      totalPrice, totalQuantity, totalPriceNoDis
    }} >
      <Header />
      <main className='min-h-[79.5vh]'>
        <Outlet />
      </main>
      <Footer />
      <Toaster
        position="top-left"
        reverseOrder={false}
      />
      {
        (location.pathname !== '/checkout') &&
        <CartMobileLink />
      }
    </Context.Provider>
  )
}

export default App
