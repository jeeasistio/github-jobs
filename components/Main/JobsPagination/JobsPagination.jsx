import React from 'react';
import { Pagination } from 'react-bootstrap';

const JobsPagination = ({ page, setPage }) => {
  return (
    <Pagination>
      <Pagination.Prev />
      <Pagination.Ellipsis />
      <Pagination.Next />
    </Pagination>
  )
}

export default JobsPagination;