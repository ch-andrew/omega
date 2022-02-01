import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button} from 'react-bootstrap'

const SearchBox = ({ gender , category}) => {
    const history = useHistory()

    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword.trim()){
            console.log(gender);
            history.push(`/shop/${gender}/${category}/search/${keyword}`)
        }

        else {
            history.push('/')
        }
    }

    return (
        <Form className="d-flex" onSubmit={submitHandler}>
            <Form.Control type="text" name="q" placeholder="Search" className="mr-sm-2 ml-sm-5" onChange={(e) => setKeyword(e.target.value)}>
            </Form.Control>
            <Button type="submit" variant="dark" className="p-2" style={{width: "200px"}}>
                <i className="fas fa-search"></i>
            </Button>
        </Form>
    )
}

export default SearchBox
