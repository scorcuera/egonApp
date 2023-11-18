import ReactDOM from 'react-dom/client';
import  { RouterProvider } from "react-router-dom";
import router from './router/router.tsx';
import './index.css'
import { AuthProvider } from './contexts/auth.context.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
)
