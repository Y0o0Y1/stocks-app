import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const SplashContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
}));

const Logo = styled('img')({
  width: '200px',
  height: 'auto',
  marginBottom: '2rem',
});

const DeveloperName = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  bottom: '2rem',
  color: theme.palette.text.secondary,
}));

interface SplashScreenProps {
  developerName: string;
}

const SplashScreen = ({ developerName }: SplashScreenProps) => {
  return (
    <SplashContainer>
      <Logo
        src="/nasdaq-logo.png"
        alt="Nasdaq Logo"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Nasdaq_Logo.svg/1200px-Nasdaq_Logo.svg.png';
        }}
      />
      <DeveloperName variant="body1">
        Developed by {developerName}
      </DeveloperName>
    </SplashContainer>
  );
};

export default SplashScreen; 