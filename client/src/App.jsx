import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Profile from './pages/Profile';
import TodoPage from './pages/TodoPage';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SignUp from './pages/Signup';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/todos"
            element={
              <PrivateRoute>
                <TodoPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/logout"
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/';
            }}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired
};
