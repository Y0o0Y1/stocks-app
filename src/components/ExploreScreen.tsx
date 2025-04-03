import {
  Alert,
  Box,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useCallback, useEffect, useState } from 'react';
import { StockQueryParams } from '../app/api/DTO/stock.DTO';
import { useGetStocksQuery } from '../app/api/services/stocksApi';
import Navbar from './Navbar';

const MainContent = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(2),
}));

const Container = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: '0 auto',
    paddingBottom: theme.spacing(2),

}));

const StockCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'left',
  maxWidth: '300px',
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
  fontWeight: 'bold',
  fontSize: '1.2rem',
  marginBottom: '0.5rem',
});

const StockName = styled(Typography)({
  fontSize: '0.9rem',
  color: 'text.secondary',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const GridContainer = styled(Box)({
  paddingRight: '8px',
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#f1f1f1',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#888',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: '#555',
  },
});


const ExploreScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [queryParams, setQueryParams] = useState<StockQueryParams>({
    limit: 48,
  });

  const { data, error, isLoading, isFetching } = useGetStocksQuery(queryParams);

  const debouncedSearch = useCallback((term: string) => {
    setQueryParams((prev) => ({
      ...prev,
      search: term || undefined,
      cursor: undefined, 
    }));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      debouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, debouncedSearch]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (
      scrollHeight - scrollTop === clientHeight &&
      !isFetching &&
      data?.next_url
    ) {
      const cursor = data.next_url.split('cursor=')[1];
      setQueryParams((prev) => ({
        ...prev,
        cursor,
      }));
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Box sx={{ height: '100%' }}>
      <Navbar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <MainContent>
        <Container>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error instanceof Error ? error.message : 'An error occurred'}
            </Alert>
          )}
          <GridContainer onScroll={handleScroll}>
            <Grid container spacing={4}>
              {data?.results.map((stock) => (
                <Grid key={stock.ticker} item xs={6} sm={4} md={2}>
                  <StockCard>
                    <StockSymbol>
                      {stock.ticker}
                    </StockSymbol>
                    <StockName>
                      {stock.name}
                    </StockName>
                  </StockCard>
                </Grid>
              ))}
            </Grid>

            {!isLoading && !isFetching && data?.results.length === 0 && (
              <Typography align="center" color="textSecondary" sx={{ mt: 2 }}>
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