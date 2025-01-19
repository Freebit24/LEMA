import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';
import { UserAuthContextProvider } from './context/UserAuthContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserAuthContextProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </UserAuthContextProvider>
  </StrictMode>
);