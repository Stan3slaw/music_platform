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
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import axios from 'axios';

let audio: any;

const AudioPlayer: React.FC = React.memo(function AudioPlayer() {
  const { pause, active, duration, currentTime, volume } = useTypedSelector(
    (state) => state.player,
  );
  const { tracks } = useTypedSelector((state) => state.track);

  const { pauseTrack, playTrack, setVolume, setDuration, setCurrentTime, setActiveTrack } =
    useActions();

  const indexActiveTrack = tracks.findIndex((el) => el._id === active?._id);

  React.useEffect(() => {
    if (currentTime === duration) {
      axios.post(`http://localhost:5000/tracks/listen/${active?._id}`);
      if (indexActiveTrack !== tracks.length - 1) {
        pauseTrack();
        setActiveTrack(tracks[indexActiveTrack + 1]);
      } else {
        pauseTrack();
      }
    }
  }, [currentTime, duration]);

  React.useEffect(() => {
    if (!audio) {
      audio = new Audio();
    } else {
      setAudio();
      play();
    }
  }, [active]);

  const setAudio = () => {
    if (active) {
      audio.src = 'http://localhost:5000/' + active.audio;
      audio.volume = volume / 100;
      audio.onloadedmetadata = () => {
        setDuration(Math.ceil(audio.duration));
      };
      audio.ontimeupdate = () => {
        setCurrentTime(Math.ceil(audio.currentTime));
      };
    }
  };

  const play = () => {
    if (pause) {
      playTrack();
      audio.play();
    } else {
      pauseTrack();
      audio.pause();
    }
  };

  const nextTrack = () => {
    if (indexActiveTrack !== tracks.length - 1) {
      pauseTrack();
      setActiveTrack(tracks[indexActiveTrack + 1]);
    }
  };

  const prevTrack = () => {
    if (indexActiveTrack !== 0) {
      pauseTrack();
      setActiveTrack(tracks[indexActiveTrack - 1]);
    }
  };

  const changeVolume = (_: any, value: any) => {
    audio.volume = Number(value) / 100;
    setVolume(Number(value as number));
  };

  const changeCurrentTime = (_: any, value: any) => {
    audio.currentTime = Number(value);
    setCurrentTime(Number(value as number));
  };

  function formatDuration(value: number) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft <= 9 ? `0${secondLeft}` : secondLeft}`;
  }

  if (!active) {
    return null;
  }
  return (
    <div className={styles.audioPlayer}>
      <IconButton onClick={prevTrack}>
        <PrevIcon color='primary' />
      </IconButton>
      <IconButton onClick={play}>
        {pause ? (
          <PlayArrow color='primary' fontSize='large' />
        ) : (
          <Pause color='primary' fontSize='large' />
        )}
      </IconButton>
      <IconButton onClick={nextTrack}>
        <SkipIcon color='primary' />
      </IconButton>

      <Grid container direction='column' style={{ width: 400, margin: '0 20px' }}>
        <Box component='span' sx={{ color: 'white' }}>
          {active?.name}
        </Box>
        <Box component='span' sx={{ fontSize: 12, color: '#a0a0a0' }}>
          {active?.artist}
        </Box>
      </Grid>
      <Typography sx={{ color: 'white', marginRight: '15px' }}>
        {formatDuration(currentTime)}
      </Typography>
      <Slider
        aria-label='time-indicator'
        size='small'
        value={currentTime}
        min={0}
        step={1}
        max={duration}
        onChange={changeCurrentTime}
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
        -{formatDuration(duration - currentTime)}
      </Typography>
      <VolumeIcon color='primary' />
      <Slider
        aria-label='Volume'
        defaultValue={0}
        value={volume}
        onChange={changeVolume}
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
    </div>
  );
});

export default AudioPlayer;
