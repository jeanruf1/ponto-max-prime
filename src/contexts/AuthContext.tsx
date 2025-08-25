import React, { createContext, useContext, useState, useEffect } from 'react';

export enum PerfilUsuario {
  COLABORADOR = 'COLABORADOR',
  GESTOR = 'GESTOR',
  ADMIN = 'ADMIN'
}

export interface Usuario {
  id: string;
  email: string;
  perfil: PerfilUsuario;
  nome: string;
  organizacao: string;
}

interface AuthContextType {
  usuario: Usuario | null;
  login: (email: string, senha: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: (Usuario & { senha: string })[] = [
  {
    id: '1',
    email: 'colaborador@pontomax.com.br',
    senha: '123456',
    perfil: PerfilUsuario.COLABORADOR,
    nome: 'Jean Rufino',
    organizacao: 'PontoMax Tecnologia'
  },
  {
    id: '2',
    email: 'gestor@pontomax.com.br',
    senha: '123456',
    perfil: PerfilUsuario.GESTOR,
    nome: 'Maria Silva',
    organizacao: 'PontoMax Tecnologia'
  },
  {
    id: '3',
    email: 'admin@pontomax.com.br',
    senha: '123456',
    perfil: PerfilUsuario.ADMIN,
    nome: 'Carlos Santos',
    organizacao: 'PontoMax Tecnologia'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('pontomax_user');
    if (storedUser) {
      setUsuario(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, senha: string): Promise<boolean> => {
    const user = mockUsers.find(u => u.email === email && u.senha === senha);
    
    if (user) {
      const { senha: _, ...userWithoutPassword } = user;
      setUsuario(userWithoutPassword);
      localStorage.setItem('pontomax_user', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('pontomax_user');
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};