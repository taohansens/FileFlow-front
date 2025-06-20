import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import FileContent from './pages/FileContent';
import RequestPasswordRecovery from "./pages/RequestPasswordRecovery.jsx";
import PasswordRecovery from "./pages/PasswordRecovery.jsx";

function App() {
  const { currentUser } = useAuth();

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/file_content/:id" element={<FileContent />} />
      <Route path="/request_password_recovery" element={<RequestPasswordRecovery />} />
      <Route path="/password_recovery" element={<PasswordRecovery />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;