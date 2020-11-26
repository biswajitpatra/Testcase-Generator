import { green, indigo } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

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
      '& .MuiFormControl-root': {
          width: "100%",
      },
    },
  }));

  export {ColorButton,useStyles}