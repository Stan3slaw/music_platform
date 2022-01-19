import React from 'react';

import { Button, Paper, TextField } from '@mui/material';

const AddComment: React.FC = () => {
  return (
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
        multiline
        sx={{ marginBottom: '20px', width: '100%' }}
        // value={title}
        // defaultValue={title}
        // onChange={(e) => setTitle(e.target.value)}
        label='Your name'
      />
      <TextField
        multiline
        rows={3}
        sx={{ marginBottom: '20px', width: '100%' }}
        // value={title}
        // defaultValue={title}
        // onChange={(e) => setTitle(e.target.value)}
        label='Comment'
      />
      <div>
        <Button variant='contained' sx={{ '&:hover': { backgroundColor: '#ffd796' } }}>
          Comment
        </Button>
      </div>
    </Paper>
  );
};

export default AddComment;
