import { render, screen } from '@testing-library/react';
import SplashScreen from '../SplashScreen';

jest.mock('../../assets/nasdaq-logo.png', () => 'mock-image-path');

describe('SplashScreen', () => {
  it('renders without crashing', () => {
    render(<SplashScreen developerName="Test Developer" />);
    
    expect(screen.getByText(/Developed by Test Developer/i)).toBeInTheDocument();
    
    const logoElement = screen.getByAltText('Nasdaq Logo');
    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toHaveAttribute('src', 'mock-image-path');
  });
}); 