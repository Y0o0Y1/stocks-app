import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import ExploreScreen from '../ExploreScreen';

jest.mock('../../app/api/services/stocksApi', () => ({
  stocksApi: {
    endpoints: {
      getStocks: {}
    }
  },
  useGetStocksQuery: jest.fn()
}));

import { useGetStocksQuery } from '../../app/api/services/stocksApi';

const mockStore = configureStore([]);

describe('ExploreScreen', () => {
  const renderWithProviders = (ui: React.ReactElement, { store = mockStore({}) } = {}) => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          {ui}
        </BrowserRouter>
      </Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays loading state correctly', () => {
    (useGetStocksQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
      isFetching: true
    });

    renderWithProviders(<ExploreScreen />);
    
    expect(useGetStocksQuery).toHaveBeenCalled();
  });

  it('displays stock data when loaded', () => {
    const mockStocks = {
      results: [
        { ticker: 'AAPL', name: 'Apple Inc.', last_updated_utc: '2023-01-01' },
        { ticker: 'MSFT', name: 'Microsoft Corporation', last_updated_utc: '2023-01-01' }
      ],
      status: 'OK',
      request_id: 'test-id',
      count: 2
    };

    (useGetStocksQuery as jest.Mock).mockReturnValue({
      data: mockStocks,
      error: undefined,
      isLoading: false,
      isFetching: false
    });

    renderWithProviders(<ExploreScreen />);
    
    expect(screen.getByText('AAPL')).toBeInTheDocument();
    expect(screen.getByText('Apple Inc.')).toBeInTheDocument();
    expect(screen.getByText('MSFT')).toBeInTheDocument();
    expect(screen.getByText('Microsoft Corporation')).toBeInTheDocument();
  });

  it('displays error message when API fails', () => {
    const mockError = { status: 500, data: 'Server Error' };

    (useGetStocksQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: mockError,
      isLoading: false,
      isFetching: false
    });

    renderWithProviders(<ExploreScreen />);
    
    expect(screen.getByText(/an error occurred/i)).toBeInTheDocument();
  });

  it('displays rate limited message when API returns 429', () => {
    const mockError = { status: 429, data: { retry_after: 60 } };

    (useGetStocksQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: mockError,
      isLoading: false,
      isFetching: false
    });

    renderWithProviders(<ExploreScreen />);
    
    expect(screen.getByText(/API rate limit reached/i)).toBeInTheDocument();
  });

  it('shows empty state when no results', () => {
    const mockEmptyResults = {
      results: [],
      status: 'OK',
      request_id: 'test-id',
      count: 0
    };

    (useGetStocksQuery as jest.Mock).mockReturnValue({
      data: mockEmptyResults,
      error: undefined,
      isLoading: false,
      isFetching: false
    });

    renderWithProviders(<ExploreScreen />);
    
    expect(screen.getByText(/no stocks found/i)).toBeInTheDocument();
  });
});