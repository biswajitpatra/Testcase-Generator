import {Container,Button,Form} from 'react-bootstrap';
import React from 'react';


class InputForm extends React.Component {
    constructor(props){
        super(props);
        this.state={vars:[]};
    }


    render(){
        return (
        <Form>
            <Form.Group>
                <Form.Label>Testcases</Form.Label>
                <Form.Control/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Structure of Input</Form.Label>
                <Form.Control as="textarea" rows={3} required/>
            </Form.Group>
            <Button size="lg"> 
                Create Testcase 
            </Button>
        </Form>
            );
        
    }
}

export default InputForm;