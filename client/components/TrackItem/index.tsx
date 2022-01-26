import React from 'react';
import { ITrack } from '../../types/track';

import { Divider, IconButton, Menu, MenuItem } from '@mui/material';
import { Box } from '@mui/system';

import { Pause, PlayArrow, MoreHorizOutlined as MoreIcon } from '@mui/icons-material';

import styles from './TrackItem.module.scss';
import { useRouter } from 'next/router';
import { useActions } from '../../hooks/useActions';
import { useDispatch } from 'react-redux';
import { deleteTrack } from '../../redux/actions/track';

interface TrackItemProps {
  track: ITrack;
  active?: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({ track, active = false }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { playTrack, pauseTrack, setActiveTrack } = useActions();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const play = () => {
    setActiveTrack(track);
    playTrack();
  };

  const pause = () => {
    pauseTrack();
  };

  const handleClick = (e: any) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const onAddComment = () => {
    router.push('/tracks/comment/' + track._id);
  };

  const onUpdate = () => {
    dispatch(setActiveTrack(null));
    router.push('/tracks/update/' + track._id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRemove = () => {
    if (window.confirm('Delete track?')) {
      try {
        dispatch(deleteTrack(track._id));
        dispatch(setActiveTrack(null));
      } catch (err) {
        console.warn('Error removing track', err);
      } finally {
        handleClose();
      }
    }
  };
  return (
    <Box className={styles.wrapper}>
      <Box sx={{ position: 'relative' }}>
        <IconButton
          onClick={play}
          sx={{
            position: 'absolute',
            left: '2.3px',
            top: '2.3px',
            '&:hover': { color: '#ffd796' },
          }}>
          <PlayArrow color='disabled' fontSize='large' />
        </IconButton>

        <Box
          component='img'
          className={styles.trackImage}
          alt='picture'
          src={'http://localhost:5000/' + track.picture}
        />
      </Box>

      <div className={styles.infoWrapper}>
        <Box className={styles.trackInfo}>
          <Box component='span' sx={{ fontSize: 18 }}>
            {track.name}
          </Box>
          <Box component='span' sx={{ color: '#a0a0a0', fontSize: 14 }}>
            {track.artist}
          </Box>
        </Box>
        <MoreIcon
          onClick={handleClick}
          sx={{ cursor: 'pointer', ':hover': { color: '#ffd796' } }}
        />
        <Menu
          sx={{
            '& .MuiPaper-root': {
              borderRadius: '8px',
              marginTop: '10px',
              minWidth: 180,
              color: 'rgb(55, 65, 81)',
              '& .MuiMenu-list': {
                padding: '4px 0',
              },
            },
          }}
          elevation={2}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          keepMounted>
          <MenuItem onClick={handleRemove}>Delete</MenuItem>
          <MenuItem onClick={onUpdate}>Edit</MenuItem>
          <MenuItem onClick={onAddComment}>Add comment</MenuItem>
          <Divider />
          <MenuItem>{`Listens: ${track.listens}`}</MenuItem>
        </Menu>
      </div>
    </Box>
  );
};

export default TrackItem;
