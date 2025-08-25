import React from 'react';
import { useAuth, PerfilUsuario } from '@/contexts/AuthContext';
import EmployeeDashboard from '@/components/EmployeeDashboard';
import ManagerDashboard from '@/components/ManagerDashboard';

const Dashboard = () => {
  const { usuario } = useAuth();

  if (!usuario) {
    return <div>Carregando...</div>;
  }

  // Admin users get the same dashboard as managers for now
  if (usuario.perfil === PerfilUsuario.GESTOR || usuario.perfil === PerfilUsuario.ADMIN) {
    return <ManagerDashboard />;
  }

  return <EmployeeDashboard />;
};

export default Dashboard;