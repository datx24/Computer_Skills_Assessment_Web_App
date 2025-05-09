import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps{
    children: React.ReactNode
    allowedRoles?: string[]
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children, allowedRoles}) => {
    const {user, role} = useAuth()

    if(!user || !role) {
        return <Navigate to = '/login' replace/>
    }

    if(allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to = 'unauthorized' replace/>
    }

    return <>{children}</>
}

export default ProtectedRoute;