import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ContainerFluidExample() {
  return (
    <Container fluid className='Footer'>
      <Row>
        <Col xs={6}><a href="https://github.com/andrewcannan" target="_blank" rel="noreferrer">GitHub <i className="fa-brands fa-github"></i></a></Col>
        <Col xs={6}><a href="https://www.linkedin.com/in/andrew-cannan/" target="_blank" rel="noreferrer">LinkedIn <i className="fa-brands fa-linkedin"></i></a></Col>
      </Row>
    </Container>
  );
}

export default ContainerFluidExample;