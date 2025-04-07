import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { AxiosRequestConfig } from 'axios';

// Mock version of axiosBaseQuery that doesn't use import.meta
export const axiosBaseQuery = (
  _options: { baseUrl: string } = { baseUrl: '' }
): BaseQueryFn<
  {
    url: string;
    method?: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
    params?: AxiosRequestConfig['params'];
  },
  unknown,
  unknown
> => {
  return async () => {
    // Mock implementation that always returns a successful empty response
    return { data: {} };
  };
};