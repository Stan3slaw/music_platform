import { NextPage } from 'next';
import React from 'react';

import MainLayout from '../../layouts/MainLayout';
import TrackForm from '../../components/TrackForm';

const Create: NextPage = () => {
  return (
    <MainLayout hideSidebar>
      <TrackForm />
    </MainLayout>
  );
};

export default Create;
