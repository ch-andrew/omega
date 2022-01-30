import React, {useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Row, Col} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'

const AdminDashboard = () => {
    const history = useHistory()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const orderItems = useSelector((state) => state.orderList)
    const { loading, error, todaySaleOrders } = orderItems

    const reducer = (a, b) => a.totalPrice + b.totalPrice;

    const todaySales = !todaySaleOrders ? 0 : todaySaleOrders.length > 1 ? todaySaleOrders.reduce(reducer) : todaySaleOrders.length === 1 ? todaySaleOrders[0].totalPrice : 0

    useEffect(() => {
        if(!userInfo){
            history.push('/')
        }
    }, [history, userInfo, todaySaleOrders])
    

        return (
            <Container fluid className="bg-white py-2 montserrat-bold">
                {
                    loading ?
                    <Loader/> :
                    error ?
                    <Message variant="danger">{error}</Message> :
                    <Container>
                        <Row>
                            <Col>
                                <h4 style={{fontWeight: '700'}}>Welcome, {userInfo.name}</h4>
                            </Col>
                            <Col className="text-end">
                                <h5 style={{fontWeight: '700'}}>{userInfo.email}</h5>
                            </Col>
                        </Row>
                        <h2>Statistics</h2>
                        <h4>
                            Today's Sale <span className="text-success text-right">{`$${todaySales}`}</span>
                        </h4>
                        <h4>Items Sold {todaySaleOrders && todaySaleOrders.length} {todaySaleOrders && todaySaleOrders.length > 1 ? 'pcs' : 'pc'}</h4>
                    </Container>
                }
            </Container>
                
        )

}

export default AdminDashboard
