import React, { useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import useFetchJobs from '/custom hooks/useFetchJobs.jsx';
import JobSearch from './JobSearch/JobSearch.jsx';
import JobCard from './JobCard/JobCard.jsx';
import JobsPagination from './JobsPagination/JobsPagination.jsx';

const Main = () => {

  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);

  const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page);

  const changeParams = (e, description, location) => {
    e.preventDefault();
    setPage(1);
    setParams(prevParams => ({
      ...prevParams,
      description,
      location
    }))
  }

  return (
    <Container as="main">
      <h4 className="my-4 text-center">Stop slacking. Find a job.</h4>
      <JobSearch params={params} changeParams={changeParams} />
      {!loading && <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />}
      {loading && 
        <div className="my-4 text-center"><Spinner variant="dark" animation="border" /></div>
      }
      {error && <h2 className="text-center text-secondary">Something went wrong</h2>}
        {jobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      {!loading && <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />}
    </Container>
  )
}

export default Main;