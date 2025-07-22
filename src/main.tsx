import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router";
import TanstackProvider from "@/utils/TanstackProvider.tsx";
import {ThemeProvider} from "@/components/theme-provider.tsx";
import RootLayout from "@/routes/RootLayout.tsx";
import Overview from "@/routes/Overview.tsx";
import TabelPendaftaran from "@/components/TabelPendaftaran.tsx";
import Presensi from "@/routes/Presensi.tsx";
import Login from "@/routes/Login.tsx";
import NotFound from "@/routes/NotFound.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TanstackProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Routes>
            <Route element={<RootLayout/>}>
              <Route path={"/"} element={<Overview/>}/>
              <Route path={"/mahasiswa"} element={<TabelPendaftaran/>}/>
              <Route path={"/presensi"} element={<Presensi/>}/>
            </Route>
            <Route path={"/login"} element={<Login/>}/>
            <Route path={"*"} element={<NotFound/>}/>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </TanstackProvider>
  </StrictMode>,
)
