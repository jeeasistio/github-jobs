import React, { useState } from 'react';
import { Card, Badge, Button, Collapse } from 'react-bootstrap';
import parse from 'html-react-parser';

const JobCard = ({ job }) => {

  const {
    title,
    location,
    type,
    how_to_apply: contact,
    company_logo: logo,
    description,
    created_at: date
  } = job;

  const [detailsIsOpen, setDetailsIsOpen] = useState(false);

  return (
    <Card className="my-2">
      <Card.Body>
        <div>
          <div className="d-flex w-100 justify-content-between align-items-center mb-2">
            <Card.Title className="m-0">{title}</Card.Title>
            <div className="d-none d-sm-block ml-2">
              <img src={logo} height="50" />
            </div>
          </div>
          <div>
            <Badge variant="dark">{type}</Badge>
          </div>
          <p className="text-secondary">{location}</p>
          {parse(contact)}
        </div>
        <div className="d-flex w-100 justify-content-between align-items-center">
          <Button 
            variant={detailsIsOpen ? 'secondary': 'dark'} 
            onClick={() => setDetailsIsOpen(!detailsIsOpen)}
          >
              {detailsIsOpen ? 'Hide' : 'Show'} Details
          </Button>
          <p className="m-0 text-secondary">{new Date(date).toLocaleDateString()}</p>
        </div>
        <Collapse in={detailsIsOpen}>
          <div className="mt-3">
            {parse(description)}
          </div>
        </Collapse>
      </Card.Body>
    </Card>
  )
}

export default JobCard;