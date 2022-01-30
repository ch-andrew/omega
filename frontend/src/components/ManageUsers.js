import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Container, Button, Table} from 'react-bootstrap'
import { deleteUser, listUsers } from '../actions/userActions'
import Loader from './Loader'
import Message from './Message'
import UserEditModal from './UserEditModal'


const ManageUsers = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const [modalShow, setModalShow] = useState(false);

    const userList = useSelector((state) => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector((state) => state.userDelete)
    const { success: successDelete} = userDelete


    const adminUsers = users.filter(user => user.isAdmin)
    
    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listUsers())
        }

        else {
            history.push('/')
        }
    }, [dispatch, history, userInfo, successDelete, modalShow])

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure?")) {
            dispatch(deleteUser(id));
        }
    };

    return (
        <Container fluid className="bg-white p-0">
            {
                loading ?
                <Loader/> :
                error ?
                <Message variant="danger">{error}</Message> :
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => {

                            return (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        {user.isAdmin ? 
                                            <i className='fas fa-check' style={{color: 'green'}}></i> :
                                            <i className='fas fa-times' style={{color: 'red'}}></i>
                                        }
                                    </td>
                                    <td>
                                        {
                                            !user.isAdmin ?
                                                <>
                                                    <Button type='button' onClick={() => setModalShow(user._id)}>
                                                        <i className="fas fa-edit"></i>
                                                    </Button>
                                                    <Button className="ms-2" variant="danger" onClick={() => deleteHandler(user._id)}>
                                                        <i className="fas fa-trash"></i>
                                                    </Button>
                                                </>
                                            :
                                            adminUsers.length === 1 ?                                      
                                                <Button type='button' disabled>
                                                    <i className="fas fa-edit"></i>
                                                </Button> 
                                            :
                                                <Button type='button' onClick={() => setModalShow(user._id)}>
                                                    <i className="fas fa-edit"></i>
                                                </Button>
                                        }
                                    </td>
                                    <UserEditModal 
                                        show={modalShow === user._id} 
                                        onHide={() => setModalShow(false)} 
                                        user={user}/>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            }
        </Container>
    )
}

export default ManageUsers
