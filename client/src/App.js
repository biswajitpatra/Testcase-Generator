import Nav from './navbar.js';
import Var from './importer.js';
import InputForm from './input_form.js';
// import logo from './logo.svg';
import {Container,Row,Col,Accordion,Spinner,Card,InputGroup,FormControl} from 'react-bootstrap';
import './App.css';

function App() {
  return (
    <>
      <Nav/>
      <Container fluid>
        <Row className="mt-3">
          <Col xs = {3}>           
             <Container className="mt-2">
               <center><h3>Add variables</h3></center>
                <Accordion>
                  <Var value="Integer" eventKey='0' />
                  <Var value="String" eventKey='1'/>
                  <Var value="Array" eventKey='2'/>
                  <Var value="Tree" eventKey='3'/>
                  <Var value="Graph" eventKey='4'/> 
                </Accordion>
            </Container>
          </Col>
          <Col xs={5}>
            <Container>
              <center><h3>Input format</h3></center>
              <InputForm/>
            </Container>
          </Col>
          <Col>
            <Card>
              <Card.Body>
              <Card.Title>Sample Output</Card.Title>
              <Spinner animation="grow" variant="danger"/> 
              <InputGroup>
                <FormControl as="textarea" aria-label="With textarea" id="output" disabled rows={10}>
                 </FormControl>
              </InputGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
