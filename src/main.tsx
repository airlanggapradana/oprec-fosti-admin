import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './App.css'
import {BrowserRouter} from "react-router";
import TanstackProvider from "@/utils/TanstackProvider.tsx";
import {ThemeProvider} from "@/components/theme-provider.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <TanstackProvider>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <App/>
        </ThemeProvider>
      </TanstackProvider>
    </BrowserRouter>
  </StrictMode>,
)
