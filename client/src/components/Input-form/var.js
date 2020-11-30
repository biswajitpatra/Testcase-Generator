import React from 'react';
import {TextField,MenuItem,Switch, FormControlLabel,Button,Box} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import params from '../../param.json';

const styles = (theme) => ({
    root: {
      '& > *': {
        "margin-bottom": theme.spacing(1),
      },
    },
});

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

class Var extends React.Component{
  render(){
    const {classes} = this.props;
    let button;
    if(this.props.edit){
        button = <Button  variant="contained" color="secondary" ><Box px={10}>Delete</Box></Button>;
    }else{
        button = <Button fullWidth variant="contained" color="primary"> ADD </Button>;
    }
    return (
        <form className={classes.root} autoComplete="off">
          <TextField
              label="Name"
              variant="outlined"
              fullWidth
              size="small"/>
              {
                Object.keys(params[this.props.value]).map((ob)=>{
                    if("options" in params[this.props.value][ob]){
                        return (
                          <TextField
                              select
                              id="outlined-multiline-static"
                              label={ob}
                              variant="outlined"
                              fullWidth
                              size="small"
                              >
                                    {params[this.props.value][ob]["options"].map((option) => (
                                      <MenuItem key={option} value={option}>
                                        {option}
                                      </MenuItem>
                                    ))}
                          </TextField>
                        )
                    }else{
                        return (
                          <TextField
                              label={ob}
                              variant="outlined"
                              fullWidth
                              size="small"/>
                        )
                    }
                })
            }
          <Box width="100%" m={1}>
            <FormControlLabel
              control={<IOSSwitch/>}
              label="Part"
            /> 
          </Box>
          {button}
      </form>

    )
  }
}

export default withStyles(styles,{withTheme:true})(Var)