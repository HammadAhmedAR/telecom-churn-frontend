import { createBrowserRouter, Navigate } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout'
import LoginPage from '../features/auth/LoginPage'
import CustomerProfilePage from '../features/customers/CustomerProfilePage'
import CustomersPage from '../features/customers/CustomersPage'
import DashboardPage from '../features/dashboard/DashboardPage'
import RetentionPage from '../features/retention/RetentionPage'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: '/dashboard', element: <DashboardPage /> },
      { path: '/customers', element: <CustomersPage /> },
      { path: '/customers/:id', element: <CustomerProfilePage /> },
      { path: '/retention-actions', element: <RetentionPage /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
])
