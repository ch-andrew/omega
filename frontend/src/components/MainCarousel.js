import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Image } from 'react-bootstrap'

const mainCarousel = () => {
    return (
        
            <LinkContainer to="/shop/men/hoodie" style={{cursor: "pointer"}}>
                <Image fluid
                className="d-block w-100 h-100"
                src="images/Carousel_1.png"
                alt="First slide"
                />
            </LinkContainer>

    )
}

export default mainCarousel
