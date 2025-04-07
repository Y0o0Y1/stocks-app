import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock('../app/api/axiosBaseQuery', () => ({
  axiosBaseQuery: () => jest.fn()
}));

jest.mock('../app/api/services/stocksApi', () => ({
  stocksApi: {
    reducerPath: 'stocksApi',
    endpoints: {
      getStocks: {}
    },
    middleware: jest.fn()
  },
  useGetStocksQuery: jest.fn()
}));

jest.mock('../app/store', () => ({
  store: {
    getState: jest.fn().mockReturnValue({ ui: { isLoading: false } }),
    dispatch: jest.fn(),
    subscribe: jest.fn()
  }
}));

jest.mock('../components/SplashScreen', () => ({
  __esModule: true,
  default: ({ developerName }: { developerName: string }) => (
    <div data-testid="splash-screen">Splash Screen: {developerName}</div>
  )
}));

jest.mock('../components/ExploreScreen', () => ({
  __esModule: true,
  default: () => <div data-testid="explore-screen">Explore Screen</div>
}));

jest.mock('../components/LoadingOverlay', () => ({
  __esModule: true,
  default: () => <div data-testid="loading-overlay">Loading Overlay</div>
}));

jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Routes: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Route: ({ element }: { element: React.ReactNode }) => <div>{element}</div>
}));

import App from '../App';

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders splash screen initially', () => {
    jest.spyOn(React, 'useState').mockImplementation(() => [true, jest.fn()]);
    jest.spyOn(React, 'useEffect').mockImplementation(() => {});
    
    render(<App />);
    
    expect(screen.getByTestId('splash-screen')).toBeInTheDocument();
    expect(screen.queryByTestId('explore-screen')).toBeNull();
  });

  it('renders explore screen after splash screen timeout', () => {
    jest.spyOn(React, 'useState').mockImplementation(() => [false, jest.fn()]);
    jest.spyOn(React, 'useEffect').mockImplementation(() => {});
    
    render(<App />);
    
    expect(screen.queryByTestId('splash-screen')).toBeNull();
    expect(screen.getByTestId('explore-screen')).toBeInTheDocument();
  });
});