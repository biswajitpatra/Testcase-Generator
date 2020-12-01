import React from 'react';
import {Typography,Container, Box,AccordionSummary, AccordionDetails,CssBaseline, Accordion} from '@material-ui/core';
import Var from './var';
import params from '../../param.json';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function FormatFormFields(){
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <React.Fragment>
      <Box m={3}>
        <Typography variant="h4" display="block" align="center" ><b>Add Variable</b></Typography>
      </Box>
      <Container>
          {
            Object.keys(params).map((ele,i)=>(
              <Accordion expanded={expanded === ele} key={i} onChange={handleChange(ele)}>
              <AccordionSummary 
                    aria-controls="panel1d-content" 
                    id="panel1d-header"
                    expandIcon={<ExpandMoreIcon />}>
                <Box px={3} fontSize="h6.fontSize">{ele}</Box>
              </AccordionSummary>
              <AccordionDetails>      
                <Box width="100%"><Var type={ele}/></Box>
              </AccordionDetails>
            </Accordion>
            ))
          }
    </Container>  
    </React.Fragment>
  );
}
