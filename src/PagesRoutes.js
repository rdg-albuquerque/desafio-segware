import { BrowserRouter as Router, Navigate, Outlet, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { GlobalProvider } from "./contexts/GlobalProvider";
import { useGlobal } from "./hooks/useGlobal";
import Home from "./pages/Home";
import SignInOrUp from "./pages/SignInOrUp";

function ProtectedRoute() {
  const { token } = useGlobal();
  return token ? <Outlet /> : <Navigate to="/signin" />;
}
function PagesRoutes() {
  return (
    <GlobalProvider>
      <Router>
        <Routes>
          <Route path="/signin" element={<SignInOrUp />} />
          <Route path="/signup" element={<SignInOrUp />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </GlobalProvider>
  );
}

export default PagesRoutes;
