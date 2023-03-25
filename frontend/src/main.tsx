import 'css/common.css';

import { ThemeProvider } from '@mui/material';
import AppRouter from 'AppRouter';
import React from 'react';
import { createRoot } from 'react-dom/client';
import theme from 'theme';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AppRouter />
    </ThemeProvider>
  </React.StrictMode>,
);
