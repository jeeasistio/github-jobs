import React from 'react';
import { Pagination } from 'react-bootstrap';

const JobsPagination = ({ page, setPage, hasNextPage }) => {
  
  return (
    <div className="d-flex justify-content-center">
      <Pagination>
        {page >= 2 && <Pagination.Prev onClick={() => setPage(page - 1)} />}
        {page >= 2 && <Pagination.Item onClick={() => setPage(1)}>1</Pagination.Item>}
        {page > 2 && <Pagination.Ellipsis />}
        {page > 3 && <Pagination.Item onClick={() => setPage(page - 2)}>{page - 2}</Pagination.Item>}
        {page > 2 && <Pagination.Item onClick={() => setPage(page - 1)}>{page - 1}</Pagination.Item>}
        <Pagination.Item active>{page}</Pagination.Item>
        {hasNextPage && <Pagination.Item onClick={() => setPage(page + 1)}>{page + 1}</Pagination.Item>}
        {hasNextPage && <Pagination.Next onClick={() => setPage(page + 1)} />}
      </Pagination>
    </div>
  )
}

export default JobsPagination;