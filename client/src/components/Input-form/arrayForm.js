import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import { green, indigo } from '@material-ui/core/colors';

  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(indigo[500]),
      backgroundColor: indigo[500],
      '&:hover': {
        backgroundColor: indigo[700],
      },
    },
  }))(Button);
const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
      '& .MuiSelect-outlined.MuiSelect-outlined': {
          width:181,
      },
    },
  }));
  const IOSSwitch = withStyles((theme) => ({
    root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      '&$checked': {
        transform: 'translateX(16px)',
        color: theme.palette.common.white,
        '& + $track': {
            backgroundColor: theme.palette.primary.main,
            borderColor: theme.palette.primary.main,
          opacity: 1,
          border: 'none',
        },
      },
      '&$focusVisible $thumb': {
        color: '#5952d8',
        border: '6px solid #fff',
      },
    },
    thumb: {
      width: 24,
      height: 24,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
  }))(({ classes, ...props }) => {
    return (
      <Switch
        focusVisibleClassName={classes.focusVisible}
        disableRipple
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
        {...props}
      />
    );
  });
  const uniques = [
    {
      value: '1',
      label: 'true',
    },
    {
        value:'0',
        label:'false',
    },
    
  ];
  const ranges = [
    {
      value: 'NULL',
      label: 'None',
    },
    {
        value: 'increasing',
        label: 'Increasing',
      },
      {
        value: 'decreasing',
        label: 'Decreasing',
      }
    
  ];
  
  export default function ArrayFields() {
    const [name, setName] = React.useState("");
    const [range,setRange] = React.useState(0);
  const classes = useStyles();
  const [length,setlength] = React.useState("");
  const [state, setState] = React.useState({
    
    checkedB: true,
    
  });
  const [unique,setUnique] = React.useState(0);

  const button = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const lengthy =(event)=>{
    setlength(event.target.value);
};
  const handleChange = (event) => {
    setName(event.target.value);
  };
  const happy =(event)=>{
      setRange(event.target.value);
  };
  const bad =(e)=>{
      setUnique(e.target.value);
  }
    return (
        <form className={classes.root} noValidate autoComplete="off">
          <div>    
          <FormControl variant="outlined">
        <InputLabel htmlFor="component-outlined">Name</InputLabel>
        <OutlinedInput id="component-outlined" value={name} onChange={handleChange} label="Name" />

      </FormControl>
      </div>
      <br />
      <div>
      <FormControl variant="outlined">
        <InputLabel htmlFor="component-outlined">Length</InputLabel>
        <OutlinedInput id="component-outlined" value={length} onChange={lengthy} label="length" />

      </FormControl>
      </div>
      <br />
      <div>
      <TextField
          id="outlined-select-currency"
          select
          label="order"
          value={range}
          onChange={happy}
          helperText="Please select your range"
          variant="outlined"
        >
          {ranges.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        </div>
        <br />
        <div>
      <TextField
          id="outlined-select-currency"
          select
          label="distict"
          value={unique}
          onChange={bad}
          helperText="Please select your range"
          variant="outlined"
        >
          {uniques.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        </div>
        <div>
        <FormControlLabel
        control={<IOSSwitch checked={state.checkedB} onChange={button} name="checkedB" />}
        label="part"
      />
        </div>
        <ColorButton style={{"width":"212px"}} variant="contained" color="primary" className={classes.margin}>
        ADD
      </ColorButton>
        </form>)}