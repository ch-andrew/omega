import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Row, Col} from 'react-bootstrap'
import '../index.css'

const Footer = () => {
    return (
        <footer className="page-footer font-small" style={{backgroundColor: "black", color: "white"}}>
            <Container>
                <Row className="p-5">
                    <Col xs={12} md={4}>
                        <h4>EXPLORE</h4>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <LinkContainer to="/new" style={{cursor: "pointer"}}>
                                    <span className="footer-links">New Arrivals</span>
                                </LinkContainer>
                            </li>
                            <li className="mb-2">
                                <LinkContainer to="/shop/men" style={{cursor: "pointer"}}>
                                    <span className="footer-links">Shop Men</span>
                                </LinkContainer>
                            </li>
                            <li className="mb-2">
                                <LinkContainer to="/shop/women" style={{cursor: "pointer"}}>
                                    <span className="footer-links">Shop Women</span>
                                </LinkContainer>
                            </li>
                            <li className="mb-2">
                                <LinkContainer to="/contact" style={{cursor: "pointer"}}>
                                    <span className="footer-links">Outlet</span>
                                </LinkContainer>
                            </li>
                        </ul>
                    </Col>
                    <Col xs={12} md={4}>
                        <h4>ABOUT</h4>
                        <b>Our Story</b>
                        <p>
                            Omega is a fake clothing brand with medium-sized office based in Indonesia. We are determined to bring good quality clothing as a standard for nationwide clothing. Our products vary of different styles for our customer needs.
                        </p>
                    </Col>
                    <Col xs={12} md={4}>
                        <h4 className="text-uppercase">Contact</h4>
                        <b>Phone Support</b>
                        <p>
                            +6281290400773<br/>
                            Mon - Fri: 0900 - 1700 (GMT+7)<br/>
                            Closed on Public Holidays in Indonesia
                        </p>
                        <b>Email Support</b>
                        <p>
                            <a href="mailto:customercare.id@omega.com" className="footer-email footer-links">customercare.id@omega.com</a>
                        </p>
                    </Col>
                </Row>
                <hr className="clearfix w-100 d-md-none pb-3"/>
            </Container>
            <div className="footer-copyright font-weight-light text-center py-3">
                © 2021 Copyright: Omega
            </div>
        </footer>
    )
}

export default Footer