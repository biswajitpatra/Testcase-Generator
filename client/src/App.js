import './App.css';
import React from 'react';
import SearchAppBar from './components/header/appBar'
import FormatFormFields from './components/Input-form/formatForm'
import Grid from '@material-ui/core/Grid';
import MiddleFormFields from './components/Middle-form/testForm'
import OutputFormFields from  './components/Side-form/outputForm'

function App() {


  return (
    <div >
      <SearchAppBar 
      />
       <Grid container>
        <Grid item lg={3} xs={12}>
          <FormatFormFields />
        </Grid>
        <Grid item lg={5} xs={12}>
          <MiddleFormFields />
        </Grid>
        <Grid item lg={4} xs={12}>
          <OutputFormFields/>
        </Grid>
        </Grid>
    </div>
  );
}

export default App;
