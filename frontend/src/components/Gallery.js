import React from 'react'
import { Container, Row, Col, Figure} from 'react-bootstrap'

const Gallery = () => {
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Figure>
                            <Figure.Image/>
                            <Figure.Caption>
                                Gallery
                            </Figure.Caption>
                        </Figure>
                    </Col>
                    <Col>
                        <Figure>
                            <Figure.Image/>
                            <Figure.Caption>
                                Gallery
                            </Figure.Caption>
                        </Figure>
                    </Col>
                    <Col>
                        <Figure>
                            <Figure.Image/>
                            <Figure.Caption>
                                Gallery
                            </Figure.Caption>
                        </Figure>
                    </Col>
                    <Col>
                        <Figure>
                            <Figure.Image/>
                            <Figure.Caption>
                                Gallery
                            </Figure.Caption>
                        </Figure>   
                    </Col>

                </Row>
            </Container>  
        </>
    )
}

export default Gallery
