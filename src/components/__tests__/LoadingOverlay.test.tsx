import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import LoadingOverlay from '../LoadingOverlay';

interface MockState {
  ui: {
    isLoading: boolean;
  };
}

const mockStore = configureStore<MockState, any>([]);

describe('LoadingOverlay', () => {
  it('should not be visible when loading is false', () => {
    const store = mockStore({
      ui: { isLoading: false }
    });

    render(
      <Provider store={store}>
        <LoadingOverlay />
      </Provider>
    );

    const backdropStyle = document.querySelector('.MuiBackdrop-root');
    expect(backdropStyle).toHaveStyle('visibility: hidden');
  });

  it('should be visible when loading is true', () => {
    const store = mockStore({
      ui: { isLoading: true }
    });

    render(
      <Provider store={store}>
        <LoadingOverlay />
      </Provider>
    );

    const backdropElement = document.querySelector('.MuiBackdrop-root');
    expect(backdropElement).toBeInTheDocument();
    expect(backdropElement).not.toHaveStyle('visibility: hidden');
  });
});