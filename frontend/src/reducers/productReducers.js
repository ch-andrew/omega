export const productListReducer = (
    state = {products: []}, 
    action) => {
    switch(action.type){
        case 'PRODUCT_LIST_REQUEST':
            return { loading: true, products: [] }
        case 'PRODUCT_LIST_SUCCESS':
            return { loading: false,categories: action.payload.categories, products: action.payload.products, pages: action.payload.pages, page: action.payload.page}
        case 'PRODUCT_LIST_FAILED':
            return {loading: false, error: action.payload}
        default:
            return state
    }   
}

export const productDetailsReducer = (
    state = {product: [], variants: []}, 
    action) => {
    switch(action.type){
        case 'PRODUCT_DETAILS_REQUEST':
            return { loading: true, ...state}
        case 'PRODUCT_DETAILS_SUCCESS':
            return { loading: false, product: action.payload.product, variants: action.payload.variants, variant: action.payload.variant}
        case 'PRODUCT_DETAILS_FAILED':
            return {loading: false, error: action.payload}
        default:
            return state
    }   
}

export const variantListReducer = (
    state = {variants: []}, 
    action) => {
    switch(action.type){
        case 'VARIANT_LIST_REQUEST':
            return { loading: true, variants: []}
        case 'VARIANT_LIST_SUCCESS':
            return { loading: false, variants: action.payload}
        case 'VARIANT_LIST_FAILED':
            return {loading: false, error: action.payload}
        default:
            return state
    }   
}

export const variantCreateReducer = (state = {}, action) => {
    switch(action.type) {
        case 'VARIANT_CREATE_REQUEST':
            return {loading : true}
        case 'VARIANT_CREATE_SUCCESS':
            return {loading: false, success: true, product: action.payload}
        case 'VARIANT_CREATE_FAILED':
            return {loading: false, error: action.payload}
        case 'VARIANT_CREATE_RESET':
            return {}
        default:
            return state
    }
}

export const variantDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case 'VARIANT_DELETE_REQUEST':
            return {loading : true}      
        case 'VARIANT_DELETE_SUCCESS':
            return {loading: false, success: true}
        case 'VARIANT_DELETE_FAILED':
            return {loading: false, error: action.payload}   
        case 'VARIANT_DELETE_RESET':
            return {variant: {}} 
        default:
            return state;
    }
}

export const variantUpdateReducer = (state = {variant: {}}, action) => {
    switch(action.type) {
        case 'VARIANT_UPDATE_REQUEST':
            return {loading : true}
        case 'VARIANT_UPDATE_SUCCESS':
            return {loading: false, success: true, variant: action.payload}
        case 'VARIANT_UPDATE_FAILED':
            return {loading: false, error: action.payload}
        case 'VARIANT_UPDATE_RESET':
            return { variant: {}}
        default:
            return state
    }
}

export const productCreateReducer = (state = {}, action) => {
    switch(action.type) {
        case 'PRODUCT_CREATE_REQUEST':
            return {loading : true}
        case 'PRODUCT_CREATE_SUCCESS':
            return {loading: false, success: true, product: action.payload}
        case 'PRODUCT_CREATE_FAILED':
            return {loading: false, error: action.payload}
        case 'PRODUCT_CREATE_RESET':
            return {}
        default:
            return state
    }
}

export const productDeleteReducer = (state = {}, action) => {
    switch(action.type) {
        case 'PRODUCT_DELETE_REQUEST':
            return {loading : true}
        case 'PRODUCT_DELETE_SUCCESS':
            return {loading: false, success: true, product: action.payload}
        case 'PRODUCT_DELETE_FAILED':
            return {loading: false, error: action.payload}
        case 'PRODUCT_DELETE_RESET':
            return {}
        default:
            return state
    }
}

export const productUpdateReducer = (state = {product: {}}, action) => {
    switch(action.type) {
        case 'PRODUCT_UPDATE_REQUEST':
            return {loading : true}
        case 'PRODUCT_UPDATE_SUCCESS':
            return {loading: false, success: true, product: action.payload}
        case 'PRODUCT_UPDATE_FAILED':
            return {loading: false, error: action.payload}
        case 'PRODUCT_UPDATE_RESET':
            return { product: {}}
        default:
            return state
    }
}