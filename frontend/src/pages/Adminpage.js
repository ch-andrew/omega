import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Row, Col, Collapse } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import ManageOrders from '../components/ManageOrders'
import ManageProducts from '../components/ManageProducts'
import ManageUsers from '../components/ManageUsers'
import AdminDashboard from '../components/AdminDashboard'

const Adminpage = () => {

    const history = useHistory()
    const [productPage, setProductPage] = useState(1)
    const [steps, setSteps] = useState('manage-users')  

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if(userInfo && !userInfo.isAdmin){
            history.push('/')
        }

        else if(!userInfo){
            console.log(' no user Info');
            history.push('/')
        }


    }, [userInfo, history])

    return (    
        <Container fluid className="py-5 bg-secondary montserrat-bold">
            <Container className="p-0">
                <Row>
                    <div className="bg-black text-white" style={{padding: '1rem 1.25rem'}}>
                        <h2>Admin Dashboard</h2>
                    </div>
                    <AdminDashboard/>
                    <Col className="p-0">
                        <div 
                            className={steps === "manage-users" ? "bg-black text-white" : "bg-light"} 
                            style={{padding: '1rem 1.25rem',  cursor: 'pointer'}} 
                            onClick={() => setSteps('manage-users')}
                            aria-controls="manage-users">
                            <h2>Manage Users</h2>
                        </div>
                    </Col>
                    <Col className="p-0">  
                        <div 
                            className={steps === "manage-products" ? "bg-black text-white" : "bg-light"} 
                            style={{padding: '1rem 1.25rem',  cursor: 'pointer'}} 
                            onClick={() => setSteps('manage-products')}
                            aria-controls="manage-products">
                            <h2>Manage Products</h2>
                        </div>
                    </Col>
                    <Col className="p-0">
                        <div 
                            className={steps === "manage-orders" ? "bg-black text-white" : "bg-light"} 
                            style={{padding: '1rem 1.25rem',  cursor: 'pointer'}} 
                            onClick={() => setSteps('manage-orders')}
                            aria-controls="manage-orders">
                            <h2>Manage Orders</h2>
                        </div>
                    </Col>
                    <Collapse in={steps === 'manage-users'}>
                        <div id="manage-users" className='p-0'>
                            <ManageUsers/>
                        </div>
                    </Collapse>
                    <Collapse in={steps === 'manage-products'}>
                        <div id="manage-products" className='p-0'>
                            <ManageProducts productPage={productPage} setProductPage={setProductPage}/>
                        </div>
                    </Collapse>
                    <Collapse in={steps === 'manage-orders'}>
                        <div id="manage-orders" className='p-0'>
                            <ManageOrders/>
                        </div>
                    </Collapse>
                </Row>
            </Container>
        </Container>
    )
}

export default Adminpage
