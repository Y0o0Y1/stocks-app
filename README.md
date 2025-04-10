# Nasdaq Stock Market App

A responsive web application that displays stocks listed in the Nasdaq exchange. The app allows users to browse stocks, search for specific stocks, and view detailed information.

## Features

- Splash screen with Nasdaq logo
- Explore screen with stock listings
- Infinite scroll for loading more stocks
- Real-time stock search
- Responsive design
- API response caching
- Error handling

## Tech Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript
- **UI Library**: Material-UI (MUI)
- **State Management**: Redux Toolkit
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Styling**: Emotion
- **Build Tool**: Vite
- **Testing**: Jest, React Testing Library

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Polygon.io API key

## Setup

1. Clone the repository:
```bash
git clone [repository-url]
cd stock-app
```

2. Install dependencies:
```bash
yarn install
```

3. Create a `.env` file in the root directory and add your Polygon.io API key:
```
VITE_POLYGON_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
yarn dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn lint` - Run ESLint
- `yarn test` - Run Jest tests

## Project Structure

```
src/
├── app/           # Redux store and slices
│   ├── api/       # API services and base query setup
│   │   ├── __mocks__/        # API mocks
│   │   ├── __tests__/        # API tests
│   │   └── services/
│   │       ├── __mocks__/    # Service mocks
│   │       └── __tests__/    # Service tests
│   └── slices/
│       └── __tests__/        # Redux slice tests
├── assets/        # Static assets
├── components/    # Reusable components
├── __mocks__/     # Global mocks for testing
├── __tests__/     # Global tests
├── setupTests.ts  # Test setup configuration
├── App.tsx        # Main application component
├── main.tsx       # Application entry point
└── index.css      # Global styles
```

## Testing

The application includes a comprehensive testing infrastructure:

### Testing Stack
- **Jest**: Test runner and assertion library
- **React Testing Library**: For testing React components
- **Redux Mock Store**: For testing Redux actions and reducers
- **Mock Service Worker (MSW)**: For mocking API requests

### Test Types
- **Unit Tests**: Testing individual components and functions
- **Integration Tests**: Testing interactions between components
- **Redux Tests**: Testing Redux slices, actions, and reducers
- **API Tests**: Testing API services and requests

### Running Tests
```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test --watch

# Run tests with coverage report
yarn test --coverage
```

### Test File Organization
Tests are organized alongside the code they test:
```
src/
├── app/
│   ├── api/
│   │   ├── __mocks__/        # API mocks
│   │   ├── __tests__/        # API tests
│   │   └── services/
│   │       ├── __mocks__/    # Service mocks
│   │       └── __tests__/    # Service tests
│   └── slices/
│       └── __tests__/        # Redux slice tests
└── components/
    └── __tests__/            # Component tests
```

## API Integration

This app uses the Polygon.io Stocks API for fetching stock data. The main endpoint used is:
- GET /v3/reference/tickers - For fetching stock list (ticker, name)

## Network Call Caching

The application uses RTK Query for efficient data fetching and caching:

1. **Automatic Caching**
   - RTK Query automatically caches API responses
   - Cache is managed by Redux store
   - Data is normalized and deduplicated automatically

2. **Cache Invalidation**
   - Automatic cache invalidation based on endpoint configuration
   - Manual cache invalidation through tags
   - Optimistic updates for immediate UI feedback

3. **Cache Configuration**
   - Configurable cache duration per endpoint
   - Stale-while-revalidate strategy
   - Automatic background refetching of stale data

4. **Request Deduplication**
   - Identical requests are deduplicated automatically
   - Shared cache between components
   - Prevents redundant API calls

## Error Handling

The app includes comprehensive error handling for:
- API rate limiting
- Network errors
- Invalid responses
- Search errors

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.
