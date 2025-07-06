import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"
import DoctorDetails from "./pages/DoctorDetails"



function App() {


    return (
        <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/doctor/:id" element={<DoctorDetails />} />
    </Routes>
    )
}

export default App
