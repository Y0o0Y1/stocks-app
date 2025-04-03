import {
  Alert,
  Box,
  Grid as MuiGrid,
  Paper,
  Typography,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useCallback, useEffect, useState } from 'react';
import { StockDTO, StockQueryParams } from '../app/api/DTO/stock.DTO';
import { useGetStocksQuery } from '../app/api/services/stocksApi';
import Navbar from './Navbar';

const MainContent = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  height: '100%',
  overflow: 'hidden',
}));

const Container = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: '0 auto',
  paddingBottom: theme.spacing(2),
  height: '100%',
}));

const StockCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'left',
  cursor: 'pointer',
  transition: 'transform 0.2s ease-in-out',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  '&:hover': {
    transform: 'translateY(-4px)',
    backgroundColor: theme.palette.action.hover,
  },
}));

const StockSymbol = styled(Typography)({
  variant: 'h6',
  fontWeight: 700,
  marginBottom: '0.5rem',
});

const StockName = styled(Typography)({
  variant: 'subtitle2',
  color: 'text.secondary',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const GridContainer = styled(Box)({
  height: 'calc(100vh - 140px)',
  overflowY: 'auto',
  paddingRight: '8px',
  paddingBottom: '48px',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
});

interface ApiError {
  status: number;
  data?: {
    retry_after?: number;
  };
}

const isApiError = (error: unknown): error is ApiError => {
  return typeof error === 'object' && error !== null && 'status' in error;
};

const ExploreScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [queryParams, setQueryParams] = useState<StockQueryParams>({
    limit: 48,
  });
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  const { data, error, isLoading, isFetching } = useGetStocksQuery(queryParams);

  useEffect(() => {
    if (error && isApiError(error) && error.status === 429) {
      setIsRateLimited(true);
      const retryAfterSeconds = error.data?.retry_after || 60;
      setCountdown(retryAfterSeconds);

      const timer = setTimeout(() => {
        setIsRateLimited(false);
        setCountdown(null);
      }, retryAfterSeconds * 1000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (countdown !== null && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => (prev !== null ? prev - 1 : null));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  const debouncedSearch = useCallback((term: string) => {
    if (isRateLimited) return;
    setQueryParams((prev) => ({
      ...prev,
      search: term || undefined,
      cursor: undefined,
    }));
  }, [isRateLimited]);

  useEffect(() => {
    const timer = setTimeout(() => {
      debouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, debouncedSearch]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    const isNearBottom = scrollHeight - scrollTop <= clientHeight + 100;

    if (isNearBottom && !isFetching && data?.next_url) {
      try {
        const url = new URL(data.next_url);
        const cursor = url.searchParams.get('cursor');

        if (cursor) {
          setQueryParams((prev) => ({
            ...prev,
            cursor,
          }));
        }
      } catch (error) {
        console.error('Error parsing next_url:', error);
      }
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Box sx={{ height: '100vh', overflow: 'hidden' }}>
      <Navbar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <MainContent>
        <Container>
          {error && (
            <Alert
              severity={isRateLimited ? "warning" : "error"}
              sx={{ mb: 2 }}
              action={
                isRateLimited && countdown !== null && (
                  <Button color="inherit" size="small" disabled>
                    {countdown}s
                  </Button>
                )
              }
            >
              {isRateLimited
                ? `API rate limit reached. Please wait ${countdown} seconds before trying again.`
                : error instanceof Error ? error.message : 'An error occurred'
              }
            </Alert>
          )}
          <GridContainer onScroll={handleScroll}>
            <MuiGrid container spacing={4} alignItems="center" justifyContent="center">
              {data?.results.map((stock: StockDTO) => (
                <MuiGrid
                  key={stock.ticker + stock.name + stock.last_updated_utc}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  xl={2}
                >
                  <StockCard>
                    <StockSymbol>
                      {stock.ticker}
                    </StockSymbol>
                    <StockName>
                      {stock.name}
                    </StockName>
                  </StockCard>
                </MuiGrid>
              ))}
            </MuiGrid>

            {!isLoading && !isFetching && data?.results.length === 0 && (
              <Typography align="center" color="textSecondary" sx={{ mt: 44 }}>
                No stocks found
              </Typography>
            )}
          </GridContainer>
        </Container>
      </MainContent>
    </Box>
  );
};

export default ExploreScreen; 