export const stocksApi = {
  reducerPath: 'stocksApi',
  endpoints: {
    getStocks: {
      matchPending: 'stocksApi/getStocks/pending',
      matchFulfilled: 'stocksApi/getStocks/fulfilled',
      matchRejected: 'stocksApi/getStocks/rejected',
    }
  }
};

export const useGetStocksQuery = jest.fn(); 