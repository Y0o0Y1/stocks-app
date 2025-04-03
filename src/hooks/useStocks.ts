import { useState, useEffect, useCallback } from 'react';
import stockService from '../services/stockService';
import { Stock, StockSearchParams } from '../types/stock';

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface CacheItem {
  data: Stock[];
  timestamp: number;
}

const useStocks = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [cursor, setCursor] = useState<string | undefined>();

  const cache = new Map<string, CacheItem>();

  const fetchStocks = useCallback(async (params: StockSearchParams = {}) => {
    try {
      setLoading(true);
      setError(null);

      const cacheKey = JSON.stringify(params);
      const cachedData = cache.get(cacheKey);

      if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
        setStocks(prev => [...prev, ...cachedData.data]);
        return;
      }

      const response = await stockService.getStocks({
        ...params,
        limit: 20,
        cursor,
      });

      const newStocks = response.results;
      setStocks(prev => [...prev, ...newStocks]);
      setHasMore(!!response.next_url);
      setCursor(response.next_url?.split('cursor=')[1]);

      // Cache the results
      cache.set(cacheKey, {
        data: newStocks,
        timestamp: Date.now(),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [cursor]);

  const searchStocks = useCallback(async (searchTerm: string) => {
    setStocks([]);
    setCursor(undefined);
    await fetchStocks({ search: searchTerm });
  }, [fetchStocks]);

  useEffect(() => {
    fetchStocks();
  }, []);

  return {
    stocks,
    loading,
    error,
    hasMore,
    fetchMore: () => fetchStocks(),
    searchStocks,
  };
};

export default useStocks; 