import { NextPage } from 'next';
import React from 'react';
import { Grid, Button, TextField } from '@mui/material';

import StepWrapper from '../../components/StepWrapper';
import MainLayout from '../../layouts/MainLayout';
import FileUpload from '../../components/FileUpload';
import { useRouter } from 'next/router';

const Create: NextPage = () => {
  const router = useRouter();

  const [activeStep, setActiveStep] = React.useState(0);
  const [picture, setPicture] = React.useState(null);
  const [audio, setAudio] = React.useState(null);

  const next = () => {
    if (activeStep !== 2) setActiveStep((prev) => prev + 1);
  };

  const back = () => {
    setActiveStep((prev) => prev - 1);
  };
  return (
    <MainLayout hideSidebar>
      <Button onClick={() => router.back()} variant='contained' sx={{ marginBottom: '30px' }}>
        Back
      </Button>
      <StepWrapper activeStep={activeStep}>
        {activeStep === 0 && (
          <Grid container direction='column' style={{ padding: '30px' }}>
            <TextField label='Track name' sx={{ marginBottom: '20px' }} />
            <TextField label='Artist name' sx={{ marginBottom: '20px' }} />
            <TextField label='Key words' multiline rows={3} sx={{ marginBottom: '20px' }} />
          </Grid>
        )}
        {activeStep === 1 && (
          <FileUpload setFile={setPicture} accept='image/*'>
            <Button variant='contained'>Upload image</Button>
          </FileUpload>
        )}
        {activeStep === 2 && (
          <FileUpload setFile={setAudio} accept='audio/*'>
            <Button variant='contained'>Upload audio</Button>
          </FileUpload>
        )}
      </StepWrapper>
      <Grid container justifyContent='space-between'>
        <Button disabled={activeStep === 0} variant='contained' onClick={back}>
          Prev
        </Button>
        <Button variant='contained' onClick={next}>
          Next
        </Button>
      </Grid>
    </MainLayout>
  );
};

export default Create;
