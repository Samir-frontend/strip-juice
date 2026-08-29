import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import AdminLogin from './AdminLogin.jsx';
import AdminDashboard from './AdminDashboard.jsx';

export default function Admin() {
  const { admin } = useAuth();
  return admin ? <AdminDashboard /> : <AdminLogin />;
}
