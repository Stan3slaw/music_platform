import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Button } from '@mui/material';

import {
  HomeOutlined as HomeIcon,
  WhatshotOutlined as FireIcon,
  FormatListBulletedOutlined as ListIcon,
} from '@mui/icons-material';

import styles from './Sidebar.module.scss';

const menu = [
  { text: 'Home', icon: <HomeIcon />, path: '/' },
  { text: 'Tracks', icon: <FireIcon />, path: '/tracks' },
];

const Sidebar: React.FC = () => {
  const router = useRouter();

  return (
    <div className={styles.sidebar}>
      <ul>
        {menu.map((obj) => (
          <li key={obj.path}>
            <Link href={obj.path}>
              <a>
                <Button variant={router.asPath === obj.path ? 'contained' : 'text'}>
                  {obj.icon}
                  {obj.text}
                </Button>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Sidebar;
