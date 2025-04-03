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
        params
      }),
      serializeQueryArgs: ({ queryArgs }) => {
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