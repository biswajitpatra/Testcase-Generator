import React from 'react';
import {TextField,MenuItem,Switch, FormControlLabel,Button,Box} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import params from '../../param.json';
import {connect} from 'react-redux';

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
  constructor(props){
      super(props);
      this.state={};
      // console.log(this.props);
      // console.log("hello",params[this.props.type])
      if("value" in this.props)
        this.state = this.props.value;
      else{
        var param_t = {}
        for(let [key,value] of Object.entries(params[this.props.type])){
          param_t[key] = value.value;
        }
        param_t["name"] = "";
        param_t["part"] = false;
        this.state =  param_t;
      }
      // console.log(this.state);
      this.state["type"]=this.props.type;

      this.handleChange = this.handleChange.bind(this);
      this.handleAdd = this.handleAdd.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(event){
    this.props.dispatch({
      type:"delete",
      name:this.state.name,
    });
  }

  handleChange(event){
    // console.log(event.target.name,event.target.value);
    if(event.target.name==="part"){
      this.setState({[event.target.name]:event.target.checked},()=>{
        if(this.props.edit){
          this.props.dispatch({
            type:"update",
            name:this.state.name,
            value:this.state,
          });
        }
      });
    }else
      this.setState({[event.target.name]:event.target.value},()=>{
        if(this.props.edit){
          this.props.dispatch({
            type:"update",
            name:this.state.name,
            value:this.state,
          });
        }
      });
    
  }

  handleAdd(event){
    this.props.dispatch({
      type:"add",
      name:this.state.name,
      value:this.state,
    });

    var param_t = {}
    for(let [key,value] of Object.entries(params[this.props.type])){
      param_t[key] = value.value;
    }
    param_t["name"] = "";
    param_t["part"] = false;
    this.setState(param_t);
  }

  render(){
    const {classes} = this.props;
    let button;
    if(this.props.edit){
        button = <Button  variant="contained" color="secondary" onClick={this.handleDelete} ><Box px={10}>Delete</Box></Button>;
    }else{
        button = <Button fullWidth variant="contained" color="primary" onClick={this.handleAdd}> ADD </Button>;
    }
    return (
        <div className={classes.root} autoComplete="off">
          <TextField
              label="Name"
              variant="outlined"
              fullWidth
              size="small"
              value={this.state.name}
              onChange={this.handleChange}
              disabled={this.props.edit}
              name="name"/>
              {
                Object.entries(params[this.props.type]).map(([ob,obv],i)=>{
                    if("options" in obv){
                        return (
                          <TextField
                              select
                              label={obv.name}
                              variant="outlined"
                              fullWidth
                              size="small"
                              key={i}
                              value={this.state[ob]}
                              onChange={this.handleChange}
                              name={ob}
                              >
                                    {obv.options.map((option) => (
                                      <MenuItem key={option} value={option}>
                                        {option}
                                      </MenuItem>
                                    ))}
                          </TextField>
                        )
                    }else{
                        return (
                          <TextField
                              label={obv.name}
                              variant="outlined"
                              fullWidth
                              multiline={obv.multiline?true:false}
                              size="small" 
                              key={i}
                              value={this.state[ob]}
                              onChange={this.handleChange}
                              name={ob}
                              />
                        )
                    }
                })
            }
          <Box width="100%" m={1}>
            <FormControlLabel
              control={<IOSSwitch/>}
              label="Part"
              checked={this.state.part}
              onChange={this.handleChange}  
              name="part"
            /> 
          </Box>
          {button}
      </div>

    )
  }
}

const mapStateToProps = (state) =>({
    variables : state.variables
})

export default connect(mapStateToProps)(withStyles(styles,{withTheme:true})(Var));