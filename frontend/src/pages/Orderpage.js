import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Button, Container, Row, Col, ListGroup, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { deliverOrder, getOrderDetails, payOrder } from '../actions/orderActions'

const Orderpage = ({ match }) => {
    const history = useHistory()
    const orderId = match.params.id

    const [sdkReady, setSdkReady] = useState(false)

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const orderDetails = useSelector(state => state.orderDetails)
    const { loading, order, error} = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading : loadingPay, success : successPay} = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading : loadingDeliver, success : successDeliver} = orderDeliver

    // Calculate Prices
    if(!loading){

        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }
    
        order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    }


    useEffect(() => {
        if(!userInfo){
            history.push('/login')
        }

        const addPaypalScript = async () => {
            const {data : clientId} = await axios.get(`/api/config/paypal`) 
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }
        
        if(!order || successPay || successDeliver || order._id !== orderId){
            dispatch(getOrderDetails(orderId))
            dispatch({type: 'ORDER_PAY_RESET'})
            dispatch({type: 'ORDER_DELIVER_RESET'})
        }
        
        else if (!order.isPaid){
            if(!window.paypal){
                addPaypalScript()
            }
            else {
                setSdkReady(true)
            }
        }
    },[dispatch, orderId, successPay, successDeliver, order, userInfo, history])

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }


    return (

        <Container fluid className="py-5 bg-secondary montserrat-bold">
            <Container>
                {loading ? 
                    <Loader/> : 
                    error ? 
                    <Message variant="danger">{error}</Message> : 
                <>  
                    <Row>
                        <Col md={8}>
                            <div 
                                className="bg-black text-white" 
                                style={{padding: '1rem 1.25rem',  cursor: 'pointer'}}>
                                <h2>Order {order._id}</h2>
                            </div>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h2>Shipping</h2>
                                    <p>
                                        <strong>Name: </strong> {order.user.name}
                                    </p>
                                    <p>
                                        <strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                                    </p>
                                    <p>
                                        <strong>Address: </strong>
                                        {order.shippingAddress.address}, {order.shippingAddress.city}{' '}{order.shippingAddress.postalCode}, {' '}{order.shippingAddress.country}
                                    </p>
                                    {order.isDelivered ? <Message variant='success'>Delivered on {order.deliveredAt}</Message> : <Message variant="danger">Not Delivered</Message>}
                                </ListGroup.Item>

                                <ListGroup.Item>
                                        <h2>Payment Method</h2>
                                    <p>
                                        <strong>Method:</strong>
                                        {order.paymentMethod}
                                    </p>
                                    {order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message> : <Message variant="danger">Not Paid</Message>}
                                </ListGroup.Item>

                                <ListGroup.Item>
                                        <h2>Order</h2>
                                    {
                                        order.orderItems.length === 0 
                                        ? 
                                        <Message>Your cart is empty</Message>
                                        :
                                        (
                                            <ListGroup variant="flush">
                                                {order.orderItems.map((item, index) => (
                                                    <ListGroup.Item key={index}>
                                                        <Row>
                                                            <Col md={1}>
                                                                <Image src={item.image} alt={item.name} fluid rounded/>
                                                            </Col>
                                                            <Col>
                                                                <Link to={`/product/${item.product}`}>
                                                                    {item.name}
                                                                </Link>
                                                            </Col>
                                                            <Col md={4}>
                                                                {item.qty} x {`$${item.price}`} = {`$${item.qty * item.price}`}
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                        )
                                    }
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={4}>
                            <ListGroup variant="flush" className="mb-4">
                                <ListGroup.Item className="bg-black text-white" style={{padding: '1rem 1.25rem'}}>
                                    <h2>Order Summary</h2>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Item</Col>
                                        <Col>{`$${order.itemsPrice}`}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping</Col>
                                        <Col>{`$${order.shippingPrice}`}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col>{`$${order.taxPrice}`}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total</Col>
                                        <Col>{`$${order.totalPrice}`}</Col>
                                    </Row>
                                </ListGroup.Item>

                                {error && 
                                    (
                                        <ListGroup.Item>
                                            <Message variant="danger">
                                                {error}
                                            </Message>
                                        </ListGroup.Item>
                                    )
                                }

                                {!order.isPaid && (
                                    <ListGroup.Item>
                                        {loadingPay && <Loader/>}
                                        {!sdkReady ? <Loader/> : (
                                            <PayPalButton 
                                            amount={order.totalPrice} 
                                            onSuccess={successPaymentHandler}></PayPalButton>
                                            )}
                                    </ListGroup.Item>
                                )}

                                {loadingDeliver && <Loader/>}
                                {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && 
                                    (
                                        <ListGroup.Item className="d-grid gap-2">
                                            <Button type="button" onClick={deliverHandler}>
                                                Mark as Delivered
                                            </Button>
                                        </ListGroup.Item>
                                    )
                                }
                            </ListGroup>
                        </Col>
                    </Row>
                </>}
            </Container>
        </Container>        
    )
}

export default Orderpage
 