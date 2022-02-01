import React, {useState} from 'react'
import { Container, Row, Col, Collapse } from 'react-bootstrap'
import Paymentpage from './Paymentpage'
import Shippingpage from './Shippingpage'
import PlaceOrderpage from './PlaceOrderpage'

const Checkoutpage = () => {
    const [steps, setSteps] = useState('shipping')  

    const shippingContinue = () => {
        setSteps('payment')
    }

    const paymentContinue = () => {
        setSteps('placeorder')
    }

    return (
        <Container fluid className="py-5 bg-secondary montserrat-bold">
            <Container>
                <Row>
                    <Col xs={12} md={8}>
                        <div className='mb-4'>
                            <div 
                                className="bg-black text-white" 
                                style={{padding: '1rem 1.25rem',  cursor: 'pointer'}} 
                                onClick={() => setSteps('shipping')}
                                aria-controls="shipping">
                                <h2>Shipping</h2>
                            </div>
                            <Collapse in={steps === 'shipping'}>
                                <div id="shipping">
                                    <Shippingpage steps={shippingContinue}/>
                                </div>
                            </Collapse>
                        </div>

                        <div className='mb-4'>
                            <div 
                                className="bg-black text-white" 
                                style={{padding: '1rem 1.25rem',  cursor: 'pointer'}} 
                                aria-controls="payment">
                                <h2>Payment</h2>
                            </div>
                            <Collapse in={steps === 'payment' || steps === 'placeorder'}>
                                <div id="payment">
                                    <Paymentpage steps={paymentContinue}/>
                                </div>
                            </Collapse>
                        </div>
                    </Col>
                    <Col xs={12} md={4}>
                        <PlaceOrderpage steps={steps}/>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}

export default Checkoutpage
