import React, {useState, useEffect} from 'react'
import { Row, Col, Button, ButtonToolbar} from 'react-bootstrap'

const ProductStock = ({variants, clicked, selectedColor, selectedQty}) => { 
    
    const [selectedVariant, setVariant] = useState()

    const [active, setActive] = useState(true)

    const [btnId, setBtnID] = useState()

    const [currentStock, setStock] = useState()

    useEffect(() => {

        const fetchStock = async () => {           
            const variantData = await variants.find(variant => variant.color === selectedColor)

            if(variantData){
                const sizes = Object.keys(variantData.stock)

                for (let i = 0; i < sizes.length; i++) {
                    if(variantData.stock[sizes[i]] > 0){
                        setBtnID(sizes[i])
                        setStock(variantData.stock[sizes[i]])
                        break;
                    }
                }

                
                // setBtnID(selectedSize)
                setVariant(variantData)
            }   
        }

        fetchStock()
    },
    [variants, selectedColor]
    )

    const sizeButtons = () => {

        if(selectedVariant){

            const sizes = Object.keys(selectedVariant.stock)

            const sizesStock = sizes.map(size => {
                if(selectedVariant.stock[size] > 0){
                    return (
                        <Button 
                        key={size + 'i'} 
                        type="button" 
                        className="btn-circle mx-1"
                        onClick={() => {
                            clicked.selectSize(size)
                            setActive(true)
                            setBtnID(size)
                            setStock(selectedVariant.stock[size])
                            clicked.resetQty(0)
                        }}>
                        {active && btnId === size ? <i className="fas fa-check"></i> : size.substring(4)}
                        </Button>
                    )
                }

                else {
                    return (
                        <Button 
                        key={size + 'i'} 
                        type="button" 
                        className="btn-circle btn-size mx-1" disabled>
                            {size.substring(4)}
                        </Button>
                    )
                }
            })

            return sizesStock
        }

        else {
            return null
        }
    }

        return (

            <>
                <Row className="mt-4 align-items-center">
                    <Col xs={3}>
                        <h6 className="montserrat-bold  m-0">SIZE</h6>
                        <h6 className="text-muted montserrat-bold  m-0">{btnId && currentStock ? null : "Out of Stock"}</h6>
                    </Col>
                    <Col>
                        <ButtonToolbar aria-label="basic example">
                            {sizeButtons()}
                        </ButtonToolbar>
                    </Col>
                </Row>
                <Row className="mt-4 align-items-center">
                    <Col xs={3} >
                        <h6 className="montserrat-bold  m-0">QUANTITY</h6>
                    </Col>
                    <Col>
                        {selectedQty >= currentStock
                        ? <i className="fas fa-plus fa-lg" style={{padding: '6px'}} disabled></i>
                        : <i className="fas fa-plus fa-lg" style={{padding: '6px', cursor: 'pointer'}} onClick={clicked.addQty}></i>
                        }
                        <span className="mx-3 text-muted">{selectedQty}</span>
                        {selectedQty <= 0 
                        ? <i className="fas fa-minus fa-lg" style={{padding: '6px'}} disabled></i>
                        : <i className="fas fa-minus fa-lg" style={{padding: '6px', cursor: 'pointer'}} onClick={clicked.removeQty}></i>
                        }
                    </Col>
                </Row>
            </>
                
        )

}

export default ProductStock
