import { Button, Grid, Paper, Step, StepLabel, Stepper } from '@mui/material';
import React from 'react';

interface StepWrapperProps {
  activeStep: number;
}

const steps = ['Info about track', 'Upload the image', 'Upload the audio'];

const StepWrapper: React.FC<StepWrapperProps> = ({ activeStep, children }) => {
  return (
    <>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={`${step}_${index}`} completed={activeStep > index}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid container justifyContent='center' sx={{ margin: '70px 0', height: '270px' }}>
        <Paper
          sx={{ width: '1000px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {children}
        </Paper>
      </Grid>
    </>
  );
};

export default StepWrapper;
