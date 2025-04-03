import { Box, keyframes } from '@mui/material';
import { styled } from '@mui/material/styles';
import nasdaqNLogo from '../assets/nasdaq-n-logo.png';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled(Box)({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const SpinnerImage = styled('img')({
  width: '40px',
  height: '40px',
  animation: `${spin} 1.5s linear infinite`,
});

interface NasdaqSpinnerProps {
  size?: number;
}

const NasdaqSpinner = ({ size = 40 }: NasdaqSpinnerProps) => {
  return (
    <SpinnerContainer>
      <SpinnerImage
        src={nasdaqNLogo}
        alt="Loading"
        sx={{ width: size, height: size }}
      />
    </SpinnerContainer>
  );
};

export default NasdaqSpinner; 