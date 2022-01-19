import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: { primary: { main: '#ffd796' } },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'inherit',
          fontSize: 16,
          transition: 'none',
          color: 'black',
          '&:active': {
            boxShadow:
              '0 1px 1px rgb(0 0 0 / 15%), 0 4px 7px rgb(0 0 0 / 0%), 0 -1px 0 rgb(0 0 0 / 5%), -1px 0 0 rgb(0 0 0 / 5%), 1px 0 0 rgb(0 0 0 / 5%) !important',
            transform: 'translateY(1px)',
          },
        },
      },
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            backgroundColor: 'white',

            boxShadow:
              '0 1px 1px rgb(0 0 0 / 15%), 0 4px 7px rgb(0 0 0 / 5%), 0 -1px 0 rgb(0 0 0 / 5%), -1px 0 0 rgb(0 0 0 / 5%), 1px 0 0 rgb(0 0 0 / 5%)',
            '&:hover': {
              backgroundColor: 'white',
              boxShadow:
                '0 1px 1px rgb(0 0 0 / 18%), 0 4px 7px rgb(0 0 0 / 8%), 0 -1px 0 rgb(0 0 0 / 8%), -1px 0 0 rgb(0 0 0 / 8%), 1px 0 0 rgb(0 0 0 / 15%)',
            },
          },
        },
      ],
    },
  },
});
export default theme;
