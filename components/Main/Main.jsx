import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import useFetchJobs from '/custom hooks/useFetchJobs.jsx';
import JobCard from './JobCard/JobCard.jsx';
import JobsPagination from './JobsPagination/JobsPagination.jsx';

const Main = () => {

  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);

  const { jobs, loading, error } = useFetchJobs(params, page);

  return (
    <Container as="main">
      <JobsPagination page={page} setPage={setPage} />
        {jobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      <JobsPagination page={page} setPage={setPage} />
    </Container>
  )
}

export default Main;