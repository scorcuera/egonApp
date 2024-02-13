import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Login from '../components/Login';
import UserDashboard from '../pages/UserDashboard';
import HomePage from '../pages/HomePage';
import ClapForm from '../components/ClapForm';
import Register from '../components/Register';

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
                path: "/userDashboard",
                element: <UserDashboard />,
                children: [
                    {
                        path: "sendClaps",
                        element: <ClapForm />
                    }
                ]
            }
        ],
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
])



export default router;