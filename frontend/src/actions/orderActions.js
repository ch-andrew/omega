import axios from 'axios'

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'ORDER_CREATE_REQUEST',
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/orders`, 
            order,
            config
        )

        dispatch({
            type: 'ORDER_CREATE_SUCCESS',
            payload: data
        })
    } catch (error) {
        dispatch({
            type: 'ORDER_CREATE_FAILED',
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'ORDER_DETAILS_REQUEST',
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/orders/${id}`, config)

        dispatch({
            type: 'ORDER_DETAILS_SUCCESS',
            payload: data
        })
    } catch (error) {
        dispatch({
            type: 'ORDER_DETAILS_FAILED',
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'ORDER_PAY_REQUEST',
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }
        
        const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config)

        dispatch({
            type: 'ORDER_PAY_SUCCESS',
            payload: data
        })
    } catch (error) {
        console.log(error);
        dispatch({
            type: 'ORDER_PAY_FAILED',
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const listMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'MY_ORDER_LIST_REQUEST',
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization : `Bearer ${userInfo.token}`
            }
        }
        
        const { data } = await axios.get(`/api/orders/myorders`, config)

        dispatch({
            type: 'MY_ORDER_LIST_SUCCESS',
            payload: data
        })
    } catch (error) {
        console.log(error);
        dispatch({
            type: 'MY_ORDER_LIST_FAILED',
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const listOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'ORDER_LIST_REQUEST',
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization : `Bearer ${userInfo.token}`
            }
        }
        
        const { data } = await axios.get(`/api/orders`, config)

        const today = new Date().toISOString().substring(0, 10)

        const todaySaleOrders = data.filter(order => order.createdAt.substring(0, 10) === today && order.isPaid)

        const soldItems = []

        data.forEach(order => {
            order.orderItems.forEach(item => {
                for (let i = 0; i < item.qty; i++) {
                    soldItems.push(item.name)
                }
            })
        })

        const counts = {}

        soldItems.forEach(item => {
            counts[item] = (counts[item] || 0) + 1; 
        })

        dispatch({
            type: 'ORDER_LIST_SUCCESS',
            payload: {
                todaySaleOrders,
                orders: data,

            }
        })
    } catch (error) {
        console.log(error);
        dispatch({
            type: 'ORDER_LIST_FAILED',
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const deliverOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'ORDER_DELIVER_REQUEST',
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization : `Bearer ${userInfo.token}`
            }
        }
        
        const { data } = await axios.put(`/api/orders/${order._id}/deliver`, {}, config)

        dispatch({
            type: 'ORDER_DELIVER_SUCCESS',
            payload: data
        })
    } catch (error) {
        dispatch({
            type: 'ORDER_DELIVER_FAILED',
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}