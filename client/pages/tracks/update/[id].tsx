import axios from 'axios';
import { NextPage } from 'next';
import React from 'react';
import TrackForm from '../../../components/TrackForm';
import MainLayout from '../../../layouts/MainLayout';
import { ITrack } from '../../../types/track';

interface UpdateProps {
  data: ITrack;
}

const Update: NextPage<UpdateProps> = ({ data }) => {
  return (
    <MainLayout hideSidebar>
      <TrackForm track={data} />
    </MainLayout>
  );
};

export const getServerSideProps = async (ctx: any) => {
  try {
    const id = ctx.params?.id;
    const { data } = await axios.get(`http://localhost:5000/tracks/${id}`);
    return { props: { data } };
  } catch (err) {
    console.log('Write page', err);
    return { props: {}, redirect: { destination: '/', permanent: false } };
  }
};

export default Update;
