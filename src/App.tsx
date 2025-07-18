import {Routes, Route} from "react-router";
import RootLayout from "@/routes/RootLayout.tsx";
import Overview from "@/routes/Overview.tsx";

function App() {
  return (
    <Routes>
      <Route element={<RootLayout/>}>
        <Route path={"/"} element={<Overview/>}/>
        <Route path={"/mahasiswa"} element={<p>page mahasiswa</p>}/>
      </Route>
    </Routes>
  )
}

export default App
