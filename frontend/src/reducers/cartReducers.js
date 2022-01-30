export const cartReducers = (state = {cartItems: []}, action) => {
    switch(action.type){
        case 'CART_ADD_ITEM':
            const item = action.payload

            const existItem = state.cartItems.find(x => x.variantId === item.variantId && x.size === item.size)
        
            if(existItem){
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.variantId === existItem.variantId ? item : x)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case 'CART_REMOVE_ITEM':
            return{
                ...state,
                cartItems: state.cartItems.filter(x => x.variantId + x.size !== action.payload)
            }
        case 'CART_RESET_ITEM':
            return {
                ...state,
                cartItems: [],
            }
        case 'CART_SAVE_SHIPPING_ADDRESS':
            return{
                ...state,
                shippingAddress: action.payload
            }
        case 'CART_SAVE_PAYMENT_METHOD':
            return{
                ...state,
                paymentMethod: action.payload
            }
        default:
            return state
    }

}