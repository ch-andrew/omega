import React from 'react'
import MainCarousel from '../components/MainCarousel'
import Categories from '../components/Categories'
// import Gallery from '../components/Gallery'
import NewProducts from '../components/NewProducts'
import { Container } from 'react-bootstrap'

const Homepage = ({ match }) => {

    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1

    return (
        <>  
            <MainCarousel/>
            <Container fluid className="d-flex gap-2 mb-3" style={{height: '30vh', backgroundColor: "rgb(41,41,41)"}}>
                <Container className="my-auto text-center">
                    <p className="outfit display-5" style={{color: "white"}}>You can pull of any look, you just gotta wear it with CONFIDENCE</p>
                </Container>
            </Container>
            <Categories/>
            <NewProducts keyword={keyword} pageNumber={pageNumber}/>
        </>
    )
}

export default Homepage
