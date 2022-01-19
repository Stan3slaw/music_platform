import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import AddComment from '../../../components/AddComment';
import { TrackComments } from '../../../components/TrackComments';
import MainLayout from '../../../layouts/MainLayout';

const CommentPage = () => {
  const router = useRouter();
  return (
    <MainLayout hideSidebar>
      <Button onClick={() => router.back()} variant='contained' sx={{ marginBottom: '30px' }}>
        Back
      </Button>
      <AddComment />
      <TrackComments />
    </MainLayout>
  );
};

export default CommentPage;
