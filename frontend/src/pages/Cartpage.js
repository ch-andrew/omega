import React , {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Row, Col, ListGroup, Image, Button } from 'react-bootstrap'
// import Loader from '../components/Loader'
import Message from '../components/Message'
import { removeFromCart } from '../actions/cartActions'

const Cartpage = ({ history }) => {

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    useEffect(() => {
    }, [dispatch])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=checkout')
    }

    return (
        <Container fluid className="py-5 bg-secondary montserrat-bold" style={{height: '50rem'}}>
            <Container>
                <Row>
                    <Col md={8}>
                        <h2 className="bg-black text-white" style={{padding: '1rem 1.25rem'}}>Shopping Cart</h2>
                        {cartItems.length === 0 
                        ? 
                        <Message>
                        Your cart is empty.
                            <Link to="/" className='primary-link'>
                                {' '}Go Back
                            </Link>
                        </Message> 
                        : (
                        <ListGroup variant='flush'>
                            {cartItems.map(item => {
                                return (
                                    <ListGroup.Item key={item.productId + item.size} >
                                        <Row>
                                            <Col md={3}>
                                                <Image src={item.image} alt={item.name} fluid rounded/>
                                            </Col>
                                            <Col md={6}>
                                                <Link to={`/product/${item.productId}`}>
                                                    <h3>
                                                        {item.name}
                                                    </h3>
                                                </Link>
                                                <h4 className="m-0">{`$${item.price}`}</h4>
                                                <h4 className="m-0">{`${item.gender}'s ${item.category}`}</h4>
                                                <h4 className="m-0">{`Color : ${item.color}`}</h4>
                                                <h4 className="m-0">{`Size : ${item.size.substring(4)}`}</h4>
                                            </Col>
                                            <Col md={3}>
                                                {item.qty}
                                                <Button 
                                                    type="button" 
                                                    variant="light" 
                                                    onClick={() => removeFromCartHandler(item.variantId + item.size)}>
                                                    <i className="fas fa-trash"></i>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )
                            })}
                        </ListGroup>)}
                    </Col>
                    <Col md={4}>
                        <h2 className="bg-black text-white" style={{padding: '1rem 1.25rem'}}>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                        <ListGroup variant="flush">
                            <ListGroup.Item className="d-grid gap-2">
                                <h2>${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</h2>
                                <Button 
                                    type="button" 
                                    className="btn-block" 
                                    size="lg"
                                    disabled={cartItems.length === 0} 
                                    onClick={checkoutHandler}>
                                        Checkout
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}

export default Cartpage
