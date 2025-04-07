import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../Navbar';

jest.mock('../../assets/nasdaq-logo.png', () => 'mock-nasdaq-logo');

describe('Navbar', () => {
  const mockOnSearchChange = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the logo and search input', () => {
    render(<Navbar searchTerm="" onSearchChange={mockOnSearchChange} />);
    
    const logoElement = screen.getByAltText('Nasdaq Logo');
    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toHaveAttribute('src', 'mock-nasdaq-logo');
    
    const searchInput = screen.getByPlaceholderText(/search/i);
    expect(searchInput).toBeInTheDocument();
  });

  it('displays the current search term value', () => {
    const searchTerm = 'AAPL';
    render(<Navbar searchTerm={searchTerm} onSearchChange={mockOnSearchChange} />);
    
    const searchInput = screen.getByPlaceholderText(/search/i) as HTMLInputElement;
    expect(searchInput.value).toBe(searchTerm);
  });

  it('calls onSearchChange when search input changes', () => {
    render(<Navbar searchTerm="" onSearchChange={mockOnSearchChange} />);
    
    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: 'AAPL' } });
    
    expect(mockOnSearchChange).toHaveBeenCalledTimes(1);
  });
});