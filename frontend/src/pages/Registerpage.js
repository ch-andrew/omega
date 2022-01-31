import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Button, Form} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const Registerpage = ({location, history}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    
    
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
        // Dispatch register
        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        }

        else {
            // Dispatch Register
            dispatch(register(name, email, password))
        }
    }

    return (
        <Container fluid className="py-5 montserrat-bold justify-content-center bg-secondary" style={{height: '50rem'}}>
            <Container className="py-5 bg-light justify-content-center login-form" style={{height: "100%"}}>
                <h1 className="text-center">Register</h1>
                <Form className="mt-5" onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label><i className="fas fa-lock"></i> Name</Form.Label>
                        <Form.Control type="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
                    </Form.Group>

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

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label><i className="fas fa-lock"></i> Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                    </Form.Group>
                    {message && <Message variant='danger'>{message}</Message>}
                    {error && <Message variant='danger'>{error}</Message>}
                    {loading && <Loader />}

                    <div className="d-grid gap-2">
                        {
                            name && email && password.length >= 8  && confirmPassword.length >= 8 ?
                            <Button variant="primary" type="submit" size="lg">
                                Register
                            </Button>
                            :
                            <Button variant="primary" type="submit" size="lg" disabled>
                                Register
                            </Button>
                        }
                    </div>
                </Form>
                <div className="mt-5 text-center">
                    <h6>
                        Already have an account?
                        <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                            Login here
                        </Link>
                    </h6>
                </div>
            </Container>
        </Container>
    )
}

export default Registerpage
