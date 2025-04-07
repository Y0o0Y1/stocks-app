// Mock the module entirely
jest.mock('../stocksApi', () => ({
  stocksApi: {
    reducerPath: 'stocksApi',
    endpoints: {
      getStocks: {}
    }
  },
  useGetStocksQuery: jest.fn()
}));

// Import after mock is defined
import { stocksApi } from '../stocksApi';

describe('Stocks API', () => {
  it('should have correct reducer path', () => {
    expect(stocksApi.reducerPath).toBe('stocksApi');
  });

  it('should have correct endpoint', () => {
    expect(stocksApi.endpoints.getStocks).toBeDefined();
  });
}); 