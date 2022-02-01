import React from 'react'
import { Pagination } from 'react-bootstrap'

const Paginate = ({ pages, page, isAdmin =false, keyword ='', clicked}) => {

    return pages > 1 && (
        <Pagination>
            <Pagination.First onClick={() => clicked(page = (pages + 1) - pages)}/>
            <Pagination.Prev onClick={() => clicked(page - 1)}/>
            {[...Array(pages).keys()].map(x => (
                <>
                    <Pagination.Item active={x + 1 === page} key={x + 1} onClick={() => clicked(x + 1)}>
                        {x + 1}
                    </Pagination.Item>
                </>
            ))}
            <Pagination.Next onClick={() => clicked(page + 1)}/>
            <Pagination.Last onClick={() => clicked(pages)}/>
        </Pagination>
    )
}

export default Paginate
