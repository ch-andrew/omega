import axios from 'axios'

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: 'USER_LOGIN_REQUEST'
        })

        const config = {
            headers: {
                'Content-type': 'application/json',
            }
        }

        const { data } = await axios.post(
            `/api/users/login`,
            {email, password},
            config
        )

        dispatch({
            type: 'USER_LOGIN_SUCCESS',
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: 'USER_LOGIN_FAILED',
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    dispatch({
        type: 'USER_LOGOUT'
    })
    dispatch({
        type: 'MY_ORDER_LIST_RESET'
    })
    dispatch({
        type: 'CART_RESET_ITEM'
    })
    dispatch({
        type: 'USER_DETAILS_RESET'
    })
}

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: 'USER_REGISTER_REQUEST',
        })

        const config = {
            headers: {
                'Content-type' : 'application/json'
            }
        }

        const { data } = await axios.post(
            `/api/users`, 
            {name, email, password}, 
            config
        )

        dispatch({
            type: 'USER_REGISTER_SUCCESS',
            payload: data
        })

        dispatch({
            type: 'USER_LOGIN_SUCCESS',
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: 'USER_REGISTER_FAILED',
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: `USER_DETAILS_REQUEST`,
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/users/${id}`, 
            config
        )

        dispatch({
            type: `USER_DETAILS_SUCCESS`,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: `USER_DETAILS_FAILED`,
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: `USER_UPDATE_PROFILE_REQUEST`,
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/users/profile`, 
            user,
            config
        )

        dispatch({
            type: `USER_UPDATE_PROFILE_SUCCESS`,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: `USER_UPDATE_PROFILE_FAILED`,
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: `USER_LIST_REQUEST`,
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/users`, 
            config
        )

        dispatch({
            type: `USER_LIST_SUCCESS`,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: `USER_LIST_FAILED`,
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const updateUser = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'USER_UPDATE_REQUEST'
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/users/${user._id}`, 
            user,
            config
        )

        dispatch({
            type: `USER_UPDATE_SUCCESS`,
        })

        dispatch({
            type: 'USER_DETAILS_SUCCESS',
            payload: data
        })

    } catch (error) {
        dispatch({
            type: 'USER_UPDATE_FAILED',
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const deleteUser = (id) => async (dispatch, getState) => {

    try {
        dispatch({
            type: 'USER_DELETE_REQUEST',
        })

        const { userLogin : { userInfo } } = getState()

        const config = {
            headers: {
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/users/${id}`, config)
        
        dispatch({
            type: 'USER_DELETE_SUCCESS',
        })

    }

    catch(error) {
        dispatch({
            type: 'USER_DELETE_FAILED',
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}
