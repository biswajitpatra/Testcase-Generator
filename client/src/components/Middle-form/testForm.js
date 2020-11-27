import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import TextField from '@material-ui/core/TextField';
import {ColorButton,useStyles} from './testFormcss.js';
  
  export default function MiddleFormFields() {
    const [name, setName] = React.useState("");
    const classes=useStyles();
    const handleChange = (event) => {
        setName(event.target.value);
      };
      return (
        <form style={{paddingTop:11 }}className={classes.root} noValidate autoComplete="off">
            <h1 style={{textAlign:"center"}}>Input Format</h1>
            <br />
          <div>    
          <FormControl variant="outlined">
        <InputLabel htmlFor="component-outlined">TestCases</InputLabel>
        <OutlinedInput id="component-outlined" value={name} onChange={handleChange} label="TestCases" />

      </FormControl>
      </div>
      <br/>
      <div>
      <TextField
          id="outlined-multiline-static"
          label="Structure Of Input"
          multiline
          rows={4}
          defaultValue=" "
          variant="outlined"
        />
      </div>
      <ColorButton style={{"width":"520px"}} variant="contained" color="primary" className={classes.margin}>
        Create Test Cases
      </ColorButton>
      </form>
      )}