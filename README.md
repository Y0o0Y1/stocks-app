# Stock Market App

A React web application that displays stocks listed in the Nasdaq exchange. The app allows users to browse stocks, search for specific stocks, and view detailed information.

## Features

- Splash screen with Nasdaq logo
- Explore screen with stock listings
- Infinite scroll for loading more stocks
- Real-time stock search
- Responsive design
- API response caching
- Error handling

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Polygon.io API key

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Create a `.env` file in the root directory and add your Polygon.io API key:
   ```
   VITE_POLYGON_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Testing

Run the test suite:
```bash
npm test
# or
yarn test
```

## Production Build

To create a production build:
```bash
npm run build
# or
yarn build
```

## Tech Stack

- React
- TypeScript
- Material-UI
- Axios
- React Router
- Vite

## Project Structure

```
src/
  ├── components/     # Reusable UI components
  ├── pages/         # Page components
  ├── services/      # API services
  ├── hooks/         # Custom hooks
  ├── utils/         # Utility functions
  ├── types/         # TypeScript type definitions
  ├── store/         # State management
  └── assets/        # Static assets
```

## API Integration

This app uses the Polygon.io Stocks API for fetching stock data. The main endpoint used is:
- GET /v3/reference/tickers - For fetching stock list (ticker, name)

## Error Handling

The app includes comprehensive error handling for:
- API rate limiting
- Network errors
- Invalid responses
- Search errors

## Caching

API responses are cached to prevent redundant requests and improve performance.
