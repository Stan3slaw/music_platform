import React from 'react';
import { Grid, Button, TextField } from '@mui/material';

import StepWrapper from '../../components/StepWrapper';
import FileUpload from '../../components/FileUpload';
import { useRouter } from 'next/router';
import { useInput } from '../../hooks/useInput';
import axios from 'axios';
import { ITrack } from '../../types/track';

interface TrackFormProps {
  track?: ITrack;
}

const TrackForm: React.FC<TrackFormProps> = ({ track }) => {
  const router = useRouter();

  const [activeStep, setActiveStep] = React.useState(0);
  const [picture, setPicture] = React.useState(track ? track.picture : null);
  const [audio, setAudio] = React.useState(track ? track.audio : null);

  const name = useInput(track ? track.name : '');
  const artist = useInput(track ? track.artist : '');
  const text = useInput(track ? track.text : '');

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
      if (!track) {
        axios
          .post(`http://localhost:5000/tracks`, formData)
          .then((resp) => router.push('/tracks'))
          .catch((err) => console.log(err));
      } else {
        axios
          .patch(`http://localhost:5000/tracks/${track._id}`, formData)
          .then((resp) => router.push('/tracks'))
          .catch((err) => console.log(err));
      }
    }
  };

  const back = () => {
    setActiveStep((prev) => prev - 1);
  };
  return (
    <>
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
            <Button variant='contained'>{track ? 'Update image' : 'Upload image'}</Button>
          </FileUpload>
        )}
        {activeStep === 2 && (
          <FileUpload setFile={setAudio} accept='audio/*'>
            <Button variant='contained'>{track ? 'Update audio' : 'Upload audio'}</Button>
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
    </>
  );
};

export default TrackForm;
