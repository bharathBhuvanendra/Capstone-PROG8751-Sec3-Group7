import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PaymentWrapper from './components/PaymentWrapper';
import { ErrorBoundary } from 'react-error-boundary';

// Define the Error Fallback UI for ErrorBoundary
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

// Define route configurations with lazy-loaded components
const routes = [
  { path: '/', component: lazy(() => import('./components/Homepage')) },
  { path: '/dashboard', component: lazy(() => import('./components/Dashboard')) },
  { path: '/login', component: lazy(() => import('./components/Login')) },
  { path: '/signup', component: lazy(() => import('./components/Signup')) },
  { path: '/my-bookings', component: lazy(() => import('./components/MyBookings')) },
  { path: '/admindashboard', component: lazy(() => import('./components/AdminDashboard')) },
];

function App() {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {routes.map(({ path, component: Component }) => (
            <Route
              key={path}
              path={path}
              element={
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <Component />
                </ErrorBoundary>
              }
            />
          ))}
          {/* Updated route for checkout to wrap with PaymentWrapper */}
          <Route
            path="/checkout"
            element={
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <PaymentWrapper />
              </ErrorBoundary>
            }
          />
        </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
}

export default App;
