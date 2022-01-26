import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

import MainLayout from '../../../layouts/MainLayout';

import { Button, Divider, Paper, TextField, Typography } from '@mui/material';
import { useInput } from '../../../hooks/useInput';
import { Comment } from '../../../components/Comment';
import { IComment } from '../../../types/track';

const CommentPage = ({ serverTrack }: any) => {
  const router = useRouter();
  const [track, setTrack] = React.useState(serverTrack);

  const username = useInput('');
  const text = useInput('');

  const addComment = async () => {
    try {
      const { data } = await axios.post('http://localhost:5000/tracks/comment', {
        username: username.value,
        text: text.value,
        trackId: track._id,
      });
      setTrack({ ...track, comments: [...track.comments, data] });
    } catch (err) {
      console.log(err);
    }
  };
  const onRemoveComment = (id: number) => {
    setTrack((prev: any) => {
      const comments = prev.comments.filter((obj: any) => obj._id !== id);
      return { ...track, comments: comments };
    });
  };

  return (
    <MainLayout hideSidebar>
      <Button
        onClick={() => router.push('/tracks')}
        variant='contained'
        sx={{ marginBottom: '30px' }}>
        Back
      </Button>
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '30px',
          marginBottom: '50px',
        }}>
        <TextField
          {...username}
          multiline
          sx={{ marginBottom: '20px', width: '100%' }}
          label='Your name'
        />
        <TextField
          {...text}
          multiline
          rows={3}
          sx={{ marginBottom: '20px', width: '100%' }}
          label='Comment'
        />
        <div>
          <Button
            onClick={addComment}
            variant='contained'
            sx={{ '&:hover': { backgroundColor: '#ffd796' } }}>
            Comment
          </Button>
        </div>
      </Paper>

      <Paper elevation={0} sx={{ padding: '30px', marginBottom: '100px' }}>
        <div className='container'>
          <Typography variant='h6' sx={{ marginBottom: '35px' }}>
            {track.comments.length === 0
              ? 'No comments here'
              : `Comments: ${track.comments.length}`}
          </Typography>

          <Divider sx={{ marginBottom: '15px' }} />
          {track?.comments.map((item: IComment, index: number) => (
            <Comment
              key={`${item._id}+${index}`}
              id={item._id}
              text={item.text}
              username={item.username}
              onRemove={onRemoveComment}
            />
          ))}
        </div>
      </Paper>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { data } = await axios.get('http://localhost:5000/tracks/' + params?.id);
  return { props: { serverTrack: data } };
};

export default CommentPage;
