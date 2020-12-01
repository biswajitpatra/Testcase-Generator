import React from 'react';
import {TextField,Typography,Box,Button,Container,AccordionSummary, AccordionDetails,CssBaseline, Accordion} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Var from '../Input-form/var';
import {connect} from 'react-redux';

function MiddleFormFields(props){
    // console.log("form",props);
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
                        />
                </Box>
                <Box m={2}>
                <TextField
                    label="Structure Of Input"
                    multiline
                    rows={4}
                    defaultValue=""
                    variant="outlined"
                    fullWidth
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
            <Button  variant="contained" color="primary" >
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