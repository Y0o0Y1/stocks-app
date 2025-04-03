import { renderHook, act } from '@testing-library/react';
import useStocks from './useStocks';
import stockService from '../services/stockService';

// Mock the stockService
jest.mock('../services/stockService');

describe('useStocks', () => {
  const mockStocks = [
    { ticker: 'AAPL', name: 'Apple Inc.' },
    { ticker: 'MSFT', name: 'Microsoft Corporation' },
  ];

  const mockResponse = {
    results: mockStocks,
    status: 'OK',
    request_id: 'test-request-id',
    count: 2,
    next_url: 'https://api.polygon.io/v3/reference/tickers?cursor=test-cursor',
  };

  beforeEach(() => {
    (stockService.getStocks as jest.Mock).mockResolvedValue(mockResponse);
  });

  it('fetches stocks on mount', async () => {
    const { result } = renderHook(() => useStocks());

    expect(result.current.loading).toBe(true);
    expect(result.current.stocks).toEqual([]);

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.stocks).toEqual(mockStocks);
    expect(result.current.hasMore).toBe(true);
  });

  it('handles search functionality', async () => {
    const { result } = renderHook(() => useStocks());

    await act(async () => {
      result.current.searchStocks('AAPL');
    });

    expect(stockService.getStocks).toHaveBeenCalledWith({
      search: 'AAPL',
      limit: 20,
      cursor: undefined,
    });
  });

  it('handles errors', async () => {
    const errorMessage = 'Failed to fetch stocks';
    (stockService.getStocks as jest.Mock).mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useStocks());

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.loading).toBe(false);
  });

  it('implements caching', async () => {
    const { result } = renderHook(() => useStocks());

    // First fetch
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    // Second fetch with same parameters
    await act(async () => {
      result.current.fetchMore();
    });

    // Should only call the API once due to caching
    expect(stockService.getStocks).toHaveBeenCalledTimes(1);
  });
}); 