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
                            label='Paypal' 
                            id='paypal' 
                            name='paymentMethod' 
                            value='Paypal' 
                            checked 
                            onChange={(e) => setPaymentMethod(e.target.value)}>
                        </Form.Check>
                    </Col>
                </Form.Group>
                <div className='d-grid gap-2'>
                    <Button type='submit' variant='primary' size='lg' onClick={submitHandler}>
                        Continue
                    </Button>
                </div>
            </Form>
        </Container>
    )
}

export default Paymentpage
