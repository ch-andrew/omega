import React from 'react';
import {Container , Image} from 'react-bootstrap'

const Contactpage = () => {
  
    return (
    <Container fluid className="py-5 montserrat-bold justify-content-center bg-secondary">
        <Container className="py-5 bg-light justify-content-center login-form">
            <h1 className="text-center">CONTACT INFO</h1>
            <div className="my-5 text-center">
                <div className="my-3">
                    <i className="fas fa-phone"></i>
                    <span className="ms-2">+62812-9040-0773</span>
                </div>
                <div className="my-3">
                    <i className="fas fa-envelope"></i>
                    <span className="ms-2">hello@omega.com</span>
                </div>
                <div className="my-3">
                    <i className="fas fa-location"></i>
                    <span className="ms-2">Jalan Kebon Jeruk 2 No. 41A, 11150</span>
                </div>
            </div>
            <div className="mt-3">
                <p>Omega Store</p>
                <p>Opening hours: 10.00 - 19.00</p>
            </div>
            <div className="mt-3 d-flex justify-content-center align-items-center">
                <Image fluid src="images/Omega-Storefront.png"/>
            </div>
        </Container>
    </Container>
    )
};

export default Contactpage;
