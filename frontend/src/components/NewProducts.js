import React, { useEffect} from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import { listProducts } from '../actions/productActions'
import { Col, Container, Row } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from './Loader'
import Message from './Message'

const NewProducts = ({keyword, pageNumber}) => {
    

    const dispatch = useDispatch()

    const allProducts = useSelector(state => state.productList)
    const { loading, error, products} = allProducts 

    useEffect(() => {
        dispatch(listProducts(keyword, 4, pageNumber))
    }, [dispatch, keyword, pageNumber])
    
    const newProducts = products.sort((a,b) => (a.createdAt > b.createdAt) ? -1 : ((b.createdAt > a.createdAt) ? 1 : 0))

    const productList = newProducts.map(product => {
        return (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product}/>
            </Col>
        )
    })

    return (
        <Container fluid as="div" className='mb-5'>
            <Container>
                {loading ? 
                    <div className="d-flex justify-content-center align-items-center" style={{height: "50vh"}}>
                        <Loader/> 
                    </div>
                    : 
                    error ? 
                    <Message variant='danger'>{error}</Message> 
                    :
                <>
                    <h2>Our Latest Product</h2>
                    <Row className="text-center">
                        {newProducts ? productList : null}
                    </Row>
                </>
                }
            </Container>
        </Container>
    )
}

export default NewProducts
