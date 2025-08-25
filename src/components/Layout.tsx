import React from 'react';
import { useAuth, PerfilUsuario } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Clock, 
  LogOut, 
  User, 
  Settings, 
  Users, 
  FileBarChart,
  Building,
  Calendar,
  DollarSign
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { usuario, logout } = useAuth();
  const location = useLocation();

  const getNavItems = () => {
    const baseItems = [
      { 
        path: '/dashboard', 
        label: 'Dashboard', 
        icon: Calendar
      },
    ];

    const colaboradorItems = [
      { path: '/registros', label: 'Meus Registros', icon: Clock },
      { path: '/holerite', label: 'Meu Holerite', icon: DollarSign },
    ];

    const gestorItems = [
      { path: '/equipe', label: 'Equipe', icon: Users },
      { path: '/banco-horas', label: 'Banco de Horas', icon: FileBarChart },
      { path: '/fechamento', label: 'Fechamento', icon: DollarSign },
    ];

    const adminItems = [
      { path: '/configuracoes', label: 'Configurações', icon: Settings },
      { path: '/organizacao', label: 'Organização', icon: Building },
    ];

    let items = [...baseItems];

    if (usuario?.perfil === PerfilUsuario.COLABORADOR) {
      items = [...items, ...colaboradorItems];
    }

    if (usuario?.perfil === PerfilUsuario.GESTOR || usuario?.perfil === PerfilUsuario.ADMIN) {
      items = [...items, ...colaboradorItems, ...gestorItems];
    }

    if (usuario?.perfil === PerfilUsuario.ADMIN) {
      items = [...items, ...adminItems];
    }

    return items;
  };

  const navItems = getNavItems();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <h1 className="ml-3 text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  PontoMax
                </h1>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {usuario?.nome.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{usuario?.nome}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      {usuario?.email}
                    </p>
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                      {usuario?.perfil}
                    </span>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configurações</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;