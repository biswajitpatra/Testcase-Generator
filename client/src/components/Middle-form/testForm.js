import React from 'react';
import {TextField,Typography,Box,Button,Container,AccordionSummary, AccordionDetails,CssBaseline, Accordion} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Var from '../Input-form/var';

export default function MiddleFormFields() {

    return (
      <>
        <Box m={3}>
          <Typography variant="h4" display="block" align="center"><b>Input Format</b></Typography>
        </Box>
        <form autoComplete="off">
                <Box m={2}>   
                <TextField
                        id="outlined-multiline-static"
                        label="Testcases"
                        variant="outlined"
                        fullWidth
                        />
                </Box>
                <Box m={2}>
                <TextField
                    id="outlined-multiline-static"
                    label="Structure Of Input"
                    multiline
                    rows={4}
                    defaultValue=" "
                    variant="outlined"
                    fullWidth
                    />
                </Box>
                <Box m={2}>
                <Accordion >
                  <AccordionSummary 
                        aria-controls="panel1d-content" 
                        id="panel1d-header"
                        expandIcon={<ExpandMoreIcon />}>
                    <Box px={3} fontSize="h6.fontSize">{"Integer : N"}</Box>
                  </AccordionSummary>
                  <AccordionDetails>      
                    <Box width="100%"><Var edit value={"Integer"}/></Box>
                  </AccordionDetails>
                </Accordion>
                </Box>
          <center>
            <Button  variant="contained" color="primary" >
              <Box px={4}>Create Test Cases</Box>
            </Button>
          </center>
        </form>
      </>
      )}