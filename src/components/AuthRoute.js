import { Navigate } from 'react-router-dom'

const AuthRoute = ({ user, children }) => {
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default AuthRoute;