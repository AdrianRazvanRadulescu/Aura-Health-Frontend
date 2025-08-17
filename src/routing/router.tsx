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
import DashboardLayout from "../components/layout/DashboardLayout";
import TeleconsultatiiPage from "../pages/TeleconsulatiiPage";
import AiAnalysisPage from "../pages/AiAnalysisPage";
import PersonalizedMonitoringPage from "../pages/PersonalizedMonitoringPage";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/services', element: <Services /> },
      { path: '/about', element: <About /> },
      { path: '/contact', element: <Contact /> },
      { path: '/services/teleconsultatii', element: <TeleconsultatiiPage /> },
      { path: '/services/ai-analysis', element: <AiAnalysisPage /> },
      { path: '/services/personalized-monitoring', element: <PersonalizedMonitoringPage /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: '/dashboard', element: <DashboardPage /> },
          { path: '/medical-records', element: <MedicalRecordsPage /> },
          { path: '/book-appointment', element: <BookAppointmentPage /> },
          { path: '/doctor/dashboard', element: <DoctorDashboard /> },
        ]
      }
    ]
  },

  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
]);