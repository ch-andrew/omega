import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Form, Button, Row, Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'

const Profilepage = ({ location, history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [edit, setEdit] = useState(false)
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const myOrderList = useSelector((state) => state.myOrderList)
    const { loading : loadingOrders, error : errorOrders, orders } = myOrderList

    useEffect(() => {
        if (!userInfo) {
          history.push('/login')
        }

        else {
            console.log(user);
            if(!user.name){
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            }

            else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [history, userInfo, dispatch, user])

    const submitHandler = (e) => {
        e.preventDefault()

        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        }
        
        else {
            // Dispatch Update Profile
            dispatch(updateUserProfile({id: user._id, name, email, password}))
        }
    }

    const editProfile = () => {
        if(edit){
            return (
                <Container className="bg-white p-3">
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name' className="my-2">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='email' className="my-2">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='password' className="my-2">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Enter password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='confirm-password' className="my-2">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Confirm password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                    </Form>
                    <Row>
                        <Col className="d-grid gap-2">
                            <Button type='submit' variant='danger' className="mt-4" style={{color: 'white'}} onClick={() => setEdit(false)}>
                                Cancel
                            </Button>
                        </Col>
                        <Col className="d-grid gap-2">
                            <Button type='submit' variant='primary' className="mt-4" onClick={submitHandler}>
                                Update
                            </Button>
                        </Col>
                    </Row>
                </Container>
            )
        }

        else {
            return (
                <Container className="bg-white p-3">
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'  className="my-2">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter name'
                                value={name}
                                disabled>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='email' className="my-2">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter email'
                                value={email}
                                disabled>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='password' className="my-2">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Enter password'
                                value={password}
                                disabled>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='confirm-password' className="my-2">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Confirm password'
                                value={confirmPassword}
                                disabled>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                    <Row>
                        <Col className="d-grid gap-2">
                            <Button type='submit' variant='warning' className="mt-4" style={{color: 'white'}} onClick={() => setEdit(true)}>
                                Edit
                            </Button>
                        </Col>
                        <Col className="d-grid gap-2">
                            <Button type='submit' variant='primary' className="mt-4" onClick={submitHandler} disabled>
                                Update
                            </Button>
                        </Col>
                    </Row>
                </Container>
            )
        }
    }

    return (
        <Container fluid className="py-5 bg-secondary montserrat-bold">
            <Container style={{height: '50rem'}}>
                <Row>
                    <Col md={4}>
                        <div className="bg-black text-white" style={{padding: '1rem 1.25rem'}}>
                            <h2>User Profile</h2>
                        </div>
                        {message && <Message variant='danger'>{message}</Message>}
                        {error && <Message variant='danger'>{error}</Message>}
                        {success && <Message variant='success'>Profile Updated</Message>}
                        {loading && <Loader />}
                        {editProfile()}
                    </Col>
                    <Col md={8} >
                        <div className="bg-black text-white" style={{padding: '1rem 1.25rem'}}>
                            <h2>My Orders</h2>
                        </div>
                        <Container fluid className="bg-white p-0">
                            {   
                                loadingOrders ?
                                <Loader/> :
                                errorOrders ? 
                                <Message variant="danger">{errorOrders}</Message> : 
                                orders ?
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>DATE</th>
                                            <th>TOTAL</th>
                                            <th>PAID</th>
                                            <th>DELIVERED</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map(order => (
                                            <tr key={order._id}>
                                                <td>{order._id}</td>
                                                <td>{order.createdAt.substring(0, 10)}</td>
                                                <td>{`$${order.totalPrice}`}</td>
                                                <td>
                                                {order.isPaid ? order.paidAt.substring(0, 10) : 
                                                (
                                                    <i className='fas fa-times' style={{color: 'red'}}></i>
                                                )
                                                }
                                                </td>
                                                <td>
                                                {order.isDelivered ? order.deliveredAt.substring(0, 10) : 
                                                (
                                                    <i className='fas fa-times' style={{color: 'red'}}></i>
                                                )
                                                }
                                                </td>
                                                <td>
                                                    <LinkContainer to={`/order/${order._id}`}>
                                                        <Button variant='light'>Details</Button>
                                                    </LinkContainer>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                        :
                                <Message variant="primary" className="my-2">
                                    You don't have any orders yet.
                                    <LinkContainer to="/" className='primary-link'>{' '}Start shopping now</LinkContainer>
                                </Message>
                            }
                        </Container>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}

export default Profilepage
