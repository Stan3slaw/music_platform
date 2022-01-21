import { Paper, Typography } from '@mui/material';
import React from 'react';

import { SearchOutlined as SearchIcon } from '@mui/icons-material';

import styles from './Navbar.module.scss';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { NextThunkDispatch } from '../../redux/store';
import { searchTrack } from '../../redux/actions/track';

const Navbar: React.FC = () => {
  const [query, setQuery] = React.useState('');
  const [timer, setTimer] = React.useState(null as any);

  const dispatch = useDispatch() as NextThunkDispatch;

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(
      setTimeout(async () => {
        await dispatch(await searchTrack(e.target.value));
      }, 500),
    );
  };

  return (
    <Paper classes={{ root: styles.root }}>
      <Link href='/'>
        <a>
          <svg
            className={styles.logo}
            viewBox='0 0 34 34'
            fill='currentColor'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M17 34C26.3888 34 34 26.3888 34 17C34 7.61116 26.3888 0 17 0C7.61116 0 0 7.61116 0 17C0 26.3888 7.61116 34 17 34ZM16.7753 29.5263C23.5698 29.5263 29.0779 23.918 29.0779 16.9999C29.0779 10.0819 23.5698 4.47363 16.7753 4.47363C9.98073 4.47363 4.47266 10.0819 4.47266 16.9999C4.47266 23.918 9.98073 29.5263 16.7753 29.5263Z'></path>
            <path d='M22.3684 17C22.3684 20.212 19.8647 22.8158 16.7763 22.8158C13.6878 22.8158 11.1841 20.212 11.1841 17C11.1841 13.788 13.6878 11.1842 16.7763 11.1842C19.8647 11.1842 22.3684 13.788 22.3684 17Z'></path>
            <path d='M18.3423 14.7631H33.1055V19.2368H18.3423V14.7631Z'></path>
          </svg>
        </a>
      </Link>

      <div className={styles.inputBlock}>
        <SearchIcon />
        <input value={query} onChange={search} placeholder='Search' />
      </div>
    </Paper>
  );
};

export default Navbar;
