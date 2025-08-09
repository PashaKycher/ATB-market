
export const baseUrl = import.meta.env.VITE_BASE_URL;

const SummaryApi = {
    // upload file
    upload: {
        url: '/api/file/upload',
        method: 'POST'
    },
    // user
    register: {
        url: '/api/user/register',
        method: 'POST'
    },
    login: {
        url: '/api/user/login',
        method: 'POST'
    },
    forgetPassword: {
        url: '/api/user/forget-password',
        method: 'PUT'
    },
    verifyOptPassword: {
        url: '/api/user/verify-forget-password-otp',
        method: 'PUT'
    },
    resetPassword: {
        url: '/api/user/reset-password',
        method: 'PUT'
    },
    refreshToken: {
        url: '/api/user/refresh-token',
        method: 'POST'
    },
    userDitails: {
        url: '/api/user/user-ditails',
        method: 'GET'
    },
    userLogout: {
        url: '/api/user/logout',
        method: 'GET'
    },
    uploadAvatar: {
        url: '/api/user/upload-avatar',
        method: 'PUT'
    },
    updateUser: {
        url: '/api/user/update-user',
        method: 'PUT'
    },
    // category
    addCategory: {
        url: '/api/category/add-category',
        method: 'POST'
    },
    allCategory: {
        url: '/api/category/all-category',
        method: 'GET'
    },
    updateCategory: {
        url: '/api/category/update-category',
        method: 'PUT'
    },
    deleteCategory: {
        url: '/api/category/delete-category',
        method: 'DELETE'
    },
    // sub category
    addSubCategory: {
        url: '/api/sub-category/add-sub-category',
        method: 'POST'
    },
    allSubCategory: {
        url: '/api/sub-category/all-sub-category',
        method: 'GET'
    },
    updateSubCategory: {
        url: '/api/sub-category/update-sub-category',
        method: 'PUT'
    },
    deleteSubCategory: {
        url: '/api/sub-category/delete-sub-category',
        method: 'DELETE'
    },
    // product
    addProduct: {
        url: '/api/product/add-product',
        method: 'POST'
    },
    allProduct: {
        url: '/api/product/all-product',
        method: 'POST'
    },
    updateProduct: {
        url: '/api/product/update-product',
        method: 'PUT'
    },
    deleteProduct: {
        url: '/api/product/delete-product',
        method: 'DELETE'
    },
    //get product by Category
    getProductByCategory: {
        url: '/api/product/product-by-category',
        method: 'POST'
    },
    // get product by Category and subCategory
    getProductByCategoryAndSubCategory: {
        url: '/api/product/product-by-category-&-sub-category',
        method: 'POST'
    },
    // get product by Id
    getProductById: {
        url: '/api/product/product-by-id',
        method: 'POST'
    },
    // search product
    searchProduct: {
        url: '/api/product/search-product',
        method: 'POST'
    },
    // add to cart
    addToCart: {
        url: '/api/cart/add-product-to-cart',
        method: 'POST'
    },
    // get cart
    getCart: {
        url: '/api/cart/get-cart',
        method: 'GET'
    },
    // update quantity
    updateCartItemQuantity: {
        url: '/api/cart/update-qty',
        method: 'PUT'
    },
    // delete cart
    deleteCart: {
        url: '/api/cart/delete-cart',
        method: 'DELETE'
    },
    // add address
    addAddress: {
        url: '/api/address/add-address',
        method: 'POST'
    },
    // get address
    getAddress: {
        url: '/api/address/all-address',
        method: 'GET'
    },
    // update address
    updateAddress: {
        url: '/api/address/update-address',
        method: 'PUT'
    },
    // delete address
    deleteAddress: {
        url: '/api/address/delete-address',
        method: 'DELETE'
    },
    // cash on delivery
    cashOnDelivery: {
        url: '/api/order/cash-on-delivery',
        method: 'POST'
    },
    // online payment
    onlinePayment: {
        url: '/api/order/online-payment',
        method: 'POST'
    },
    // get order list
    getOrderList: {
        url: '/api/order/get-order-list',
        method: 'GET'
    }
}

export default SummaryApi