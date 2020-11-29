import React from 'react';
import { makeStyles ,withStyles} from '@material-ui/core/styles';
import {Container,CssBaseline,Typography,CircularProgress,Box,Paper} from '@material-ui/core';

export default function OutputFormFields(props) {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container>
                <Box m={3}>
                  <Typography variant="h4" display="block" align="center"><b>Sample Output</b></Typography>
                </Box>
                
                <Box  style={{ backgroundColor: '#cfe8fc'}} 
                      height="400px" 
                      overflow="auto" 
                      p={2} 
                      fontFamily="Monospace" 
                      fontSize="h6.fontSize"
                      borderRadius={10}
                      borderColor="error.main">
                      <CircularProgress disableShrink />
                      <pre>{props.text}</pre> 
                </Box>
            </Container>
      </React.Fragment>
    );
  }