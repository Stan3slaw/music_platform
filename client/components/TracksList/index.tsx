import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { ITrack } from '../../types/track';
import TrackItem from '../TrackItem';

interface TracksListProps {
  tracks: ITrack[];
}

const TracksList: React.FC<TracksListProps> = ({ tracks }) => {
  return (
    <Grid container direction='column'>
      <Box p={2}>
        {tracks &&
          tracks?.map((track: ITrack, index: number) => (
            <TrackItem track={track} key={`${track.artist}_${index}`} />
          ))}
      </Box>
    </Grid>
  );
};

export default TracksList;
