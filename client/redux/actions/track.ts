import axios from 'axios';
import { Dispatch } from 'react';
import { TrackAction, TrackActionTypes } from '../../types/track';

export const fetchTracks = () => async (dispatch: Dispatch<TrackAction>) => {
  try {
    const response = await axios.get('http://localhost:5000/tracks');
    dispatch({ type: TrackActionTypes.FETCH_TRACKS, payload: response.data });
  } catch (err: any) {
    dispatch({ type: TrackActionTypes.FETCH_TRACKS_ERROR, payload: err.message });
  }
};

export const searchTrack = (query: string) => async (dispatch: Dispatch<TrackAction>) => {
  try {
    const response = await axios.get('http://localhost:5000/tracks/search?query=' + query);
    dispatch({ type: TrackActionTypes.FETCH_TRACKS, payload: response.data });
  } catch (err: any) {
    dispatch({ type: TrackActionTypes.FETCH_TRACKS_ERROR, payload: err.message });
  }
};

export const deleteTrack = (id: string) => async (dispatch: Dispatch<TrackAction>) => {
  try {
    await axios.delete(`http://localhost:5000/tracks/${id}`);
    const response = await axios.get('http://localhost:5000/tracks');
    dispatch({ type: TrackActionTypes.DELETE_TRACK, payload: response.data });
  } catch (err: any) {
    dispatch({ type: TrackActionTypes.DELETE_TRACK_ERORR, payload: err.message });
  }
};
