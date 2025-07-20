import {Routes, Route, useNavigate} from "react-router";
import RootLayout from "@/routes/RootLayout.tsx";
import Overview from "@/routes/Overview.tsx";
import Cookies from "js-cookie";
import {useEffect} from "react";
import Login from "@/routes/Login.tsx";
import TabelPendaftaran from "@/components/TabelPendaftaran.tsx";
import NotFound from "@/routes/NotFound.tsx";

function App() {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);
  return (
    <Routes>
      <Route element={<RootLayout/>}>
        <Route path={"/"} element={<Overview/>}/>
        <Route path={"/mahasiswa"} element={<TabelPendaftaran/>}/>
      </Route>
      <Route path={"/login"} element={<Login/>}/>
      <Route path={"*"} element={<NotFound/>}/>
    </Routes>
  )
}

export default App
