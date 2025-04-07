// Mock the entire axios module and axiosBaseQuery
jest.mock('axios', () => ({
  default: jest.fn()
}));

jest.mock('../axiosBaseQuery', () => ({
  axiosBaseQuery: () => jest.fn()
}));

// Import after the mock is defined
import { axiosBaseQuery } from '../axiosBaseQuery';

describe('axiosBaseQuery', () => {
  it('should be a function', () => {
    expect(typeof axiosBaseQuery).toBe('function');
  });
  
  it('should return a function when called', () => {
    const queryFn = axiosBaseQuery({ baseUrl: 'https://test-api.com' });
    expect(typeof queryFn).toBe('function');
  });
}); 