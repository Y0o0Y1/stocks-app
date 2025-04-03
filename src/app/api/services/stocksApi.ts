import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../axiosBaseQuery';
import { StocksResponse, StockQueryParams } from '../DTO/stock.DTO';

export const stocksApi = createApi({
  reducerPath: 'stocksApi',
  baseQuery: axiosBaseQuery({
    baseUrl: 'https://api.polygon.io/v3',
  }),
  tagTypes: ['Stocks'],
  endpoints: (builder) => ({
    getStocks: builder.query<StocksResponse, StockQueryParams>({
      query: (params) => ({
        url: '/reference/tickers',
        params: {
          ...params,
          market: 'stocks',
          exchange: 'XNAS', // Nasdaq exchange
          limit: params.limit || 20,
          active: true,
        },
      }),
      serializeQueryArgs: ({ queryArgs }) => {
        // Only use search param for cache key
        return { search: queryArgs.search };
      },
      merge: (currentCache, newItems) => {
        if (!currentCache) return newItems;
        return {
          ...newItems,
          results: [...currentCache.results, ...newItems.results],
        };
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        // Only refetch if cursor has changed
        return currentArg?.cursor !== previousArg?.cursor;
      },
      providesTags: (result) =>
        result
          ? [
            ...result.results.map(({ ticker }) => ({
              type: 'Stocks' as const,
              id: ticker,
            })),
            { type: 'Stocks', id: 'LIST' },
          ]
          : [{ type: 'Stocks', id: 'LIST' }],
    }),
  }),
});

export const { useGetStocksQuery } = stocksApi; 