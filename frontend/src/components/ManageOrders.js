import React, {useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Container, Button, Table} from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listOrders } from '../actions/orderActions'


const ManageOrders = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const orderList = useSelector((state) => state.orderList)
    const { loading, error, orders } = orderList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    
    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listOrders())
        }

        else {
            history.push('/')
        }
    }, [dispatch, history, userInfo])

    return (
        <Container fluid className="bg-white p-0">
            {
                loading ?
                <Loader/> :
                error ?
                <Message variant="danger">{error}</Message> :
                <Table striped bordered hover responsive className="m-0">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => {

                            return (
                                <tr key={order._id}>
                                    <td>
                                        {order._id.slice(0, 12)}
                                        <Button type="button" variant="white" onClick={() => {navigator.clipboard.writeText(order._id)}}>
                                            <i className="fas fa-copy"></i>
                                        </Button>
                                    </td>
                                    <td>{order.user && order.user.name}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>{`$${order.totalPrice}`}</td>
                                    <td>
                                        {order.isPaid ? 
                                        (
                                            order.paidAt.substring(0, 10)
                                        ) : 
                                        (
                                            <i className="fas fa-times" style={{ color: "red" }}></i>
                                        )}
                                    </td>
                                    <td>
                                        {order.isDelivered ? 
                                        (
                                            order.deliveredAt.substring(0, 10)
                                        ) : 
                                        (
                                            <i className="fas fa-times" style={{ color: "red" }}></i>
                                        )}
                                    </td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button variant="primary" className="btn-sm">
                                                Details
                                            </Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            }
        </Container>
    )
}

export default ManageOrders
