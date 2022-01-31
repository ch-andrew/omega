import React, { useEffect, useState } from 'react'
import { Col, Image } from 'react-bootstrap'
import Loader from './Loader'
// import axios from 'axios'

const ProductImage = ({product, variants, selectedColor}) => {

    const [productImage, setProductImage] = useState()

    useEffect(() => {
        const getImages = async () => {
            if(selectedColor){
                const selectedProduct = await variants.find(variant => variant.color === selectedColor)
                // const { data } =  await axios.get(`/api/s3/sign-s3?file-name=${selectedProduct.image.substring(1)}&file-type=image/png`)
                if(process.env.NODE_ENV === "production"){
                    const cdnImage = "https://d1o31fwgmtgkiy.cloudfront.net" + selectedProduct.image
                    setProductImage(cdnImage)
                }
                
                else {
                    console.log(process.env.NODE_ENV);
                    setProductImage(selectedProduct.image)
                }
            }
        }
        getImages()
    }, [variants, selectedColor])

    if(productImage){

        return (
            <Col xs={12} md={6} className='text-center bg-light'>
                <Image fluid src={productImage} alt={product.name}/>
            </Col>
        )
    }

    else {
        return (
            <Loader/>
        )
    }
}

export default ProductImage
