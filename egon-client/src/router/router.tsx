import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Login from '../components/Login';
import UserDashboard from '../pages/UserDashboard';
import HomePage from '../pages/HomePage';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/userDashboard",
                element: <UserDashboard />
            }
        ]
    }
])



export default router;