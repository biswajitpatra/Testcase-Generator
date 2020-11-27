import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import './formatForm.css';
import TextField from '@material-ui/core/TextField';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import MultilineTextFields from './integerForm';
import StringFields from './stringForm';
import ArrayFields from './arrayForm';
import TreeFields from './treeForm';
import GraphFields from './graphForm';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


    
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));
const Accordion = withStyles({
    root: {
      border: '1px solid rgba(0, 0, 0, .125)',
      boxShadow: 'none',
      '&:not(:last-child)': {
        borderBottom: 0,
      },
      '&:before': {
        display: 'none',
      },
      '&$expanded': {
        margin: 'auto',
      },
    },
    expanded: {},
  })(MuiAccordion);
  
  const AccordionSummary = withStyles({
    root: {
      backgroundColor: 'rgba(0, 0, 0, .03)',
      borderBottom: '1px solid rgba(0, 0, 0, .125)',
      marginBottom: -1,
      minHeight: 56,
      '&$expanded': {
        minHeight: 56,
      },
    },
    content: {
      '&$expanded': {
        margin: '12px 0',
      },
    },
    expanded: {},
  })(MuiAccordionSummary);
  
  const AccordionDetails = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiAccordionDetails);
  

export default function FormatFormFields() {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <React.Fragment>
      <CssBaseline />
      <h1 style={{textAlign:"center"}}>Add Variable</h1>
      <Container>
         {/* <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '60vh' }} /> */}
        <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary  aria-controls="panel1d-content" id="panel1d-header">
          <Typography className="align">Integer</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <MultilineTextFields />
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary  aria-controls="panel1d-content" id="panel1d-header">
          <Typography className="align">String</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <StringFields />
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary  aria-controls="panel1d-content" id="panel1d-header">
          <Typography className="align">Array</Typography>
        </AccordionSummary>
        <AccordionDetails>
         <ArrayFields />
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography className="align">Tree</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TreeFields />
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography className="align">Graph</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <GraphFields />
        </AccordionDetails>
      </Accordion>
      </Container>
    </React.Fragment>
  );
}
