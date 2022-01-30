import React, {useState, useEffect} from 'react'
import { Row, Col, Button, ButtonToolbar} from 'react-bootstrap'

const ProductColors = ({variants, clicked, selectedColor}) => { 
    

    const [active, setActive] = useState(true)
    const [btnId, setBtnID] = useState()

    useEffect(() => {
        const activeButton = variants.find(variant => variant.color === selectedColor)
        if(activeButton){
            let {_id} = activeButton
            setBtnID(_id)
        }
    },[variants, selectedColor])

        const colors = variants.map(variant => {

            const styleColor = variant.color === 'White' ? '#0D6EFD' : 'White'
    
            return (
                <Button
                    type="button"
                    key={variant._id} 
                    className="btn-circle mx-1" 
                    style={{backgroundColor: variant.colorCodes, borderColor: styleColor}}
                    value={variant.color}
                    onClick={
                        () => {
                            clicked(variant.color)
                            setActive(true)
                            setBtnID(variant._id)
                        }
                    }>
                    {active && btnId === variant._id ? <i className="fas fa-check" style={{color: styleColor}}></i> : null}
                </Button>
            )
        })
    
        return (

            <Row className="mt-4 align-items-center">
                <Col xs={3}>
                    <h6 className="montserrat-bold  m-0">COLOR</h6>
                    <h6 className="text-muted montserrat-bold  m-0">{selectedColor ? selectedColor : null}</h6>
                </Col>
                <Col>
                    <ButtonToolbar aria-label="Basic example">
                        {colors}
                    </ButtonToolbar>
                </Col>
            </Row>
        )

}

export default ProductColors
