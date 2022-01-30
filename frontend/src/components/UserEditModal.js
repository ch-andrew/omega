import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Modal } from 'react-bootstrap'; 
import { updateUser } from '../actions/userActions';
import Message from './Message';
import Loader from './Loader';

const UserEditModal = (props) => {
    const { user, show } = props
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const userUpdate = useSelector((state) => state.userUpdate)
    const {loading, success, error} = userUpdate

    useEffect(() => {

        if(user){
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
    }, [dispatch, user, show])

    const updateHandler = (id) => {
        dispatch(updateUser({_id: id, name, email, isAdmin}))
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit User
                </Modal.Title>
            </Modal.Header>
            {success && <Message variant="success">User updated</Message>}
            {
                loading ? 
                <Loader/> : 
                error ? 
                <Message variant="danger">{error}</Message>
                :
                <Modal.Body>
                    <Form>
                        <Form.Group controlId='name' className="my-2">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='name' className="my-2">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='name' className="my-2">
                            <Form.Label>Admin privileges</Form.Label>
                            <Form.Check
                                type='checkbox'
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}>
                            </Form.Check>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            }
            <Modal.Footer>
                <Button onClick={() => updateHandler(user._id)}>
                    Update
                </Button>
                <Button variant="danger" onClick={() => {props.onHide(); dispatch({type: 'USER_UPDATE_RESET'})}}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
        );
}

export default UserEditModal
