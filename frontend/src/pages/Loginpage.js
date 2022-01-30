import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Button, Form} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const Loginpage = ({location, history}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const {loading, error, userInfo} = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }
    }, [history, redirect, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        // Dispatch Login
        dispatch(login(email,password))
    }

    return (
        <Container fluid className="py-5 montserrat-bold justify-content-center bg-secondary" style={{height: '50rem'}}>
            <Container className="py-5 bg-light justify-content-center login-form" style={{height: "100%"}}>
                <h1 className="text-center">LOGIN</h1>
                <Form className="mt-5" onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label><i className="fas fa-envelope"></i> Email address</Form.Label>
                        <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label><i className="fas fa-lock"></i> Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>

                    {error && <Message variant='danger'>{error}</Message>}
                    {loading && <Loader />}

                    <div className="d-grid gap-2">
                        {
                            email && password ?
                            <Button variant="primary" type="submit" size="lg">
                                Login
                            </Button>
                            :
                            <Button variant="primary" type="submit" size="lg" disabled>
                                Login
                            </Button>
                        }
                    </div>
                </Form>

                <div className="mt-5 text-center">
                    <h6>
                        New Customer?{' '}
                        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                            Register here
                        </Link>
                    </h6>
                </div>
            </Container>
        </Container>
    )
}

export default Loginpage
