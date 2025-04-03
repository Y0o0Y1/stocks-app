import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ExploreScreen from './ExploreScreen';
import useStocks from '../hooks/useStocks';

// Mock the useStocks hook
jest.mock('../hooks/useStocks');

describe('ExploreScreen', () => {
  const mockStocks = [
    { ticker: 'AAPL', name: 'Apple Inc.' },
    { ticker: 'MSFT', name: 'Microsoft Corporation' },
  ];

  beforeEach(() => {
    (useStocks as jest.Mock).mockReturnValue({
      stocks: mockStocks,
      loading: false,
      error: null,
      hasMore: true,
      fetchMore: jest.fn(),
      searchStocks: jest.fn(),
    });
  });

  it('renders the stock list', () => {
    render(<ExploreScreen />);
    
    expect(screen.getByText('Nasdaq Stocks')).toBeInTheDocument();
    expect(screen.getByText('AAPL')).toBeInTheDocument();
    expect(screen.getByText('Apple Inc.')).toBeInTheDocument();
    expect(screen.getByText('MSFT')).toBeInTheDocument();
    expect(screen.getByText('Microsoft Corporation')).toBeInTheDocument();
  });

  it('shows loading indicator when loading', () => {
    (useStocks as jest.Mock).mockReturnValue({
      stocks: [],
      loading: true,
      error: null,
      hasMore: true,
      fetchMore: jest.fn(),
      searchStocks: jest.fn(),
    });

    render(<ExploreScreen />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('shows error message when there is an error', () => {
    const errorMessage = 'Failed to fetch stocks';
    (useStocks as jest.Mock).mockReturnValue({
      stocks: [],
      loading: false,
      error: errorMessage,
      hasMore: true,
      fetchMore: jest.fn(),
      searchStocks: jest.fn(),
    });

    render(<ExploreScreen />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('triggers search when typing in the search box', async () => {
    const searchStocks = jest.fn();
    (useStocks as jest.Mock).mockReturnValue({
      stocks: [],
      loading: false,
      error: null,
      hasMore: true,
      fetchMore: jest.fn(),
      searchStocks,
    });

    render(<ExploreScreen />);
    const searchInput = screen.getByLabelText('Search stocks');
    
    fireEvent.change(searchInput, { target: { value: 'AAPL' } });
    
    await waitFor(() => {
      expect(searchStocks).toHaveBeenCalledWith('AAPL');
    });
  });
}); 