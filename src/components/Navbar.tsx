import { AppBar, Toolbar, Box, TextField, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import nasdaqLogo from '../assets/nasdaq-logo.png';

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#fff',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
});

const LogoContainer = styled(Box)(({ theme }) => ({
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  marginRight: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    height: '30px',
    marginRight: theme.spacing(1),
  },
}));

const Logo = styled('img')({
  height: '100%',
  objectFit: 'contain',
});

const SearchBox = styled(TextField)(({ theme }) => ({
  width: '100%',
  maxWidth: '400px',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '200px',
  },
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#f5f5f5',
    '&:hover': {
      backgroundColor: '#f0f0f0',
    },
    '& fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: 'transparent',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#0066B2',
    },
  },
}));

interface NavbarProps {
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Navbar = ({ searchTerm, onSearchChange }: NavbarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <StyledAppBar position="sticky">
      <Toolbar sx={{ 
        justifyContent: 'space-between',
        padding: theme.spacing(1, 2),
        [theme.breakpoints.down('sm')]: {
          padding: theme.spacing(1),
        }
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          width: '100%',
          gap: theme.spacing(1)
        }}>
          <LogoContainer>
            <Logo src={nasdaqLogo} alt="Nasdaq Logo" />
          </LogoContainer>
          <SearchBox
            placeholder={isMobile ? "Search..." : "Search by ticker or company name"}
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={onSearchChange}
          />
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar; 