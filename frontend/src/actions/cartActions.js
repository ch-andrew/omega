import axios from "axios"

export const addToCart = (id, color, size, qty) => async (dispatch, getState) => {  
    // GET PRODUCT BY ID
    const {data: productData} = await axios.get(`/api/products/${id}`)
    
    // GET VARIANTS OF PRODUCT BY PRODUCT ID
    const {data: variantData} = await axios.get(`/api/variants/${id}`)

    const productVariant =  await variantData.find(variant => variant.color === color)

    dispatch({
        type: 'CART_ADD_ITEM',
        payload: {
            productId: productVariant.productId,
            variantId: productVariant._id,
            name: productData.name,
            category: productData.category,
            gender: productData.gender,
            price: productData.price,
            color: productVariant.color,
            image: productVariant.image,
            size,
            qty
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => async (dispatch,getState) => {

    dispatch({
        type: 'CART_REMOVE_ITEM',
        payload: id
    })

    localStorage.setItem('cartItems' , JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => async (dispatch) => {

    dispatch({
        type: 'CART_SAVE_SHIPPING_ADDRESS',
        payload: data
    })

    localStorage.setItem('shippingAddress' , JSON.stringify(data))
}

export const savePaymentMethod = (data) => async (dispatch) => {

    dispatch({
        type: 'CART_SAVE_PAYMENT_METHOD',
        payload: data
    })

    localStorage.setItem('paymentMethod' , JSON.stringify(data))
}