import React from 'react';
import { ITrack } from '../../types/track';

import { Divider, Menu, MenuItem } from '@mui/material';
import { Box } from '@mui/system';

import { MoreHorizOutlined as MoreIcon } from '@mui/icons-material';

import styles from './TrackItem.module.scss';
import { useRouter } from 'next/router';

interface TrackItemProps {
  track: ITrack;
  active?: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({ track, active = false }) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const onAddComment = () => {
    router.push('/tracks/comment/' + track._id);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRemove = async () => {
    if (window.confirm('Удалить коментарий?')) {
      try {
      } catch (err) {
        console.warn('Error removing comment', err);
      } finally {
        handleClose();
      }
    }
  };
  return (
    <Box className={styles.wrapper}>
      <Box
        component='img'
        className={styles.trackImage}
        alt='The house from the offer.'
        src='https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2'
      />
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
          <MenuItem onClick={handleClose}>Edit</MenuItem>
          <MenuItem onClick={onAddComment}>Add comment</MenuItem>
          <Divider />
          <MenuItem>Listens: 55</MenuItem>
        </Menu>
      </div>
    </Box>
  );
};

export default TrackItem;
