import { Menu, MenuItem, Typography } from '@mui/material';
import React from 'react';

import { MoreHorizOutlined as MoreIcon } from '@mui/icons-material';

import styles from './Comment.module.scss';
import axios from 'axios';

interface CommentProps {
  id: string;
  text: string;
  username: string;
  onRemove: (id: number) => void;
}

export const Comment: React.FC<CommentProps> = ({ id, text, username, onRemove }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRemove = async () => {
    if (window.confirm('Delete comment?')) {
      try {
        const { data } = await axios.delete(`http://localhost:5000/tracks/comment/${id}`);
        onRemove(data._id);
      } catch (err) {
        console.warn('Error removing comment', err);
      } finally {
        handleClose();
      }
    }
  };
  return (
    <div className={styles.comment}>
      <div>
        <div className={styles.userInfo}>
          <b>{username}</b>
        </div>
        <Typography className={styles.text}>{text}</Typography>
      </div>
      <div>
        <MoreIcon
          onClick={handleClick}
          sx={{ cursor: 'pointer', ':hover': { color: '#ffd796' } }}
        />
      </div>
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
      </Menu>
    </div>
  );
};
