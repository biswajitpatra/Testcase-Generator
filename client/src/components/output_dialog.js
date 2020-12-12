import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Box,Paper,Grid,Button,Dialog,DialogActions,DialogContent,DialogContentText,LinearProgress,DialogTitle} from '@material-ui/core';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import FileCopyIcon from '@material-ui/icons/FileCopy';


const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
}));

export default function OutputDialog(props){
  const classes = useStyles();
  let content =<></>;
  console.log(props.data.progress);
  if(!("success" in props.data)){
              content = (<DialogContent>
                          <DialogContentText>
                                {props.data.text?props.data.text:"Connecting to server....."}
                          </DialogContentText>
                            <div className={classes.root}>
                                {props.data.progress?<LinearProgress color="secondary" variant="determinate" value={props.data.progress}/>:<LinearProgress/>}
                            </div>
                        </DialogContent>);
  }else{
              content = (<DialogContent>
                          <DialogContentText>
                                {props.data.message}
                          </DialogContentText>
                          { !props.data.success &&
                            <div className={classes.root}>
                                <Grid 
                                  container
                                  justilfy="center"
                                  spacing={2}
                                    >
                                  <Grid item xs={12} lg={4}>
                                   <Grid
                                      container
                                      direction="row"
                                      justify="space-between"
                                      alignItems="center"
                                    >
                                    <Grid item>
                                      <Box fontSize="h6.fontSize" fontWeight="fontWeightBold">INPUT: </Box> 
                                    </Grid>
                                    <Grid item>
                                    <Box p={1} >
                                      <CopyToClipboard text={props.data.input}>
                                                <Button variant="contained" color="primary" align="left" startIcon={<FileCopyIcon/>}>Copy</Button>
                                      </CopyToClipboard>
                                    </Box> 
                                    </Grid>
                                    </Grid>
                                    <Box  style={{ backgroundColor: '#cfe8fc'}} 
                                          height="400px" 
                                          overflow="auto" 
                                          p={2} 
                                          fontFamily="Monospace" 
                                          fontSize="h6.fontSize"
                                          borderRadius={10}
                                          >
                                          <pre>{props.data.input}</pre> 
                                    </Box>
                                  </Grid>
                                  <Grid item xs={12} lg={4}>
                                    <Grid
                                        container
                                        direction="row"
                                        justify="space-between"
                                        alignItems="center"
                                      >
                                      <Grid item>
                                        <Box fontSize="h6.fontSize" fontWeight="fontWeightBold">FILE 1 OUTPUT: </Box> 
                                      </Grid>
                                      <Grid item>
                                      <Box p={1} >
                                        <CopyToClipboard text={props.data.file1}>
                                                  <Button variant="contained" color="primary" align="left" startIcon={<FileCopyIcon/>}>Copy</Button>
                                        </CopyToClipboard>
                                      </Box> 
                                      </Grid>
                                      </Grid>
                                      <Box  style={{ backgroundColor: '#cfe8fc'}} 
                                            height="400px" 
                                            overflow="auto" 
                                            p={2} 
                                            fontFamily="Monospace" 
                                            fontSize="h6.fontSize"
                                            borderRadius={10}
                                            >
                                            <pre>{props.data.file1}</pre> 
                                      </Box>
                                    </Grid>
                                  <Grid item xs={12} lg={4}>
                                  <Grid
                                      container
                                      direction="row"
                                      justify="space-between"
                                      alignItems="center"
                                    >
                                    <Grid item>
                                      <Box fontSize="h6.fontSize" fontWeight="fontWeightBold">FILE 2 OUTPUT: </Box> 
                                    </Grid>
                                    <Grid item>
                                    <Box p={1} >
                                      <CopyToClipboard text={props.data.file2}>
                                                <Button variant="contained" color="primary" align="left" startIcon={<FileCopyIcon/>}>Copy</Button>
                                      </CopyToClipboard>
                                    </Box> 
                                    </Grid>
                                    </Grid>
                                    <Box  style={{ backgroundColor: '#cfe8fc'}} 
                                          height="400px" 
                                          overflow="auto" 
                                          p={2} 
                                          fontFamily="Monospace" 
                                          fontSize="h6.fontSize"
                                          borderRadius={10}
                                          >
                                          <pre>{props.data.file2}</pre> 
                                    </Box>
                                  </Grid>
                                </Grid>
                            </div>
                          }
                        </DialogContent>)
  }
  // props.source.stream();

  return (
      <Dialog
        fullWidth={true}
        maxWidth='lg'
        open={props.open}
        onClose={props.onClose}
      >
        <DialogTitle>Result</DialogTitle>
          {content}
        <DialogActions>
          <Button onClick={props.onClose} disabled={false} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
  );
}