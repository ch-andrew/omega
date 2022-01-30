import React, { useState } from 'react'
import { Container, Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../actions/cartActions'

const Paymentpage = ({history, steps}) => {
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    if(!shippingAddress){
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('Paypal')
    

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        steps()
    }
    
    return (
        <Container className="bg-white p-5">
            <Form onSubmit={submitHandler}>
                <Form.Group className="my-2">
                    <Form.Label as='legend'>
                        Select Method 
                    </Form.Label>
                    <Col>
                        <Form.Check 
                            type='radio' 
                            label='Paypal or Credit Card' 
                            id='paypal' 
                            name='paymentMethod' 
                            value='Paypal' 
                            checked 
                            onChange={(e) => setPaymentMethod(e.target.value)}>
                        </Form.Check>
                        <Form.Check 
                            type='radio' 
                            label='Stripe' 
                            id='stripe' 
                            name='paymentMethod' 
                            value='Stripe' 
                            checked 
                            onChange={(e) => setPaymentMethod(e.target.value)}>
                        </Form.Check>
                    </Col>
                </Form.Group>
                <Button type='submit' variant='primary' onClick={submitHandler}>
                    Continue
                </Button>
            </Form>
        </Container>
    )
}

export default Paymentpage
