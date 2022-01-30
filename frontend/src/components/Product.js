import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const Product = ({product}) => {

    let productImage

    if(process.env.NODE_ENV === "production"){
        productImage = "https://d1o31fwgmtgkiy.cloudfront.net" + product.image
    }
    
    else {
        productImage = product.image
    }

    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/product/${product._id}`}>
                <Card.Img src={productImage}/>
            </Link>

            <Card.Body>
                <Link to={`/product/${product._id}`} className="primary-link">
                    <Card.Title as='div' className="mb-2">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text>
                    <strong>
                        {`$${product.price.toFixed(2)}`}
                    </strong>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product
