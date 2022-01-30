import React from 'react'
import { Pagination } from 'react-bootstrap'

const Paginate = ({ pages, page, isAdmin =false, keyword ='', clicked}) => {

    return pages > 1 && (
        <Pagination>
            {[...Array(pages).keys()].map(x => (
                <Pagination.Item active={x + 1 === page} key={x + 1} onClick={() => clicked(x + 1)}>
                    {x + 1}
                </Pagination.Item>
            ))}
        </Pagination>
    )
}

export default Paginate
