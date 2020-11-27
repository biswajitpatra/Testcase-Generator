import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
export default function OutputFormFields() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container style={{paddingTop:1}} maxWidth="sm">
            <h1>Sample Output</h1>
            <CircularProgress disableShrink />
        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '30vh' }} />
      </Container>
      </React.Fragment>
    );
  }