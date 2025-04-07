import { render, screen } from '@testing-library/react';
import NasdaqSpinner from '../NasdaqSpinner';

jest.mock('../../assets/nasdaq-n-logo.png', () => 'mock-spinner-image');

describe('NasdaqSpinner', () => {
  it('renders with default size', () => {
    render(<NasdaqSpinner />);
    
    const spinnerImage = screen.getByAltText('Loading');
    expect(spinnerImage).toBeInTheDocument();
    expect(spinnerImage).toHaveAttribute('src', 'mock-spinner-image');
  });

  it('renders with custom size', () => {
    render(<NasdaqSpinner size={80} />);
    
    const spinnerImage = screen.getByAltText('Loading');
    expect(spinnerImage).toBeInTheDocument();
  });
});