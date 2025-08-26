import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth, PerfilUsuario } from "@/contexts/AuthContext";
import LoginPage from "@/components/LoginPage";
import Layout from "@/components/Layout";
import Dashboard from "@/pages/Dashboard";
import Registros from "@/pages/Registros";
import Holerite from "@/pages/Holerite";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Equipe from "@/pages/Equipe";
import BancoHoras from "@/pages/BancoHoras";
import Fechamento from "@/pages/Fechamento";
import AjustesPendentes from "@/pages/AjustesPendentes";
import Configuracoes from "@/pages/Configuracoes";
import Perfil from "@/pages/Perfil";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { usuario, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Carregando...</div>
      </div>
    );
  }
  
  if (!usuario) {
    return <LoginPage />;
  }
  
  return <Layout>{children}</Layout>;
};

const AppContent = () => {
  const { usuario } = useAuth();
  
  if (!usuario) {
    return <LoginPage />;
  }
  
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/registros" element={
        <ProtectedRoute>
          <Registros />
        </ProtectedRoute>
      } />
      <Route path="/holerite" element={
        <ProtectedRoute>
          <Holerite />
        </ProtectedRoute>
      } />
      <Route path="/equipe" element={
        <ProtectedRoute>
          <Equipe />
        </ProtectedRoute>
      } />
      <Route path="/banco-horas" element={
        <ProtectedRoute>
          <BancoHoras />
        </ProtectedRoute>
      } />
      <Route path="/fechamento" element={
        <ProtectedRoute>
          <Fechamento />
        </ProtectedRoute>
      } />
      <Route path="/ajustes-pendentes" element={
        <ProtectedRoute>
          <AjustesPendentes />
        </ProtectedRoute>
      } />
      <Route path="/perfil" element={
        <ProtectedRoute>
          <Perfil />
        </ProtectedRoute>
      } />
      <Route path="/configuracoes" element={
        <ProtectedRoute>
          <Configuracoes />
        </ProtectedRoute>
      } />
      <Route path="/organizacao" element={
        <ProtectedRoute>
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold">Organização</h2>
            <p className="text-muted-foreground mt-2">Em desenvolvimento...</p>
          </div>
        </ProtectedRoute>
      } />
      {/* Fallback routes */}
      <Route path="/legacy" element={<Index />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
