import React from 'react';
import { makeStyles ,withStyles} from '@material-ui/core/styles';
import {Container,CssBaseline,Typography,CircularProgress,Box,Paper,Button} from '@material-ui/core';
import {connect} from 'react-redux';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import {CopyToClipboard} from 'react-copy-to-clipboard';

function OutputFormFields(props) {

    return (
      <React.Fragment>
        <CssBaseline />
        <Container>
                <Box m={3}>
                  <Typography variant="h4" display="block" align="center"><b>Sample Output</b></Typography>
                </Box>
                <Box display="flex" justifyContent="flex-end" p={1} >
                  <CopyToClipboard text={props.sample_output}>
                             <Button variant="contained" color="primary" align="left" startIcon={<FileCopyIcon/>}>Copy</Button>
                  </CopyToClipboard>
                </Box> 
                
                <Box  style={{ backgroundColor: '#cfe8fc'}} 
                      height="400px" 
                      overflow="auto" 
                      p={2} 
                      fontFamily="Monospace" 
                      fontSize="h6.fontSize"
                      borderRadius={10}
                      borderColor="error.main">
                      {/* <CircularProgress disableShrink /> */}
                      <pre>{props.sample_output}</pre> 
                </Box>
            </Container>
      </React.Fragment>
    );
}

const mapStateToProps = (state) =>({
  sample_output : state.sample_output
})

export default connect(mapStateToProps)(OutputFormFields);

