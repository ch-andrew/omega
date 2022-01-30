import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Row, Col, Card} from 'react-bootstrap'

const Categories = () => {
    return (
        <>
            <Container as="div" className="text-center">
                <Row>
                    <Col xs={12} md={4} className="mb-3">
                        <LinkContainer to="/new" style={{cursor: 'pointer'}}>
                            <Card className="bg-light text-white">
                                <Card.Img src="images/header1.jpg" alt="Card image"/>
                                <Card.ImgOverlay style={{backgroundColor: 'black', opacity: '0.2'}}></Card.ImgOverlay>
                                <Card.ImgOverlay className="d-flex align-items-center justify-content-center">
                                    <Card.Title>
                                        <h1 className='outfit-bold'>SHOP NEW</h1>
                                    </Card.Title>
                                </Card.ImgOverlay>
                            </Card>
                        </LinkContainer>
                    </Col>
                    <Col xs={12} md={4} className="mb-3">
                        <LinkContainer to="/shop/men/t-shirt" style={{cursor: 'pointer'}}>
                            <Card className="bg-light text-white">
                                <Card.Img src="images/header2.jpg" alt="Card image"/>
                                <Card.ImgOverlay style={{backgroundColor: 'black', opacity: '0.2'}}></Card.ImgOverlay>
                                <Card.ImgOverlay className="d-flex align-items-center justify-content-center">
                                    <Card.Title>
                                        <h1 className='outfit-bold'>SHOP MEN</h1>
                                    </Card.Title>
                                </Card.ImgOverlay>
                            </Card>
                        </LinkContainer>
                    </Col>
                    <Col xs={12} md={4} className="mb-3">
                        <LinkContainer to="/shop/women/t-shirt" style={{cursor: 'pointer'}}>
                            <Card className="bg-light text-white">
                                <Card.Img src="images/header3.jpg" alt="Card image"/>
                                <Card.ImgOverlay style={{backgroundColor: 'black', opacity: '0.2'}}></Card.ImgOverlay>
                                <Card.ImgOverlay className="d-flex align-items-center justify-content-center">
                                    <Card.Title>
                                        <h1 className='outfit-bold'>SHOP WOMEN</h1>
                                    </Card.Title>
                                </Card.ImgOverlay>
                            </Card>
                        </LinkContainer>
                    </Col>
                </Row>    
            </Container>   
        </>
    )
}

export default Categories
