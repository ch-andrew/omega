import React, { useState, useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Row, Col, Container, Button} from 'react-bootstrap'
import ProductImage from '../components/ProductImage'
import ProductStock from '../components/ProductStock'
import ProductColors from '../components/ProductColors'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { addToCart } from '../actions/cartActions'
import { listProductDetails } from '../actions/productActions'

const Productpage = ({ match }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const reduxStateData = useSelector(state => state.productDetails)
    const { loading, error, product, variant, variants} = reduxStateData


    const [selectedColor, setSelectedColor] = useState()

    const [selectedSize, setSelectedSize] = useState()

    const [selectedQty, setQty] = useState(0)

    const [cartQty, setCartQty] = useState(0)

    const [addedToCart, setAddedToCart] = useState()


    useEffect(() => {
        if(!variant || variant.productId !== match.params.id){
            dispatch(listProductDetails(match.params.id))
        }

        else {
            const sizes = Object.keys(variant.stock)
            for (let i = 0; i < sizes.length; i++) {
                if(variant.stock[sizes[i]] > 0){
                    setSelectedSize(sizes[i])
                    break;                   
                }
            }
            setSelectedColor(product.defaultColor)
        }
    }, [match, dispatch, product, variant]
    )

    
    const selectSize = (size) => {
        setSelectedSize(size)
    }

    const pickColor = (color) => {
        setSelectedColor(color)
    }

    const addQty = () => {
        setQty(selectedQty + 1)
    }

    const removeQty = () => {
        setQty(selectedQty - 1)
    }

    const resetQty = () => {
        setQty(0)
    }
    const addToCartHandler = () => {
        dispatch(addToCart(match.params.id, selectedColor, selectedSize, selectedQty))
        setCartQty(selectedQty)
        setAddedToCart(true)
    }

    const buyNowHandler = () => {
        dispatch(addToCart(match.params.id, selectedColor, selectedSize, selectedQty))
        history.push('/checkout')
    }

    return (
        <Container fluid className="py-5 bg-secondary montserrat">
            <Container className="p-0">
            {
                addedToCart &&
                <Message variant="primary">{cartQty} {cartQty > 1 ? 'items' : 'item'} is added to your cart</Message>
            }
            </Container>
            {
                loading ?
                <Loader/> :
                error ?
                <Message variant="danger">{error}</Message> :
                <Container>
                    <Row>
                        <ProductImage 
                            product={product}
                            variants={variants}
                            selectedColor={selectedColor}/>
        
                        <Col xs={6} className="py-2 bg-white">

                            <Row>
                                <Col>
                                    <h1 className="m-0 montserrat-bold">{product.name}</h1>
                                    <h5 className="m-0 montserrat-bold">{`$${product.price}`}</h5>
                                </Col>
                            </Row>

                            <ProductColors 
                                variants={variants} 
                                selectedColor={selectedColor}
                                selectedSize={selectedSize} 
                                clicked={pickColor}
                            />
                            
                            <ProductStock
                                variants={variants} 
                                selectedSize={selectedSize}
                                selectedColor={selectedColor}
                                selectedQty={selectedQty}
                                clicked={{selectSize, addQty, removeQty, resetQty}}
                            />
                            
                            {selectedQty > 0 
                                ?
                                <Row className="mt-4">
                                    <Col className="d-grid gap-2">
                                        <Button 
                                            variant="danger" 
                                            size="lg"
                                            onClick={addToCartHandler}
                                            >
                                            ADD TO CART
                                        </Button>
                                    </Col>
                                    <Col className="d-grid gap-2">
                                        <Button 
                                            variant="primary" 
                                            size="lg"
                                            onClick={buyNowHandler}>
                                            BUY NOW
                                        </Button>
                                    </Col>
                                </Row>
                                :
                                <Row className="mt-4">
                                    <Col className="d-grid gap-2">
                                        <Button 
                                            variant="danger" 
                                            size="lg"
                                            disabled>
                                            ADD TO CART
                                        </Button>
                                    </Col>
                                    <Col className="d-grid gap-2">
                                        <Button 
                                            variant="primary" 
                                            size="lg"
                                            disabled>
                                            BUY NOW
                                        </Button>
                                    </Col>
                                </Row>
                            }
                        </Col>
                    </Row>
                </Container>
            }
        </Container>
    )
}

export default Productpage
