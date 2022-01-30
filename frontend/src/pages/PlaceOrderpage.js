import React, {useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, ListGroupItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { createOrder } from '../actions/orderActions'

const PlaceOrderpage = () => {
    const dispatch = useDispatch()
    let history = useHistory()

    const cart = useSelector((state) => state.cart)

    // Calculate Prices

    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))

    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 10)

    cart.taxPrice = addDecimals(Number((0.10 * cart.itemsPrice).toFixed(2)))

    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

    

    const orderCreate = useSelector((state) => state.orderCreate)
    const { order , success, error} = orderCreate
    
    useEffect(() => {
        console.log(history);
        if(success){
            history.push(`/order/${order._id}`)
        }
        // eslint-disable-next-line
    },[history, success])
    
    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems : cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice

        }))
        dispatch({type: 'CART_RESET_ITEM'})
    }
    
    return (
        <>
            <ListGroup variant="flush" className="mb-4">
                <ListGroup.Item className="bg-black text-white" style={{padding: '1rem 1.25rem'}}>
                    <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Item</Col>
                        <Col>{`$${cart.itemsPrice}`}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Shipping</Col>
                        <Col>{`$${cart.shippingPrice}`}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Tax</Col>
                        <Col>{`$${cart.taxPrice}`}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Total</Col>
                        <Col>{`$${cart.totalPrice}`}</Col>
                    </Row>
                </ListGroup.Item>

                {error && 
                    (
                        <ListGroupItem>
                            <Message variant="danger">
                                {error}
                            </Message>
                        </ListGroupItem>
                    )
                }

                <ListGroup.Item className="d-grid gap-2">
                    <Button 
                        type="button" 
                        className="btn-block" 
                        size="lg"
                        disabled={cart.cartItems.length === 0} 
                        onClick={placeOrderHandler}>
                        Place Order
                    </Button>
                </ListGroup.Item>
            </ListGroup>

            <ListGroup variant="flush">
                <ListGroup.Item className="bg-black text-white" style={{padding: '1rem 1.25rem'}}>
                    <Row className="align-items-center">
                        <Col>
                            <h2>Items</h2>
                        </Col>
                        <Col className="text-end">
                            <u className="m-0" style={{cursor: 'pointer'}}onClick={() => history.push('/cart')}>edit cart</u>
                        </Col>
                    </Row>
                </ListGroup.Item>
                {
                    cart.cartItems.length === 0 
                    ? 
                    <Message>Your cart is empty</Message>
                    :
                    (
                        <ListGroup variant="flush">
                            {cart.cartItems.map((item, index) => (
                                <ListGroup.Item key={index}>
                                    <Row>
                                        <Col md={4}>
                                            <Image src={item.image} alt={item.name} fluid rounded/>
                                        </Col>
                                        <Col>
                                            <Link to={`/product/${item.product}`} className="primary-link">
                                                {item.name}
                                            </Link>
                                            <p>{item.gender}'s {item.category}</p>
                                            <p>Color: {item.color}</p>
                                            <p>Size: {item.size.substring(4)}</p>
                                            <p>{`$${item.price}`} x {item.qty}</p>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )
                }
            </ListGroup>
        </>
    )
}

export default PlaceOrderpage
