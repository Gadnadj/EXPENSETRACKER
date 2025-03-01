import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Home from './pages/Dashboard/Home';
import Income from './pages/Dashboard/Income';
import Expense from './pages/Dashboard/Expense';
import UserProvider from './context/UserContext';
import { ThemeProvider } from './context/ThemeContext';
import { Toaster } from 'react-hot-toast';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Protected routes */}
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            } />
            <Route path="/income" element={
              <PrivateRoute>
                <Income />
              </PrivateRoute>
            } />
            <Route path="/expense" element={
              <PrivateRoute>
                <Expense />
              </PrivateRoute>
            } />

            {/* Redirect root to dashboard if authenticated, otherwise to login */}
            <Route path="/" element={
              localStorage.getItem('token')
                ? <Navigate to="/dashboard" replace />
                : <Navigate to="/login" replace />
            } />

            {/* Catch all other routes and redirect to dashboard if authenticated, otherwise to login */}
            <Route path="*" element={
              localStorage.getItem('token')
                ? <Navigate to="/dashboard" replace />
                : <Navigate to="/login" replace />
            } />
          </Routes>
        </Router>

        <Toaster
          position='top-right'
          toastOptions={{
            className: '',
            style: {
              fontSize: '13px'
            }
          }}
        />
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;