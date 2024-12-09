import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Base from "./components/Base";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ReadListing from "./components/ReadListing";
import AddListing from "./pages/AddListing";
import Login from "./pages/authentication/Login";
import SignUp from "./pages/authentication/SignUp";
import ProtectedRoute from "./pages/authentication/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import ComparisonPage from "./pages/ComparisonPage";
import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>
      <UserAuthContextProvider>
        <Routes>
          <Route path="/" element={<Navigate to="home" />} />
          <Route path="home" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="about" element={<About />} />
          <Route path="listing/:listingId" element={<ReadListing />} />
          <Route path="list-vehicle" element={<ProtectedRoute><AddListing /></ProtectedRoute>} />
          <Route path="login" element={<Base> <Login /></Base>} />
          <Route path="signUp" element={<Base><SignUp /></Base>} />
          <Route path="comparison" element={<ComparisonPage />} />
          
        </Routes>
      </UserAuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
