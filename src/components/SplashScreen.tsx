import { Box, Typography } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

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
  animation: `${fadeIn} 2s ease-out forwards`,
});

const DeveloperName = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  bottom: '2rem',
  color: theme.palette.text.secondary,
  animation: `${fadeInUp} 800ms ease-out 1.5s forwards`,
  opacity: 0,
}));

interface SplashScreenProps {
  developerName: string;
}

const SplashScreen = ({ developerName }: SplashScreenProps) => {
  return (
    <SplashContainer>
      <Logo
        src="/src/assets/nasdaq-logo.png"
        alt="Nasdaq Logo"
      />
      <DeveloperName variant="body1">
        Developed by {developerName}
      </DeveloperName>
    </SplashContainer>
  );
};

export default SplashScreen; 