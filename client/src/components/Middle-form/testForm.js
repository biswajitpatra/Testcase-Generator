import React from 'react';
import {TextField,Typography,Box,Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


export default function MiddleFormFields() {
    const classes = useStyles();

    return (
      <>
        <Box m={3}>
          <Typography variant="h4" display="block" align="center"><b>Input Format</b></Typography>
        </Box>
        <form className={classes.root} autoComplete="off">   
                <TextField
                        id="outlined-multiline-static"
                        label="Testcases"
                        variant="outlined"
                        fullWidth
                        />
            
                <TextField
                    id="outlined-multiline-static"
                    label="Structure Of Input"
                    multiline
                    rows={4}
                    defaultValue=" "
                    variant="outlined"
                    fullWidth
                    />
          <center>
            <Button  variant="contained" color="primary" >
              <Box px={4}>Create Test Cases</Box>
            </Button>
          </center>
        </form>
      </>
      )}