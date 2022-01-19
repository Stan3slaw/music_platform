import { Divider, Paper, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';
import { Comment } from '../Comment';

export const TrackComments: React.FC = () => {
  // const { comments, setComments } = useComments(postId);

  // const onAddComment = (obj: CommentType) => {
  //   setComments((prev) => [...prev, obj]);
  // };

  // const onRemoveComment = (id: number) => {
  //   setComments((prev) => prev.filter((obj) => obj.id !== id));
  // };

  return (
    <Paper elevation={0} sx={{ padding: '30px' }}>
      <div className='container'>
        <Typography variant='h6' sx={{ marginBottom: '35px' }}>
          42 комментария
        </Typography>

        <Divider sx={{ marginBottom: '15px' }} />
        <Comment id='id' text='text' username='user' />
        <Comment id='id' text='text' username='user' />
      </div>
    </Paper>
  );
};
