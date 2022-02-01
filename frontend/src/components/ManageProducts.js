import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Container, Button, Image, Table, Form, Row, Col} from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import Paginate from './Paginate'
import { createProduct, deleteProduct, listProducts, listVariants, updateProduct } from '../actions/productActions'
import VariantListModal from './VariantListModal'

const ManageProducts = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const productCreate = useSelector(state => state.productCreate)
    const {loading: loadingCreate, success: successCreate} = productCreate

    const productUpdate = useSelector(state => state.productUpdate)
    const {success: successUpdate} = productUpdate

    const productDelete = useSelector(state => state.productDelete)
    const {success: successDelete} = productDelete

    const productList = useSelector((state) => state.productList)
    const { loading, error, categories, products, pages, page } = productList

    const variantList = useSelector((state) => state.variantList)
    const { variants } = variantList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const [modalShow, setModalShow] = useState(false);
    // const [refresh, setRefresh] = useState(false)
    const [productPage, setProductPage] = useState(page)

    const genderList = ['Men' , 'Women', 'Unisex']

    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [category, setCategory] = useState(categories ? categories[0] : '')
    const [gender, setGender] = useState(genderList[0])
    const [price, setPrice] = useState(0)
    const [color, setColor] = useState('')
    const [colorCode, setColorCode] = useState('#000000')
    const [image, setImage] = useState('')
    const [uploading, setUploading] = useState()
    const [stock, setStock] = useState({})

    const [edit, setEdit] = useState('')

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listProducts('' , '' , productPage , '' , ''))
            dispatch(listVariants())
        }

        else if(successCreate || successDelete || successUpdate){
            dispatch(listProducts())
            dispatch(listVariants())
        }

        else {
            history.push('/')
        }

    }, [dispatch, history, userInfo, successCreate, successDelete, successUpdate, productPage])

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
            const { data } =  await axios.get(`/api/s3/sign-s3?file-name=images/products/${file.name}&file-type=${file.type}`)
            uploadFile(file, data.signedRequest, data.url)
        }
        
        if(process.env.NODE_ENV === 'production'){
            const file = e.target.files[0]
            if(file === null){
                return alert('No file selected')
            }

            else {
                const fileName = 'PRD-' + gender + '-' + name.split(' ').join('-') + '-' + color + '-' + day + (month + 1) + year + file.name.substring(file.name.length - 4)
                var blob = file.slice(0, -1)
                const imageFile = new File([blob] , fileName , {type: 'image/png'})
                setUploading(true)
                getSignedRequest(imageFile);

            }
        }
        
        else {
            console.log('bruh');
            const file = e.target.files[0]
            if(file === null){
                return alert('No file selected')
            }

            else {
                const fileName = gender + '-' + name.split(' ').join('-') + '-' + color + file.name.substring(file.name.length - 4)
                blob = file.slice(0, -1)
                const imageFile = new File([blob] , fileName , {type: 'image/png'})
                const formData = new FormData()
                formData.append('PRD', imageFile)
        
                setUploading(true)
                
                try {
                    const config = {
                        headers: {
                            'Content-type': 'multipart/form-data'
                        }
                    }
                    const { data } = await axios.post(`/api/upload`, formData, config)
                    setImage(data)
                    setUploading(false)
                } catch (error) {
                    console.error(error)
                    setUploading(false)
                }
            }
        }
    }

    const addProductHandler = () => {
        if(gender === 'Unisex'){
            dispatch(createProduct(name, desc, category, ['Men', 'Women'], price, color, colorCode, image, stock))
        }

        else {
            dispatch(createProduct(name, desc, category, gender, price, color, colorCode, image, stock))
        }
    }

    const updateProductHandler = (id) => {
        dispatch(updateProduct(id, name, desc, category, gender, price, color))
    }

    const deleteProductHandler = (id) => {
        if(window.confirm('Are you sure you want to delete this product?')){
            dispatch(deleteProduct(id))
        }
    }

    const renderProduct = () => {
        if(loadingCreate){
            return <Loader/>
        }

        else if(edit){

            const selectedProduct = products.find(product => product._id === edit)

            if(selectedProduct){
                return (
                    <>
                        {/* EDIT PRODUCT */}
                        <div className="bg-black text-white" style={{padding: '1rem 1.25rem'}}>
                            <Row>
                                <Col>
                                    <h2>Edit Product</h2>
                                </Col>
                                <Col className="text-end">
                                    <h2>{selectedProduct.name}</h2>
                                </Col>
                            </Row>
                        </div>
                        <Form className="p-2">
                            <Row className="my-2">
                                <Col xs={4}>
                                    <Form.Group>
                                        <Form.Label>Name</Form.Label>
                                            <Form.Control 
                                                type='name'
                                                placeholder={selectedProduct.name}
                                                onChange={(e) => setName(e.target.value)}/>
                                    </Form.Group>
                                </Col>
                                <Col xs={6}>
                                    <Form.Group>
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control 
                                            type='name'
                                            placeholder={selectedProduct.description}
                                            onChange={(e) => setDesc(e.target.value)}/>
                                    </Form.Group>
                                </Col>
                                <Col xs={2}>
                                    <Form.Group>
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder={selectedProduct.price}
                                            min={0}
                                            onChange={(e) => setPrice(e.target.value)}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Category</Form.Label>
                                        <Form.Select onChange={(e) => setCategory(e.target.value)}>
                                            {categories && categories.map((cat, idx) => {
                                                if(cat !== 'all'){
                                                    return (
                                                        <option key={idx} value={cat}>{cat}</option>
                                                    )
                                                }

                                                else {
                                                    return null
                                                }
                                            })}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Gender</Form.Label>
                                        <Form.Select onChange={(e) => setGender(e.target.value)}>
                                            {genderList.map((gender, idx) => {
                                                return (
                                                    <option key={idx} value={gender}>{gender}</option>
                                                )
                                            })}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Color</Form.Label>
                                        <Form.Control
                                            type='name'
                                            placeholder={selectedProduct.defaultColor}
                                            onChange={(e) => setColor(e.target.value)}/>
                                    </Form.Group>
                                </Col>
                                <Col xs={4}>
                                    <Form.Group controlId='formfile'>
                                        <Form.Label>Image</Form.Label>
                                        <Form.Control
                                            type="file" 
                                            label='Choose file' 
                                            onChange={uploadFileHandler} disabled={color.length > 0 ? false : true}/>                            
                                        {uploading && <Loader/>}
                                    </Form.Group>
                                </Col>
                            </Row>
                            {
                                name && desc && category && gender && price && color && image ?
                                <Button type="button" variant="primary" className="mt-4" size="lg" onClick={() => updateProductHandler(selectedProduct._id)}>
                                    Update Product
                                </Button>
                                :
                                <Button type="button" variant="primary" className="mt-4" size="lg" disabled>
                                    Update Product
                                </Button>
                            }
                            <Button type="button" variant="secondary" className="mt-4" size="lg" onClick={() => setEdit('')}> 
                                Cancel
                            </Button>
                        </Form>
                    </>
                )
            }
        }

        else {
            return (
                <>
                    {/* ADD NEW PRODUCT */}
                    <div className="bg-black text-white" style={{padding: '1rem 1.25rem'}}>
                        <h2>Add Product</h2>
                    </div>
                    <Form className="p-2">
                        <Row className="my-2">
                            <Col xs={4}>
                                <Form.Group>
                                    <Form.Label>Name</Form.Label>
                                        <Form.Control 
                                            type='name'
                                            onChange={(e) => setName(e.target.value)}/>
                                </Form.Group>
                            </Col>
                            <Col xs={6}>
                                <Form.Group>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control 
                                        type='name'
                                        onChange={(e) => setDesc(e.target.value)}/>
                                </Form.Group>
                            </Col>
                            <Col xs={2}>
                                <Form.Group>
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min={0}
                                        onChange={(e) => setPrice(e.target.value)}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Category</Form.Label>
                                        <>
                                            <input className="form-control" type="text" list="category" onChange={(e) => setCategory(e.target.value)}/>
                                            <datalist id="category">
                                                {categories && categories.map((cat, idx) => {
                                                    if(cat !== 'all'){
                                                        return (
                                                            <option key={idx} value={cat}/>
                                                        )
                                                    }

                                                    else {
                                                        return null
                                                    }
                                                })}
                                            </datalist>
                                        </>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Select onChange={(e) => setGender(e.target.value)}>
                                        {genderList.map((gender, idx) => {
                                            return (
                                                <option key={idx} value={gender}>{gender}</option>
                                            )
                                        })}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
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
                                    <Row>
                                        <Col>
                                            <Form.Control
                                                style={{width:'100%'}}
                                                type="color"
                                                value={colorCode}
                                                title="Choose your color"
                                                onChange={(e) => setColorCode(e.target.value)}/>
                                        </Col>
                                        <Col>
                                            <p>{colorCode}</p>
                                        </Col>
                                    </Row>
                                </Form.Group>
                            </Col>
                            <Col xs={4}>
                                <Form.Group controlId='formfile'>
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control
                                        type="file" 
                                        label='Choose file' 
                                        onChange={uploadFileHandler} disabled={color.length > 0 ? false : true}/>                            
                                    {uploading && <Loader/>}
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
                        {
                            name && desc && category && gender && price && color && colorCode && image && stock ?
                            <Button type="button" variant="primary" className="mt-4" onClick={addProductHandler}>
                                Add new product
                            </Button>
                            :
                            <Button type="button" variant="primary" className="mt-4" size="lg" disabled>
                                Add new product
                            </Button>
                        }
                    </Form>
                </>
            )
        }
    }

    return (
        <Container fluid className="bg-white p-0">
            {
                loading ?
                <Loader/> :
                error ?
                <Message variant="danger">{error}</Message> :
                    <>  
                        <Table striped bordered hover className="m-0" responsive>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>GENDER</th>
                                    <th>COLOR</th>
                                    <th>IMAGE</th>
                                    <th>PRICE</th>
                                    <th>CATEGORY</th>
                                    <th>VARIANTS</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>

                            <tbody>
                            {products.map(product => {

                                let productImage

                                if(process.env.NODE_ENV === "production"){
                                    productImage = "https://d1o31fwgmtgkiy.cloudfront.net" + product.image
                                }

                                else {
                                    productImage = product.image
                                }

                                const productVariants = variants.filter(variant => variant.productId === product._id)

                                return (
                                    <tr key={product._id}>
                                        <td>
                                            {product._id.slice(0, 12)}
                                            <Button type="button" variant="white" onClick={() => {navigator.clipboard.writeText(product._id)}}>
                                                <i className="fas fa-copy"></i>
                                            </Button>
                                        </td>
                                        <td>{product.name}</td>
                                        <td>{product.gender}</td>
                                        <td>{product.defaultColor}</td>
                                        <td><Image fluid src={productImage} alt={product.name} style={{maxHeight: "100px"}}/></td>
                                        <td>{`$${product.price}`}</td>
                                        <td>{product.category}</td>
                                        <td>{productVariants.length} pcs</td>
                                        <td>
                                            <Button className="mb-2" type="button" onClick={() => setModalShow(product._id)}>
                                                Show Variants
                                            </Button>
                                            <br/>
                                            {
                                                edit === product._id ?
                                                <Button type="button" variant="danger" onClick={() => setEdit('')}>
                                                    <i className="fas fa-times"></i>
                                                </Button>
                                                :
                                                <Button type="button" onClick={() => setEdit(product._id)}>
                                                    <i className="fas fa-edit"></i>
                                                </Button>
                                            }
                                            <Button className="ms-2" type="button" variant="danger" onClick={() => deleteProductHandler(product._id)}>
                                                <i className="fas fa-trash"></i>
                                            </Button>
                                        </td>
                                        <VariantListModal 
                                            show={modalShow === product._id} 
                                            onHide={() => setModalShow(false)} 
                                            product={product}
                                            variants={productVariants}/>
                                    </tr>
                                )
                                })
                            }
                            </tbody>
                        </Table>
                        <Paginate pages={pages} page={page} isAdmin={true} clicked={setProductPage}/>
                    </>
            }
            {renderProduct()}
        </Container>
    )
}

export default ManageProducts
