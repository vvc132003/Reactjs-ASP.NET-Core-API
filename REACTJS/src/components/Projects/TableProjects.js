import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';

const ProjectCard = ({ project }) => {
  return (
    <Card className="project-card shadow-sm">
      <Card.Body>
        <Card.Title>{project.project_name}</Card.Title>
        <Card.Text className="text-muted">
          {project.description}
        </Card.Text>
        <Card.Text>
          <Badge bg={project.status === 'completed' ? 'success' : project.status === 'in_progress' ? 'warning' : 'secondary'}>
            {project.status.replace('_', ' ')}
          </Badge>  
        </Card.Text>
        <Card.Text>
          <small className="text-muted">Start Date: {project.start_date}</small>
        </Card.Text>
        <Card.Text>
          <small className="text-muted">End Date: {project.end_date}</small>
        </Card.Text>
        <Button variant="primary">View Details</Button>
      </Card.Body>
    </Card>
  );
}

const TableProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch projects data from API or database
    // This is a sample data. Replace it with actual data fetching logic.
    const sampleProjects = [
      {
        project_id: 1,
        project_name: 'Project 1',
        description: 'Description for Project 1',
        start_date: '2023-01-01',
        end_date: '2023-12-31',
        status: 'in_progress'
      },
      {
        project_id: 2,
        project_name: 'Project 2',
        description: 'Description for Project 2',
        start_date: '2023-02-01',
        end_date: '2023-11-30',
        status: 'not_started'
      },
      // Add more sample projects as needed
    ];
    setProjects(sampleProjects);
  }, []);

  return (
    <Container className="my-5">
      <h1 className="mb-4">Project Management</h1>
      <Row>
        {projects.map((project) => (
          <Col key={project.project_id} sm={12} md={6} lg={4}>
            <ProjectCard project={project} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default TableProjects;
