import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react'
import { RouterProvider } from "react-router-dom";
import router from './router/router.tsx';
import './index.css'
import { AuthProvider } from './contexts/auth.context.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ChakraProvider>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </ChakraProvider >
)
