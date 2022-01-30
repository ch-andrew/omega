import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table, Form, Modal, Image, Row, Col } from 'react-bootstrap'; 
import Loader from './Loader';
import { createVariant, deleteVariant, listVariants, updateStock } from '../actions/productActions';
import Message from './Message';

const VariantListModal = (props) => {
    const dispatch = useDispatch()
    
    const { variants, product } = props

    const [color, setColor] = useState('')
    const [colorCode, setColorCode] = useState('#000000')
    const [image, setImage] = useState('')
    const [uploading, setUploading] = useState()
    const [stock, setStock] = useState({})

    const [edit, setEdit] = useState('')

    const variantCreate = useSelector(state => state.variantCreate)
    const { loading: loadingCreate, success: successCreate} = variantCreate

    const variantUpdate = useSelector(state => state.variantUpdate)
    const { loading: loadingUpdate, success: successUpdate} = variantUpdate

    const variantDelete = useSelector(state => state.variantDelete)
    const { loading: loadingDelete, success: successDelete} = variantDelete


    useEffect(() => {
        if(successCreate){
            setColor('')
            setColorCode('')
            setImage('')
            setStock({})
            dispatch({type: 'VARIANT_CREATE_RESET'})
            dispatch(listVariants())
        }

        else if(successUpdate || successDelete){
            dispatch(listVariants())
        }

    }, [dispatch, successUpdate, successDelete, successCreate])

    const createVariantHandler = () => {
        dispatch(createVariant(product._id, color, colorCode, image, stock))
    }

    const deleteVariantHandler = (id) => {
        dispatch(deleteVariant(id))
    }

    const updateStockHandler = (id, operator, size) => {
        dispatch(updateStock(id, operator, size))
    } 

    const uploadFileHandler = async (e) => {
        const d = new Date();
        let day = d.getDate();
        let month = d.getMonth();
        let year = d.getFullYear()

        const uploadFile = (file, signedRequest, url) => {
            const xhr = new XMLHttpRequest();
            xhr.open('PUT', signedRequest);
            xhr.onreadystatechange = () => {
                if(xhr.readyState === 4){
                    if(xhr.status === 200){
                        setImage(`/images/products/${file.name}`)
                        setUploading(false)
                    }
                    else{
                        alert('Could not upload file.');
                    }
                    }
            };
            xhr.send(file);
        }

        const getSignedRequest = async (file) => {
            console.log(file);
            const { data } =  await axios.get(`/api/s3/sign-s3?file-name=images/products/${file.name}&file-type=${file.type}`)
            console.log(data);
            uploadFile(file, data.signedRequest, data.url)
        }
        
        if(process.env.NODE_ENV === 'production'){
            const file = e.target.files[0]
            const fileName = 'PRD-' + product.gender + '-' + product.name.split(' ').join('-') + '-' + color + '-' + day + (month + 1) + year + file.name.substring(file.name.length - 4)
            console.log(file);
            var blob = file.slice(0, -1)
            const imageFile = new File([blob] , fileName , {type: 'image/png'})
            console.log();
            setUploading(true)
            getSignedRequest(imageFile);
        }
        
        else {
            const file = e.target.files[0]
            const fileName = product.gender + '-' + product.name.split(' ').join('-') + '-' + color.replace(" ", "-") + file.name.substring(file.name.length - 4)
            const imageFile = new File([blob] , fileName , {type: 'image/png'})
            const formData = new FormData()
            formData.append('PRD', imageFile)
            console.log(file);
            setUploading(true)
            
            try {
                const config = {
                    headers: {
                        'Content-type': 'multipart/form-data'
                    }
                }
                
                const { data } = await axios.post(`/api/upload`, formData, config)
                console.log(data);
                setImage(data)
                setUploading(false)
            } catch (error) {
                console.error(error)
                setUploading(false)
            }
        }

    }

    const submitHandler = (e) => {
        e.preventDefault()
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
                    {product.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0">
                <div className="p-2">
                    <h4>Variants</h4>
                        {successCreate && <Message variant="success">New variant added</Message>}
                        <Form onSubmit={submitHandler}>
                            { 
                                loadingCreate ?
                                <Loader/>
                                :
                                <>
                                    <Row>
                                        <Col xs={10}>
                                            <Form.Group controlId='name'>
                                                <Form.Label>Color</Form.Label>
                                                <Form.Control
                                                    type='name'
                                                    placeholder='ex: Black, White, Purple'
                                                    value={color}
                                                    onChange={(e) => setColor(e.target.value)}/>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group controlId='colorCode'>
                                                <Form.Label>Color Code</Form.Label>
                                                <Form.Control
                                                        type="color"
                                                        value={colorCode}
                                                        title="Choose your color"
                                                        onChange={(e) => setColorCode(e.target.value)}/>
                                                <p>{colorCode}</p>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Form.Label>Stock</Form.Label>
                                        <Col>
                                            <Form.Control
                                                    type="number"
                                                    min={0}
                                                    max={50}
                                                    placeholder="Size S"
                                                    onChange={(e) => setStock({...stock, sizeS: e.target.value})}>
                                            </Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                    type="number"
                                                    min={0}
                                                    max={50}
                                                    placeholder="Size M"
                                                    onChange={(e) => setStock({...stock, sizeM: e.target.value})}>
                                            </Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                    type="number"
                                                    min={0}
                                                    max={50}
                                                    placeholder="Size L"
                                                    onChange={(e) => setStock({...stock, sizeL: e.target.value})}>
                                            </Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                    type="number"
                                                    min={0}
                                                    max={50}
                                                    placeholder="Size XL"
                                                    onChange={(e) => setStock({...stock, sizeXL: e.target.value})}>
                                            </Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                    type="number"
                                                    min={0}
                                                    max={50}
                                                    placeholder="Size XXL"
                                                    onChange={(e) => setStock({...stock, sizeXXL: e.target.value})}>
                                            </Form.Control>
                                        </Col>
                                    </Row>


                                    <Form.Group controlId='formfile'>
                                        <Form.Label>Image</Form.Label>
                                        <Form.Control
                                            type="file" 
                                            label='Choose file' 
                                            onChange={uploadFileHandler} disabled={color.length > 0 ? false : true}/>                            
                                        {uploading && <Loader/>}
                                    </Form.Group>
                                    {
                                        color && colorCode && image && stock ?
                                        <Button className="my-3" onClick={createVariantHandler}>
                                            Add variant
                                        </Button>
                                        :
                                        <Button className="my-3" disabled>
                                            Add variant
                                        </Button>
                                    }
                                </>
                            }
                        </Form>
                </div>
                <Table bordered striped hover responsive className='text-center'>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>COLOR</td>
                            <td>CODES</td>
                            <td>IMAGE</td>
                            <td>STOCK</td>
                            <td>ACTIONS</td>
                    </tr>
                    </thead>
                    <tbody>
                        {variants.map(variant => {

                            let variantImage

                            const sizes = Object.keys(variant.stock)

                            if(process.env.NODE_ENV === "production"){
                                variantImage = "https://d1o31fwgmtgkiy.cloudfront.net" + variant.image
                            }

                            else {
                                variantImage = variant.image
                            }

                            return (
                                <tr key={variant._id}>
                                    {
                                        loadingCreate || loadingDelete ? 
                                        <Loader/> :
                                        <>
                                            <td>
                                                {variant._id.slice(0, 12)}
                                                <Button type="button" variant="white" onClick={() => {navigator.clipboard.writeText(product._id)}}>
                                                    <i className="fas fa-copy"></i>
                                                </Button>
                                            </td>
                                            <td>{variant.color}
                                            </td>
                                                
                                            <td>{variant.colorCodes}</td>
                                            <td>
                                                <Image src={variantImage} alt={variant.color} style={{height: "100px"}}/>
                                            </td>
                                            <td>
                                                {   
                                                    loadingUpdate ?
                                                    <Loader/> :
                                                    edit === variant._id ?
                                                    sizes.map(size => {
                                                        return (
                                                            <p key={size}>
                                                                {
                                                                    variant.stock[size] > 0? 
                                                                    <i className="fas fa-plus fa-lg" style={{padding: '6px'}} disabled></i>
                                                                    : 
                                                                    <i 
                                                                        className="fas fa-plus fa-lg" 
                                                                        style={{padding: '6px', cursor: 'pointer'}} 
                                                                        onClick={() => {
                                                                        updateStockHandler(variant._id, 'add' , size)
                                                                        }}>
                                                                    </i>
                                                                }

                                                                <span className="mx-3 text-muted">{size.substring(4)}: {variant.stock[size]}</span>

                                                                {
                                                                    variant.stock[size] <= 0 ? 
                                                                    <i className="fas fa-minus fa-lg" style={{padding: '6px'}} disabled></i>
                                                                    : 
                                                                    <i 
                                                                        className="fas fa-minus fa-lg" 
                                                                        style={{padding: '6px', cursor: 'pointer'}} 
                                                                        onClick={() => {
                                                                            updateStockHandler(variant._id, 'remove' , size)
                                                                        }}>    
                                                                    </i>
                                                                }
                                                            </p>
                                                        )
                                                    })
                                                    :
                                                    <>
                                                        <p>S: {variant.stock.sizeS}</p>
                                                        <p>M: {variant.stock.sizeM}</p>
                                                        <p>L: {variant.stock.sizeL}</p>
                                                        <p>XL: {variant.stock.sizeXL}</p>
                                                        <p>XXL: {variant.stock.sizeXXL}</p>
                                                    </>
                                                }
                                            </td>

                                            <td>
                                                {
                                                    edit === variant._id ?

                                                    <Button variant ="danger" type="button" onClick={() => setEdit('')}>
                                                        <i className="fas fa-times"></i>
                                                    </Button>
                                                    :
                                                    <Button type="button" onClick={() => setEdit(variant._id)}>
                                                        <i className="fas fa-edit"></i>
                                                    </Button>
                                                }
                                                
                                                <Button className="ms-2" type="button" variant="danger" onClick={() => deleteVariantHandler(variant._id)}>
                                                    <i className="fas fa-trash"></i>
                                                </Button>
                                            </td>
                                        </>
                                    }
                                </tr> 
                                )
                            })}
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button type="button" onClick={props.onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default VariantListModal
