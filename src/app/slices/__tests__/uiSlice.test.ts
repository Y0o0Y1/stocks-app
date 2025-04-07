// Mock axiosBaseQuery which contains import.meta
jest.mock('../../api/axiosBaseQuery', () => ({
  axiosBaseQuery: () => jest.fn()
}));

// Mock stocksApi
jest.mock('../../api/services/stocksApi', () => ({
  stocksApi: {
    reducerPath: 'stocksApi',
    endpoints: {
      getStocks: {}
    }
  }
}));

import { uiSlice, setLoadingStatus } from '../uiSlice';

describe('UI Slice', () => {
  it('should have the correct name', () => {
    expect(uiSlice.name).toBe('ui');
  });

  it('should have the correct initial state', () => {
    expect(uiSlice.getInitialState()).toEqual({
      isLoading: false
    });
  });
  
  it('should handle setLoadingStatus action creator', () => {
    const action = setLoadingStatus(true);
    expect(action.type).toBe('ui/setLoadingStatus');
    expect(action.payload).toBe(true);
  });
}); 