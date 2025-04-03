import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { stocksApi } from "../api/services/stocksApi";
export interface UiState {
  isLoading: boolean;
}

const initialState: UiState = {
  isLoading: false,
};

const loadingEndpoints = [
  stocksApi.endpoints.getStocks,
];

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLoadingStatus(state: UiState, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
  extraReducers(builder) {
    loadingEndpoints.forEach((endpoint) => {
      builder
        .addMatcher(endpoint.matchPending, (state) => {
          state.isLoading = true;
        })
        .addMatcher(endpoint.matchFulfilled, (state) => {
          state.isLoading = false;
        })
        .addMatcher(endpoint.matchRejected, (state) => {
          state.isLoading = false;
        });
    });
  },
});

export const { setLoadingStatus } = uiSlice.actions;

export default uiSlice.reducer;
