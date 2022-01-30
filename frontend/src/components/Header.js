import React from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Nav, Navbar, Row,Col, NavDropdown, Image} from 'react-bootstrap'
import { logout } from '../actions/userActions'

const Header = () => {
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    const allProducts = useSelector(state => state.productList)
    const {categories} = allProducts
    

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header className="outfit">
            {/* <Nav> */}
                <Container fluid className="desktop-view">
                    <Row>
                        <Col style={{backgroundColor: 'black'}}>
                            <LinkContainer to="/" style={{cursor: 'pointer'}}>
                                <div className="justify-content-center text-center">
                                    <Image fluid src="/images/Omega-Logo-White.png" alt="omega-logo" style={{height: "35px", width: "auto"}}/>
                                </div>
                            </LinkContainer>
                        </Col>
                        <Col xs={6}>
                            <Nav className="justify-content-center">
                                <LinkContainer to="/new">
                                    <Nav.Link className="link-dark" >NEW ARRIVALS</Nav.Link>
                                </LinkContainer>
                                <NavDropdown title={<span className="text-dark">MEN</span>}>
                                    {
                                        categories ? 
                                        categories.map(category => {
                                            return (
                                                <LinkContainer key={category} to={`/shop/men/${category}`}>
                                                    <NavDropdown.Item>
                                                        {category[0].toUpperCase() + category.slice(1)}
                                                    </NavDropdown.Item>
                                                </LinkContainer>
                                            )
                                        }) :
                                        <span>error</span>
                                    }
                                </NavDropdown>
                                <NavDropdown title={<span className="text-dark">WOMEN</span>}>
                                    {
                                        categories ? 
                                        categories.map(category => {
                                            return (
                                                <LinkContainer key={category} to={`/shop/women/${category}`}>
                                                    <NavDropdown.Item>
                                                        {category[0].toUpperCase() + category.slice(1)}
                                                    </NavDropdown.Item>
                                                </LinkContainer>
                                            )
                                        }) :
                                        <span>error</span>
                                    }
                                </NavDropdown>
                                <LinkContainer to="/contact">
                                    <Nav.Link className="link-dark">CONTACT</Nav.Link>
                                </LinkContainer>
                            </Nav>
                        </Col>
                        <Col>
                            <Nav className="justify-content-end">
                                {
                                    userInfo && !userInfo.isAdmin ?
                                    <NavDropdown title={<span className="text-dark">{userInfo.name}</span>} id='username'>
                                        <LinkContainer to="/profile">
                                            <NavDropdown.Item>
                                                Profile
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item onClick={logoutHandler}>
                                            Log out
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    :
                                    userInfo && userInfo.isAdmin ?
                                    <NavDropdown title={<span className="text-dark">{userInfo.name}</span>} id='username'>
                                        <LinkContainer to="/admin">
                                            <NavDropdown.Item>
                                                Admin
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item onClick={logoutHandler}>
                                            Log out
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    :
                                    <LinkContainer to="/login">
                                        <Nav.Link>
                                            <i className='fas fa-user link-dark'/>
                                        </Nav.Link>
                                    </LinkContainer>
                                }
                                <LinkContainer to="/cart">
                                    <Nav.Link>
                                        {
                                            cartItems.length && cartItems.length > 0 ?
                                            <i className='fas fa-shopping-cart'/>  : 
                                            <i className='fas fa-shopping-cart link-dark'/>
                                        }
                                    </Nav.Link>
                                </LinkContainer>
                            </Nav>
                        </Col>
                    </Row>
                </Container>
            {/* </Nav> */}

            {/* MOBILE VIEW */}
            <Navbar bg="white" expand="lg" style={{padding: 0}} className="mobile-view">
                <Container fluid style={{padding: 0}}>

                    <LinkContainer to="/" style={{backgroundColor: 'black'}}>
                        <Navbar.Brand>
                            <Image fluid src="/images/Omega-Logo-White.png" alt="omega-logo" style={{height: "35px", width: "auto"}}/>
                        </Navbar.Brand>
                    </LinkContainer>
                    

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto" style={{padding: "10px"}}>
                            <LinkContainer to="/new">
                                <Nav.Link className="link-dark">NEW ARRIVALS</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/shop/men/all">
                                <Nav.Link className="link-dark">MEN</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/shop/women/all">
                                <Nav.Link className="link-dark">WOMEN</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/contact">
                                <Nav.Link className="link-dark">CONTACT</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/cart">
                            {
                                cartItems.length && cartItems.length > 0 ?
                                <Nav.Link className="link-primary">CART</Nav.Link> :
                                <Nav.Link className="link-dark">CART</Nav.Link>
                            }
                            </LinkContainer>
                            {
                                    userInfo && !userInfo.isAdmin ?
                                    <NavDropdown title={<span className="text-dark">{userInfo.name}</span>} id='username'>
                                        <LinkContainer to="/profile">
                                            <NavDropdown.Item>
                                                Profile
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item onClick={logoutHandler}>
                                            Log out
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    :
                                    userInfo && userInfo.isAdmin ?
                                    <NavDropdown title={<span className="text-dark">{userInfo.name}</span>} id='username'>
                                        <LinkContainer to="/admin">
                                            <NavDropdown.Item>
                                                Admin
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item onClick={logoutHandler}>
                                            Log out
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    :
                                    <LinkContainer to="/login">
                                        <Nav.Link>
                                            ACCOUNT
                                        </Nav.Link>
                                    </LinkContainer>
                                }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
