import { Box, Button } from '@mui/material';
import type { NextPage } from 'next';
import MainLayout from '../layouts/MainLayout';
import { MusicNoteOutlined as MusicIcon } from '@mui/icons-material';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <MainLayout>
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '8px',
          height: '100%',
          minHeight: 'calc(100vh - 80px)',
        }}>
        <img
          src='/static/main-page-bg.jpg'
          style={{ position: 'absolute', height: '100%', objectFit: 'cover' }}
        />
        <Button
          variant='contained'
          sx={{ position: 'absolute', bottom: '30px', left: '45%' }}
          onClick={() => router.push('/tracks')}>
          <MusicIcon />
          Take a trip
        </Button>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            m: '30px',
          }}></Box>
      </Box>
    </MainLayout>
  );
};

export default Home;
