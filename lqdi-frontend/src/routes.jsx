import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet
} from 'react-router-dom';
import Home from './Home';
import { useContext } from 'react';
import { AuthContext, AuthProvider } from './contexts/AuthContex';
import { GlobalProvider } from './contexts/GlobalContext';
import Login from './Login';
import Dashboard from './Dashboard';

function PrivateRoute() {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default function AppRoutes() {

  return (

    <Router>
      <GlobalProvider>
        <AuthProvider>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </AuthProvider>
      </GlobalProvider>
    </Router>
  )
}