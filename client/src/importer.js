import {Container,Button,Form} from 'react-bootstrap';
import React from 'react';
import param from './param.json'
import {Card,Accordion} from 'react-bootstrap';

class Var extends React.Component {
    render(){
       return (
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey={this.props.eventKey}>
            {this.props.value}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={this.props.eventKey}>
            <Card.Body>
                {/* <Container> */}
                    <Form>
                        <Form.Group>
                        <Form.Label htmlFor="name">Name</Form.Label>
                        <Form.Control id="name"/>
                        </Form.Group>
                        {
                            Object.keys(param[this.props.value]).map((ob)=>{
                                if("options" in param[this.props.value][ob]){
                                    return (
                                        <Form.Group>
                                        <Form.Label htmlFor={ob}>{ob}</Form.Label>
                                        <Form.Control as="select" id={ob}>
                                            {param[this.props.value][ob]["options"].map((op)=>(<option>{op}</option>))}
                                        </Form.Control>
                                        </Form.Group>
                                    )
                                }else{
                                    return (
                                        <Form.Group>
                                        <Form.Label htmlFor={ob}>{ob}</Form.Label>
                                        <Form.Control placeholder={param[this.props.value][ob]["value"]} id={ob}/>
                                        </Form.Group>
                                    )
                                }
                            })
                        }
                        <Form.Group>
                        <Form.Check 
                                type="switch"
                                id = {`custom-switch-${this.props.eventKey}`}
                                label="part"
                            />
                        </Form.Group>
                        <Button type="submit" block>Add</Button>
                    </Form>
                {/* </Container> */}
            </Card.Body>
            </Accordion.Collapse>
        </Card>);
    }
}


export default Var;