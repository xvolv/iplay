import { Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard";
import Home from "./home";

export default function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
<Route path="/" element={<Home/>}></Route>
    </Routes>
  );
}
