# Stock Trading Application

A modern, responsive stock trading application built with React, TypeScript, and Material-UI. This application provides real-time stock market data and trading capabilities.

## Features

- Real-time stock market data
- Interactive stock charts
- Portfolio management
- User authentication
- Responsive design

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

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd stock-app
```

2. Install dependencies:
```bash
yarn install
```

3. Create a `.env` file in the root directory and add your environment variables:
```bash
cp .env.example .env
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
- `yarn test` - Run tests
- `yarn test:watch` - Run tests in watch mode
- `yarn lint` - Run ESLint

## Project Structure

```
src/
├── app/           # Redux store and slices
├── assets/        # Static assets
├── components/    # Reusable components
├── App.tsx        # Main application component
├── main.tsx       # Application entry point
└── index.css      # Global styles
```

## Network Call Caching

The application implements caching for network calls to optimize performance and reduce API requests:

1. **API Response Caching**
   - Axios interceptors are used to cache API responses
   - Cache duration is configurable per endpoint
   - Automatic cache invalidation on data updates
   - Cache is stored in memory for fast access
   - TTL (Time To Live) is implemented for cached responses

2. **Request Deduplication**
   - Identical requests made within a short time window are deduplicated
   - Prevents multiple API calls for the same data
   - Improves application performance and reduces server load

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
