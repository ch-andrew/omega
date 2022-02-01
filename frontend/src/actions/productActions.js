import axios from 'axios'

export const listProducts = (keyword = '', pageSize = '' , pageNumber = '',  gender = '' ,category = '') => async (dispatch) => {
    try {
        dispatch({type: 'PRODUCT_LIST_REQUEST'})

         // GET ALL PRODUCTS
        const { data: productData } = await axios.get(`/api/products/?keyword=${keyword}&pageSize=${pageSize}&pageNumber=${pageNumber}&gender=${gender}&category=${category}`)

        // GET ALL VARIANTS
        const { data: variantData} = await axios.get(`/api/variants`)

        const { categories, products, pages, page } = productData

        // GET EACH PRODUCT + DEFAULT IMAGE OF EACH VARIANTS
        const allProductsData = products.map(product => {
            const { image } = variantData.find(variant => product._id === variant.productId && product.defaultColor === variant.color) 
            return {...product, image, createdAt: product.createdAt.substring(0, 10), updatedAt: product.updatedAt.substring(0, 10)}
        })


        dispatch({
            type: 'PRODUCT_LIST_SUCCESS',
            payload: {
                categories,
                products: allProductsData,
                pages: pages,
                page: page
            }
        })

    } catch (error) {
        dispatch({
            type:'PRODUCT_LIST_FAILED',
            payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message,
        })
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: 'PRODUCT_DETAILS_REQUEST'})

        // GET PRODUCT BY ID
        const { data: productData } = await axios.get(`/api/products/${id}`)

        // GET VARIANT BY ID
        const { data: variantData} = await axios.get(`/api/variants/${id}`)

        // MERGE OBJECT OF VARIANTS + STOCK 
        const productVariant =  await variantData.find(variant => variant.color === productData.defaultColor)

        dispatch({
            type: 'PRODUCT_DETAILS_SUCCESS',
            payload: {
                product: productData,
                variants: variantData,
                variant: productVariant
            }
        })

    } catch (error) {
        dispatch({
            type: 'PRODUCT_DETAILS_FAILED',
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const listVariants = () => async (dispatch) => {
    try {
        dispatch({type: 'VARIANT_LIST_REQUEST'})

        // GET ALL VARIANTS
        const { data } = await axios.get(`/api/variants`)

        dispatch({
            type: 'VARIANT_LIST_SUCCESS',
            payload: data
        })

    } catch (error) {
        dispatch({
            type:'VARIANT_LIST_FAILED',
            payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message,
        })
    }
}

export const createVariant = (id, color, colorCodes, image, stock) => async (dispatch, getState) => {
    try {
        dispatch({type: 'VARIANT_CREATE_REQUEST'})

        const { userLogin : { userInfo } } = getState()

        const variant = {
            productId: id,
            color,
            colorCodes,
            image,
            stock

        }

        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/variants`, variant, config)

        dispatch({
            type: 'VARIANT_CREATE_SUCCESS',
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: 'VARIANT_CREATE_FAILED',
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const deleteVariant = (id) => async (dispatch, getState) => {

    try {
        dispatch({
            type: 'VARIANT_DELETE_REQUEST',
        })

        const { userLogin : { userInfo } } = getState()

        const config = {
            headers: {
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/variants/${id}`, config)
        
        dispatch({
            type: 'VARIANT_DELETE_SUCCESS',
        })

    }

    catch(error) {
        dispatch({
            type: 'VARIANT_DELETE_FAILED',
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const updateVariant = (variant) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'VARIANT_UPDATE_REQUEST',
        })

        const { userLogin : { userInfo } } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/products/${variant._id}`, variant, config)
        
        dispatch({
            type: 'VARIANT_UPDATE_SUCCESS',
            payload: data
        })

    }

    catch(error) {
        dispatch({
            type: 'VARIANT_UPDATE_FAILED',
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const updateStock = (id, operator, size) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'VARIANT_UPDATE_REQUEST',
        })

        const { userLogin : { userInfo } } = getState()

        const operation = {
            operator,
            size
        }

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/variants/${id}`, operation, config)
        
        dispatch({
            type: 'VARIANT_UPDATE_SUCCESS',
            payload: data
        })

    }

    catch(error) {
        dispatch({
            type: 'VARIANT_UPDATE_FAILED',
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const createProduct = (name, description, category, gender, price, color, colorCodes, image, stock) => async (dispatch, getState) => {
    try {
        dispatch({type: 'PRODUCT_CREATE_REQUEST'})

        const { userLogin : { userInfo } } = getState()

        const product = {
            name,
            description,
            category,
            gender,
            price,
            defaultColor: color
        }

        console.log(product);
        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data: productData } = await axios.post(`/api/products`, product, config)

        console.log(productData);

        await dispatch(createVariant(productData._id, color, colorCodes, image, stock))

        dispatch({
            type: 'PRODUCT_CREATE_SUCCESS',
            payload: productData,
        })

    } catch (error) {
        dispatch({
            type: 'PRODUCT_CREATE_FAILED',
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const deleteProduct = (id) => async (dispatch, getState) => {

    try {
        dispatch({
            type: 'PRODUCT_DELETE_REQUEST',
        })

        const { userLogin : { userInfo } } = getState()

        const config = {
            headers: {
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/products/${id}`, config)
        
        dispatch({
            type: 'PRODUCT_DELETE_SUCCESS',
        })

    }

    catch(error) {
        dispatch({
            type: 'PRODUCT_DELETE_FAILED',
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const updateProduct = (id, name, description, category, gender, price, color) => async (dispatch, getState) => {
    try { 
        dispatch({
            type: 'PRODUCT_UPDATE_REQUEST',
        })

        const { userLogin : { userInfo } } = getState()

        const product = {
            name,
            description,
            category,
            gender,
            price,
            defaultColor: color
        }

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/products/${id}`, product, config)
        
        dispatch({
            type: 'PRODUCT_UPDATE_SUCCESS',
            payload: data
        })

    }

    catch(error) {
        dispatch({
            type: 'PRODUCT_UPDATE_FAILED',
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}