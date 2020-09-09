import React, { useState } from 'react';
import { Form, Col, Button } from 'react-bootstrap';

const JobSearch = ({ params, changeParams }) => {
  
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  
  return (
    <Form className="my-4" onSubmit={(e) => changeParams(e, description, location)}>
      <Form.Row>
        <Form.Group as={Col} xs={12} sm={6}>
          <Form.Label>Description</Form.Label>
          <Form.Control 
            name="description" 
            type="text" 
            placeholder="Enter job description..."
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col} xs={12} sm={6}>
          <Form.Label>Location</Form.Label>
          <Form.Control 
            name="location" 
            type="text" 
            placeholder="Enter job location..."
            onChange={(e) => setLocation(e.target.value)}
          />
        </Form.Group>
        <Button variant="dark" block type="submit">Search</Button>
      </Form.Row>
    </Form>
  )
}

export default JobSearch;