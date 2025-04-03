import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import { store } from './app/store';
import SplashScreen from './components/SplashScreen';
import ExploreScreen from './components/ExploreScreen';
import LoadingOverlay from './components/LoadingOverlay';
import theme from './app/theme';

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <LoadingOverlay />
        <CssBaseline />
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                showSplash ? (
                  <SplashScreen developerName="Yahya Zaki" />
                ) : (
                  <ExploreScreen />
                )
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
