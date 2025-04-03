import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
      '@media (max-width:400px)': {
        fontSize: '1.75rem',
      },
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      '@media (max-width:600px)': {
        fontSize: '1.75rem',
      },
      '@media (max-width:400px)': {
        fontSize: '1.5rem',
      },
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      '@media (max-width:600px)': {
        fontSize: '1.5rem',
      },
      '@media (max-width:400px)': {
        fontSize: '1.25rem',
      },
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      '@media (max-width:600px)': {
        fontSize: '1.25rem',
      },
      '@media (max-width:400px)': {
        fontSize: '1.1rem',
      },
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      '@media (max-width:600px)': {
        fontSize: '1.1rem',
      },
      '@media (max-width:400px)': {
        fontSize: '1rem',
      },
    },
    h6: {
      fontSize: '1.1rem',
      fontWeight: 600,
      '@media (max-width:600px)': {
        fontSize: '1rem',
      },
      '@media (max-width:400px)': {
        fontSize: '0.9rem',
      },
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      '@media (max-width:600px)': {
        fontSize: '0.9rem',
      },
      '@media (max-width:400px)': {
        fontSize: '0.85rem',
      },
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      '@media (max-width:600px)': {
        fontSize: '0.8rem',
      },
      '@media (max-width:400px)': {
        fontSize: '0.75rem',
      },
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      '@media (max-width:600px)': {
        fontSize: '0.9rem',
      },
      '@media (max-width:400px)': {
        fontSize: '0.85rem',
      },
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      '@media (max-width:600px)': {
        fontSize: '0.8rem',
      },
      '@media (max-width:400px)': {
        fontSize: '0.75rem',
      },
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      textTransform: 'none',
      '@media (max-width:600px)': {
        fontSize: '0.8rem',
      },
      '@media (max-width:400px)': {
        fontSize: '0.75rem',
      },
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          wordBreak: 'break-word',
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default responsiveFontSizes(theme); 