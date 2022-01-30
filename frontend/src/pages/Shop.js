import React, { useState, useEffect} from 'react'
import { useHistory, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import { Col, Container, Dropdown, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import SearchBox from '../components/SearchBox'

const Shop = ({match}) => {
    const keyword = match.params.keyword
    const dispatch = useDispatch()
    const history = useHistory()

    const allProducts = useSelector(state => state.productList)
    const { loading, error, categories, products, pages, page} = allProducts 

    const [productPage, setProductPage] = useState(page)

    useEffect(() => {
        if(match.params.category){
            dispatch(listProducts(keyword , 16 , productPage , match.params.gender , match.params.category))
        }

        else {
            history.push(`/shop/${match.params.gender}/all`)
        }
    }, [dispatch, match, history, productPage, keyword])

    const productList = products.map(product => {
        return (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product}/>
            </Col>
        )
    })

    const renderFilter = () => {
        if(match.params.category && !keyword){
            return (
                <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        {match.params.category[0].toUpperCase() + match.params.category.slice(1)}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {categories && categories.map(category => {
                            return (
                                <LinkContainer key={category} to={`/shop/${match.params.gender}/${category}`}>
                                    <Dropdown.Item>
                                        {category[0].toUpperCase() + category.slice(1)}
                                    </Dropdown.Item>
                                </LinkContainer>
                            )
                        })}
                    </Dropdown.Menu>
                </Dropdown>
            )
        }

        else if(keyword){
            return (
                <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        {match.params.category[0].toUpperCase() + match.params.category.slice(1)}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {categories && categories.map(category => {
                            return (
                                <LinkContainer key={category} to={`/shop/${match.params.gender}/${category}/search/${keyword}`}>
                                    <Dropdown.Item>
                                        {category[0].toUpperCase() + category.slice(1)}
                                    </Dropdown.Item>
                                </LinkContainer>
                            )
                        })}
                    </Dropdown.Menu>
                </Dropdown>
            )
        }

        else {
            return (
                <Dropdown >
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        Product
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {categories && categories.map(category => {
                            return (
                                <LinkContainer key={category} to={`/shop/${match.params.gender}/${category}`}>
                                    <Dropdown.Item>
                                        {category[0].toUpperCase() + category.slice(1)}
                                    </Dropdown.Item>
                                </LinkContainer>
                            )
                        })}
                    </Dropdown.Menu>
                </Dropdown>
            )
        }
    }

    return (
        <Container fluid as="div" className='my-5'>
            <Container>
                <Route render={({history}) => <SearchBox history={history} gender={match.params.gender} category={match.params.category}/>}/>
                {loading 
                    ? 
                    <div className="d-flex justify-content-center align-items-center" style={{height: "50vh"}}>
                        <Loader/> 
                    </div>
                    : error 
                    ? <Message variant='danger'>{error}</Message> 
                    :
                <div className="inline">
                    <h2>{match.params.gender[0].toUpperCase() + match.params.gender.slice(1)}'s {renderFilter()}</h2>
                    <Row className="text-center">
                        {allProducts ? productList : null}
                        <Paginate pages={pages} page={page} isAdmin={true} clicked={setProductPage}/>
                    </Row>
                </div>
                }
            </Container>
        </Container>
    )
}

export default Shop
