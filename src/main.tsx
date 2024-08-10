import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './lib/redux/redux.config.ts';
import { Toaster } from './components/ui/toaster.tsx';
import './globals.css'
import { ThemeProvider } from './components/ui/theme-provider.tsx';

const root = createRoot(document.getElementById("root")!);
const App = lazy(() => import("./App.tsx"));

root.render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Provider store={store}>
          <Suspense>
            <App />
          </Suspense>

          <Toaster />
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
