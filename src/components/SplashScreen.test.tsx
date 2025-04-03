import { render, screen, fireEvent } from '@testing-library/react';
import SplashScreen from './SplashScreen';

describe('SplashScreen', () => {
  it('renders the Nasdaq logo and developer name', () => {
    const developerName = 'John Doe';
    render(<SplashScreen developerName={developerName} />);

    const logo = screen.getByAltText('Nasdaq Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/nasdaq-logo.png');

    const developerText = screen.getByText(`Developed by ${developerName}`);
    expect(developerText).toBeInTheDocument();
  });

  it('handles logo loading error', () => {
    const developerName = 'John Doe';
    render(<SplashScreen developerName={developerName} />);

    const logo = screen.getByAltText('Nasdaq Logo');
    fireEvent.error(logo);

    expect(logo).toHaveAttribute(
      'src',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Nasdaq_Logo.svg/1200px-Nasdaq_Logo.svg.png'
    );
  });
}); 