import { NextPage } from 'next';
import React from 'react';

import { Button, Grid, Paper } from '@mui/material';

import MainLayout from '../../layouts/MainLayout';

import { Add as AddIcon, PlayArrow as PlayIcon } from '@mui/icons-material';

import {} from '@mui/icons-material';
import { useRouter } from 'next/router';
import { ITrack } from '../../types/track';
import TracksList from '../../components/TracksList';

const Tracks: NextPage = () => {
  const router = useRouter();
  const tracks: ITrack[] = [
    {
      _id: '1',
      name: 'Track 1',
      artist: 'artist',
      text: 'text',
      listens: 5,
      picture:
        'https://uploads-ssl.webflow.com/600a939e6038870874731430/617d1c34209bff43c7438d0a_ZHU%20%D1%81over%20raw.jpg',
      audio:
        'https://www.youtube.com/watch?v=XGllTcTdk8I&ab_channel=%D0%A2%D0%B8%D0%BF%D0%BE%D0%9C%D1%83%D0%B7%D1%8B%D0%BA%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9',
      comments: [],
    },
    {
      _id: '2',
      name: 'Track 2',
      artist: 'artist',
      text: 'text',
      listens: 5,
      picture:
        'https://uploads-ssl.webflow.com/600a939e6038870874731430/616ff7c994727709b2037e38_%D1%81%D0%BA%D1%80%D0%B8%D0%BF%20%D1%81over%20raw.jpg',
      audio:
        'https://www.youtube.com/watch?v=nIZa0wUsQxg&ab_channel=%D0%95%D0%B2%D0%B3%D0%B5%D0%BD%D0%B8%D1%8F%D0%9B%D0%B0%D0%B7%D0%B0%D1%80%D0%B5%D0%B2%D0%B0',
      comments: [],
    },
    {
      _id: '2',
      name: 'Track 2',
      artist: 'artist',
      text: 'text',
      listens: 5,
      picture:
        'https://uploads-ssl.webflow.com/600a939e6038870874731430/616ff7c994727709b2037e38_%D1%81%D0%BA%D1%80%D0%B8%D0%BF%20%D1%81over%20raw.jpg',
      audio:
        'https://www.youtube.com/watch?v=nIZa0wUsQxg&ab_channel=%D0%95%D0%B2%D0%B3%D0%B5%D0%BD%D0%B8%D1%8F%D0%9B%D0%B0%D0%B7%D0%B0%D1%80%D0%B5%D0%B2%D0%B0',
      comments: [],
    },
    {
      _id: '2',
      name: 'Track 2',
      artist: 'artist',
      text: 'text',
      listens: 5,
      picture:
        'https://uploads-ssl.webflow.com/600a939e6038870874731430/616ff7c994727709b2037e38_%D1%81%D0%BA%D1%80%D0%B8%D0%BF%20%D1%81over%20raw.jpg',
      audio:
        'https://www.youtube.com/watch?v=nIZa0wUsQxg&ab_channel=%D0%95%D0%B2%D0%B3%D0%B5%D0%BD%D0%B8%D1%8F%D0%9B%D0%B0%D0%B7%D0%B0%D1%80%D0%B5%D0%B2%D0%B0',
      comments: [],
    },
    {
      _id: '2',
      name: 'Track 2',
      artist: 'artist',
      text: 'text',
      listens: 5,
      picture:
        'https://uploads-ssl.webflow.com/600a939e6038870874731430/616ff7c994727709b2037e38_%D1%81%D0%BA%D1%80%D0%B8%D0%BF%20%D1%81over%20raw.jpg',
      audio:
        'https://www.youtube.com/watch?v=nIZa0wUsQxg&ab_channel=%D0%95%D0%B2%D0%B3%D0%B5%D0%BD%D0%B8%D1%8F%D0%9B%D0%B0%D0%B7%D0%B0%D1%80%D0%B5%D0%B2%D0%B0',
      comments: [],
    },
    {
      _id: '2',
      name: 'Track 2',
      artist: 'artist',
      text: 'text',
      listens: 5,
      picture:
        'https://uploads-ssl.webflow.com/600a939e6038870874731430/616ff7c994727709b2037e38_%D1%81%D0%BA%D1%80%D0%B8%D0%BF%20%D1%81over%20raw.jpg',
      audio:
        'https://www.youtube.com/watch?v=nIZa0wUsQxg&ab_channel=%D0%95%D0%B2%D0%B3%D0%B5%D0%BD%D0%B8%D1%8F%D0%9B%D0%B0%D0%B7%D0%B0%D1%80%D0%B5%D0%B2%D0%B0',
      comments: [],
    },
    {
      _id: '2',
      name: 'Track 2',
      artist: 'artist',
      text: 'text',
      listens: 5,
      picture:
        'https://uploads-ssl.webflow.com/600a939e6038870874731430/616ff7c994727709b2037e38_%D1%81%D0%BA%D1%80%D0%B8%D0%BF%20%D1%81over%20raw.jpg',
      audio:
        'https://www.youtube.com/watch?v=nIZa0wUsQxg&ab_channel=%D0%95%D0%B2%D0%B3%D0%B5%D0%BD%D0%B8%D1%8F%D0%9B%D0%B0%D0%B7%D0%B0%D1%80%D0%B5%D0%B2%D0%B0',
      comments: [],
    },
  ];
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
            <Button variant='contained'>
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
