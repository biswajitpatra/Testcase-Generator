import React from 'react';
import {TextField,Typography,Box,Button,Container,AccordionSummary, AccordionDetails,CssBaseline, Accordion} from '@material-ui/core';
// import {LoadingButton} from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Var from '../Input-form/var';
import {connect} from 'react-redux';


function MiddleFormFields(props){
    // console.log("form",props);
    let [tst,set_tst] = React.useState("");
    let [stru,set_stru] = React.useState("");

    let [pending,set_pending] = React.useState(false);

    let onSubmit = (e)=>{
        var postData = {input:{variables:props.variables,times:1,testcases:tst,structure:stru}};
        // console.log(postData);
        set_pending(true,
        fetch("/sample_output",{
          body:JSON.stringify(postData),
          headers: new Headers({'content-type': 'application/json'}),
          method:"POST",
        }).then(res=>res.text()).then((res)=>{set_pending(false);props.dispatch({type:"sample_output",value:res})}));
    }; 

    return (
      <>
        <Box m={3}>
          <Typography variant="h4" display="block" align="center"><b>Input Format</b></Typography>
        </Box>
        <form autoComplete="off">
                <Box m={2}>   
                <TextField
                        label="Testcases"
                        variant="outlined"
                        fullWidth
                        onChange={(e)=>set_tst(e.target.value)}
                        value={tst}
                        />
                </Box>
                <Box m={2}>
                <TextField
                    label="Structure Of Input"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    value={stru}
                    onChange={(e)=>set_stru(e.target.value)}
                    />
                </Box>
                <Box m={2}>
                {
                  Object.entries(props.variables).map(([a,b],i) => (
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
            <Button disabled={pending} variant="contained" color="primary" onClick={onSubmit}>
              <Box px={4}>Create Test Cases</Box>
            </Button>
          </center>
        </form>
      </>
)}

const mapStateToProps = (state) =>({
  variables : state.variables
})


export default connect(mapStateToProps)(MiddleFormFields)