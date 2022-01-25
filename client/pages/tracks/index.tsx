import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

import { Button, Grid, Paper } from '@mui/material';
import { Box } from '@mui/system';
import { Add as AddIcon, PlayArrow as PlayIcon } from '@mui/icons-material';

import MainLayout from '../../layouts/MainLayout';
import TracksList from '../../components/TracksList';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';

const Tracks: NextPage = () => {
  const router = useRouter();
  const { tracks, error } = useTypedSelector((state) => state.track);
  const { playTrack, setActiveTrack } = useActions();

  const play = () => {
    setActiveTrack(tracks[0]);
    playTrack();
  };
  if (error) {
    return (
      <MainLayout>
        <Box component='span'>{error}</Box>
      </MainLayout>
    );
  }
  return (
    <MainLayout>
      <Grid container>
        <Paper
          elevation={0}
          sx={{
            borderRadius: '0 !important',
            padding: '30px',
            width: '100%',
            height: 'calc(100vh - 80px)',
          }}>
          <Grid container justifyContent='space-between' sx={{ marginBottom: '20px' }}>
            <Button onClick={play} variant='contained'>
              <PlayIcon sx={{ marginRight: '3px' }} />
              Play
            </Button>

            <Button variant='contained' onClick={() => router.push('/tracks/create')}>
              <AddIcon sx={{ marginRight: '3px' }} />
              Add track
            </Button>
          </Grid>
          <TracksList tracks={tracks} />
        </Paper>
      </Grid>
    </MainLayout>
  );
};

export default Tracks;
