import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import RegisterUser from "./pages/RegisterUser";
import RegisterProvider from "./pages/RegisterProvider";
import UserDashboard from "./pages/UserDashboard";
import ProviderDashboard from "./pages/ProviderDashboard";
import BookAppointment from "./pages/BookAppointment";
import PageNotFound from "./pages/PageNotFound";

import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
    <Router>
      <Header />
      <main className="container my-4">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register-user" element={<RegisterUser />} />
          <Route path="/register-provider" element={<RegisterProvider />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="*" element={<PageNotFound />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard/user"
            element={
              <ProtectedRoute role="user">
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/provider"
            element={
              <ProtectedRoute role="provider">
                <ProviderDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
