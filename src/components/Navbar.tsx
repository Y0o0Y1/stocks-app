import { AppBar, Toolbar, Box, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import nasdaqLogo from '../assets/nasdaq-logo.png';

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#fff',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
});

const LogoContainer = styled(Box)({
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  marginRight: '32px',
});

const Logo = styled('img')({
  height: '100%',
  objectFit: 'contain',
});

const SearchBox = styled(TextField)({
  width: '400px',
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
});

interface NavbarProps {
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Navbar = ({ searchTerm, onSearchChange }: NavbarProps) => {
  return (
    <StyledAppBar position="sticky">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LogoContainer>
            <Logo src={nasdaqLogo} alt="Nasdaq Logo" />
          </LogoContainer>
          <SearchBox
            placeholder="Search by ticker or company name"
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