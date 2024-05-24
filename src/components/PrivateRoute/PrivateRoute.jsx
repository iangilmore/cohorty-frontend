import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContextComponent.jsx';

const PrivateRoute = ({ children }) => {
  const { isUserLoggedIn } = useContext(AuthContext);

  if (!isUserLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
