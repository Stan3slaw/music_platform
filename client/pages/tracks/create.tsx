import { NextPage } from 'next';
import React from 'react';
import { Grid, Button, TextField } from '@mui/material';

import StepWrapper from '../../components/StepWrapper';
import MainLayout from '../../layouts/MainLayout';
import FileUpload from '../../components/FileUpload';
import { useRouter } from 'next/router';
import { useInput } from '../../hooks/useInput';
import axios from 'axios';

const Create: NextPage = () => {
  const router = useRouter();

  const [activeStep, setActiveStep] = React.useState(0);
  const [picture, setPicture] = React.useState(null);
  const [audio, setAudio] = React.useState(null);

  const name = useInput('');
  const artist = useInput('');
  const text = useInput('');

  const next = () => {
    if (activeStep !== 2) {
      setActiveStep((prev) => prev + 1);
    } else {
      const formData = new FormData();
      formData.append('name', name.value);
      formData.append('artist', artist.value);
      formData.append('text', text.value);
      formData.append('picture', picture);
      formData.append('audio', audio);
      axios
        .post('http://localhost:5000/tracks', formData)
        .then((resp) => router.push('/tracks'))
        .catch((err) => console.log(err));
    }
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
            <TextField {...name} label='Track name' sx={{ marginBottom: '20px' }} />
            <TextField {...artist} label='Artist name' sx={{ marginBottom: '20px' }} />
            <TextField
              {...text}
              label='Key words'
              multiline
              rows={3}
              sx={{ marginBottom: '20px' }}
            />
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
          {activeStep === 2 ? 'Finish' : 'Next'}
        </Button>
      </Grid>
    </MainLayout>
  );
};

export default Create;
