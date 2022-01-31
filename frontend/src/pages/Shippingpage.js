import React, { useEffect, useState } from 'react'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/cartActions'

const Shippingpage = ({history, steps}) => {
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [country, setCountry] = useState('')

    useEffect(() => {
        if(shippingAddress){
            setName(shippingAddress.name)
            setPhoneNumber(shippingAddress.phoneNumber)
            setAddress(shippingAddress.address)
            setCity(shippingAddress.city)
            setPostalCode(shippingAddress.postalCode)
            setCountry(shippingAddress.country)
        }

        else {

        }
    }, [shippingAddress])


    const listCountry = ['Indonesia' , 'Singapore' , 'Malaysia']

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ name, phoneNumber, address, city, postalCode, country}))
        steps()
    }
    
    return (
        <Container className="bg-white p-5">
            <Row>
                <Col xs={12}>
                    <h4>Shipping address</h4>
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name' className="my-2">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter address'
                                value={address}
                                required
                                onChange={(e) => setAddress(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='name' className="my-2">
                            <Form.Label>City </Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='City'
                                value={city}
                                required
                                onChange={(e) => setCity(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='name' className="my-2">
                            <Form.Label>Postal Code</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter postal code'
                                value={postalCode}
                                required
                                onChange={(e) => setPostalCode(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='name' className="my-2">
                            <Form.Label>Country</Form.Label>
                            {
                                country ?

                                <Form.Select aria-label="Default select example" onChange={(e) => setCountry(e.target.value)}>
                                    <option value={country}>{country}</option>
                                    {listCountry.map((c, index) => {
                                        if(c !== country){
                                            return <option key={index} value={c}>{c}</option>
                                        }

                                        else {
                                            return null
                                        }
                                    })}
                                </Form.Select>

                                :

                                <Form.Select aria-label="Default select example" onChange={(e) => setCountry(e.target.value)}>
                                    <option>Select your country</option>
                                    <option value='Indonesia'>Indonesia</option>
                                    <option value='Singapore'>Singapore</option>
                                    <option value='Malaysia'>Malaysia</option>
                                </Form.Select>
                            }
                        </Form.Group>
                    </Form>
                </Col>
                <Col>
                    <h4>Contact info</h4>
                    <Form.Group controlId='name' className="my-2">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter full name'
                            value={name}
                            required
                            onChange={(e) => setName(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    
                    <Form.Group controlId='name' className="my-2">
                        <Form.Label>Phone number</Form.Label>
                        <Form.Control
                            type='tel'
                            placeholder='Enter your phone number'
                            value={phoneNumber}
                            required
                            onChange={(e) => setPhoneNumber(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>
            <div className='d-grid gap-2'>
                <Button className='mt-4' type='submit' variant='primary' size='lg' onClick={submitHandler}>
                    Continue
                </Button>
            </div>
        </Container>
    )
}

export default Shippingpage
