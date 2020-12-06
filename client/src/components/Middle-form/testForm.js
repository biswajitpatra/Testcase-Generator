import React from 'react';
import {TextField,Typography,Box,Button,Container,AccordionSummary, AccordionDetails,CssBaseline, Accordion,ButtonGroup} from '@material-ui/core';
// import {LoadingButton} from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Var from '../Input-form/var';
import OutputDialog from '../output_dialog.js'
import {connect} from 'react-redux';
import SSE from '../../sse.js';

class MiddleFormFields extends React.Component{
  constructor(props){
    super(props);
    this.state = {form_input:{
              testcases:"",
              structure:"",
              preprocess:"",
              file1:"",
              file2:"",
            },
            open_result:false,
            pending:false,
            output:{}
    }
    this.postData={};
    this.source = new SSE('/compare_code',{
      headers: {'content-type': 'application/json'},
      payload: {},
      method: 'POST'
    });
    this.source.addEventListener('message', (e)=>{
      // console.log("data",e.data);
      this.setState({output:JSON.parse(e.data)});
    });
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit_sample = this.onSubmit_sample.bind(this);
    this.close_result = this.close_result.bind(this);
    this.onSubmit_final = this.onSubmit_final.bind(this);
  }

  handleChange(e){
    this.setState((prestate) => ({...prestate,form_input:{...prestate.form_input,[e.target.name]:e.target.value}}));
  }

  onSubmit_sample(e){
    var postData = {input:{variables:this.props.variables,times:1,testcases:this.state.form_input.testcases,structure:this.state.form_input.structure}};
    // console.log(postData);
    this.setState({pending:true},()=>{
    fetch("/sample_output",{
      body:JSON.stringify(postData),
      headers: new Headers({'content-type': 'application/json'}),
      method:"POST",
    }).then(res=>res.text()).then((res)=>{this.setState({pending:false});this.props.dispatch({type:"sample_output",value:res})})});
  };
  
  close_result(){
    if(this.source.readyState === this.source.OPEN || this.source.readyState === this.source.CONNECTING)
      this.source.close();
    this.setState({pending:false,open_result:false,output:{}});
    
    this.source = new SSE('/compare_code',{
      headers: {'content-type': 'application/json'},
      payload: {},
      method: 'POST'
    });
    this.source.addEventListener('message', (e)=>{
      // console.log("data",e.data);
      this.setState({output:JSON.parse(e.data)});
    });
  }

  onSubmit_final(e){
    this.postData = {preprocess:this.state.form_input.preprocess,files:{brute:this.state.form_input.file1,code:this.state.form_input.file2},input:{variables:this.props.variables,times:7000,testcases:this.state.form_input.testcases,structure:this.state.form_input.structure}};
    this.source.payload = JSON.stringify(this.postData);
    this.setState({pending:true,open_result:true});
    this.source.stream();

    
  }
  render(){
    return (
      <>
        <OutputDialog 
            open={this.state.open_result} 
            onClose={this.close_result}
            data={this.state.output}
            // postData = {postData}
            // source={source}
              />
        <Box m={3}>
          <Typography variant="h4" display="block" align="center"><b>Input Format</b></Typography>
        </Box>
        <form autoComplete="off">
                <Box m={2}>   
                <TextField
                        name="testcases"
                        label="Testcases"
                        variant="outlined"
                        fullWidth
                        onChange={this.handleChange}
                        value={this.state.form_input.testcases}
                        />
                </Box>
                <Box m={2}>
                <TextField
                    name="structure"
                    label="Structure Of Input"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    value={this.state.form_input.structure}
                    onChange={this.handleChange}
                    />
                </Box>
                <Box m={2}>
                  <TextField
                      name="preprocess"
                      label="Preprocess"
                      variant="outlined"
                      fullWidth
                      value={this.state.form_input.preprocess}
                      onChange={this.handleChange}
                      />
                </Box>
                <Box m={2}>
                  <TextField
                      name="file1"
                      label="File-1"
                      variant="outlined"
                      fullWidth
                      value={this.state.form_input.file1}
                      onChange={this.handleChange}
                      />
                </Box>
                <Box m={2}>
                  <TextField
                      name="file2"
                      label="File-2"
                      variant="outlined"
                      fullWidth
                      value={this.state.form_input.file2}
                      onChange={this.handleChange}
                      />
                </Box>
                <Box m={2}>
                {
                  Object.entries(this.props.variables).map(([a,b],i) => (
                    <Accordion key={a}>
                      <AccordionSummary 
                            aria-controls="panel1d-content" 
                            id="panel1d-header"
                            expandIcon={<ExpandMoreIcon />}>
                        <Box px={3} fontSize="h6.fontSize">{b.type + " : " + a}</Box>
                      </AccordionSummary>
                      <AccordionDetails>      
                        <Box width="100%"><Var edit type={b.type} value={b}/></Box>
                      </AccordionDetails>
                    </Accordion>
                  ))
                }
                  
                </Box>
          <center>
            <ButtonGroup size="large" variant="contained" color="primary" aria-label="large outlined primary button group">
              <Button disabled={this.state.pending} onClick={this.onSubmit_sample}>
                Create Sample Output
              </Button>
              <Button disabled={this.state.pending} onClick={this.onSubmit_final}>
                Compare codes
              </Button>
            </ButtonGroup>
          </center>
        </form>
      </>
    )
  }
}


const mapStateToProps = (state) =>({
  variables : state.variables
})


export default connect(mapStateToProps)(MiddleFormFields)