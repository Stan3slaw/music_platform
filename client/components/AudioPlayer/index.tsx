import React from 'react';
import { Box, Grid, IconButton, Slider, Typography } from '@mui/material';

import {
  Pause,
  PlayArrow,
  SkipNext as SkipIcon,
  SkipPrevious as PrevIcon,
  VolumeUp as VolumeIcon,
} from '@mui/icons-material';

import styles from './AudioPlayer.module.scss';

const AudioPlayer: React.FC = () => {
  const active = true;
  const duration = 200; // seconds
  const [position, setPosition] = React.useState(32);
  const [paused, setPaused] = React.useState(false);
  function formatDuration(value: number) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 9 ? `0${secondLeft}` : secondLeft}`;
  }
  return (
    <div className={styles.audioPlayer}>
      <IconButton>
        <PrevIcon color='primary' />
      </IconButton>
      <IconButton>
        {active ? <PlayArrow color='primary' fontSize='large' /> : <Pause color='primary' />}
      </IconButton>
      <IconButton>
        <SkipIcon color='primary' />
      </IconButton>

      <Grid container direction='column' style={{ width: 200, margin: '0 20px' }}>
        <Box component='span' sx={{ color: 'white' }}>
          name
        </Box>
        <Box component='span' sx={{ fontSize: 12, color: '#a0a0a0' }}>
          artist
        </Box>
      </Grid>
      <Typography sx={{ color: 'white', marginRight: '15px' }}>
        {formatDuration(position)}
      </Typography>
      <Slider
        aria-label='time-indicator'
        size='small'
        value={position}
        min={0}
        step={1}
        max={duration}
        onChange={(_, value) => setPosition(value as number)}
        sx={{
          color: '#fff',
          height: 4,
          '& .MuiSlider-thumb': {
            width: 8,
            height: 8,
            transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
            '&:before': {
              boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
            },
            '&:hover, &.Mui-focusVisible': {
              boxShadow: `0px 0px 0px 8px ${'rgb(0 0 0 / 16%)'}`,
            },
            '&.Mui-active': {
              width: 20,
              height: 20,
            },
          },
          '& .MuiSlider-rail': {
            opacity: 0.28,
          },
        }}
      />
      <Typography sx={{ color: 'white', marginLeft: '15px', marginRight: '60px' }}>
        -{formatDuration(duration - position)}
      </Typography>
      <VolumeIcon color='primary' />
      <Slider
        aria-label='Volume'
        defaultValue={30}
        sx={{
          marginLeft: '15px',
          width: '200px',
          color: '#fff',
          '& .MuiSlider-track': {
            border: 'none',
          },
          '& .MuiSlider-thumb': {
            width: 18,
            height: 18,
            backgroundColor: '#fff',
            '&:before': {
              boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
            },
            '&:hover, &.Mui-focusVisible, &.Mui-active': {
              boxShadow: 'none',
            },
          },
        }}
      />

      {/* <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime} />
      <VolumeUp style={{ marginLeft: 'auto' }} />
      <TrackProgress left={volume} right={100} onChange={changeVolume} /> */}
    </div>
  );
};

export default AudioPlayer;
