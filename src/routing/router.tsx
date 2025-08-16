import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Services from "../pages/Services";
import About from "../pages/About";
import Contact from "../pages/Contact";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AppLayout from "../components/layout/AppLayout";
import ProtectedRoute from "./ProtectedRoute";
import DashboardPage from "../pages/Dashboard";
import MedicalRecordsPage from "../pages/MedicalRecordPage";
import BookAppointmentPage from "../pages/BookAppointmentPage";
import DoctorDashboard from "../pages/DoctorDashboard";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/services', element: <Services /> },
      { path: '/about', element: <About /> },
      { path: '/contact', element: <Contact /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: '/dashboard', element: <DashboardPage /> },
          { path: '/medical-records', element: <MedicalRecordsPage /> },
          { path: '/book-appointment', element: <BookAppointmentPage /> },
          { path: '/doctor/dashboard', element: <DoctorDashboard /> },
        ]
      }
    ],
  },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
]);