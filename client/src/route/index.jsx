import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import SearchPage from '../pages/SearchPage'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ForgotPassword from '../pages/ForgotPassword'
import OtpVerification from '../pages/OtpVerification'
import ResetPassword from '../pages/ResetPassword'
import UserMenuMobilePages from '../pages/UserMenuMobilePages'
import Dashboard from '../layouts/Dashboard'
import Profile from '../pages/Profile'
import MyOrders from '../pages/MyOrders'
import SaveAddress from '../pages/SaveAddress'
import CategoryPage from '../pages/CategoryPage'
import SubCategoriPage from '../pages/SubCategoriPage'
import UploadProductPage from '../pages/UploadProductPage'
import AdminPermision from '../layouts/AdminPermision'
import ProductPageAdmin from '../pages/ProductPageAdmin'
import ProductListPage from '../pages/ProductListPage'
import ProductDisplayPage from '../pages/ProductDisplayPage'
import CartMobile from '../pages/CartMobile'
import CheckoutPage from '../pages/CheckoutPage'
import SuccessOrder from '../pages/SuccessOrder'
import CancelOrder from '../pages/CancelOrder'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path: 'search',
                element: <SearchPage />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: 'forgot-password',
                element: <ForgotPassword />
            },
            {
                path: 'verify-otp',
                element: <OtpVerification />
            },
            {
                path: 'reset-password',
                element: <ResetPassword />
            },
            {
                path: 'user-menu-mobile',
                element: <UserMenuMobilePages />
            },
            {
                path: 'dashboard',
                element: <Dashboard />,
                children: [
                    {
                        path: 'profile',
                        element: <Profile />
                    },
                    {
                        path: 'my-orders',
                        element: <MyOrders />
                    },
                    {
                        path: 'save-address',
                        element: <SaveAddress />
                    },
                    {
                        path: 'category',
                        element: <AdminPermision><CategoryPage /></AdminPermision>
                    },
                    {
                        path: 'sub-category',
                        element: <AdminPermision><SubCategoriPage /></AdminPermision>
                    },
                    {
                        path: 'upload-product',
                        element: <AdminPermision><UploadProductPage /></AdminPermision>
                    },
                    {
                        path: 'product',
                        element: <AdminPermision><ProductPageAdmin /></AdminPermision>
                    }
                ]
            },
            {
                path: 'cart',
                element: <CartMobile />
            },
            {
                path: 'checkout',
                element: <CheckoutPage />
            },
            {
                path: 'order-success',
                element: <SuccessOrder />
            },
            {
                path: 'order-cancel',
                element: <CancelOrder />
            },
            {
                path: 'product/:productId',
                element: <ProductDisplayPage />
            },
            {
                path: ':category',
                children: [
                    {
                        path: ':subCategory',
                        element: <ProductListPage />
                    }
                ]
            }
        ]
    }
])

export default router