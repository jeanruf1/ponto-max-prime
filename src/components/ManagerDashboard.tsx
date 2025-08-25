import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle2,
  Coffee,
  UserCheck,
  UserX,
  Calendar
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface FuncionarioStatus {
  id: string;
  nome: string;
  status: 'trabalhando' | 'em_pausa' | 'ausente' | 'finalizado';
  ultimoRegistro: string;
  horasHoje: string;
}

const ManagerDashboard = () => {
  const { usuario } = useAuth();

  // Mock data
  const colaboradoresAtivos = 12;
  const ausentes = 3;
  const ajustesPendentes = 2;
  const aniversariantes = 1;

  const equipeStatus: FuncionarioStatus[] = [
    {
      id: '1',
      nome: 'Jean Rufino',
      status: 'trabalhando',
      ultimoRegistro: '08:00',
      horasHoje: '05:30'
    },
    {
      id: '2',
      nome: 'Ana Silva',
      status: 'em_pausa',
      ultimoRegistro: '12:00',
      horasHoje: '04:00'
    },
    {
      id: '3',
      nome: 'Carlos Santos',
      status: 'trabalhando',
      ultimoRegistro: '08:15',
      horasHoje: '05:15'
    },
    {
      id: '4',
      nome: 'Maria Oliveira',
      status: 'ausente',
      ultimoRegistro: '-',
      horasHoje: '00:00'
    },
    {
      id: '5',
      nome: 'Pedro Costa',
      status: 'finalizado',
      ultimoRegistro: '17:00',
      horasHoje: '08:00'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'trabalhando':
        return <Badge variant="default" className="bg-success text-success-foreground">Trabalhando</Badge>;
      case 'em_pausa':
        return <Badge variant="secondary">Em Pausa</Badge>;
      case 'ausente':
        return <Badge variant="destructive">Ausente</Badge>;
      case 'finalizado':
        return <Badge variant="outline">Finalizado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'trabalhando':
        return <Clock className="w-4 h-4 text-success" />;
      case 'em_pausa':
        return <Coffee className="w-4 h-4 text-warning" />;
      case 'ausente':
        return <UserX className="w-4 h-4 text-danger" />;
      case 'finalizado':
        return <CheckCircle2 className="w-4 h-4 text-muted-foreground" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Dashboard de Gestão 📊
        </h1>
        <p className="text-lg text-muted-foreground mt-1">
          Olá, {usuario?.nome}! Aqui está o resumo da sua equipe.
        </p>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ajustes Pendentes</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{ajustesPendentes}</div>
            <p className="text-xs text-muted-foreground">
              Solicitações para revisar
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aniversariantes</CardTitle>
            <Calendar className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{aniversariantes}</div>
            <p className="text-xs text-muted-foreground">
              Esta semana
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ativos Hoje</CardTitle>
            <UserCheck className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{colaboradoresAtivos}</div>
            <p className="text-xs text-muted-foreground">
              Colaboradores trabalhando
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ausentes</CardTitle>
            <UserX className="h-4 w-4 text-danger" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-danger">{ausentes}</div>
            <p className="text-xs text-muted-foreground">
              Não registraram ponto
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Team Status Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Status da Equipe em Tempo Real
          </CardTitle>
          <CardDescription>
            Acompanhe o status atual de todos os colaboradores
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Header */}
            <div className="grid grid-cols-12 gap-4 font-medium text-sm text-muted-foreground border-b pb-2">
              <div className="col-span-4">Funcionário</div>
              <div className="col-span-3">Status</div>
              <div className="col-span-2">Último Registro</div>
              <div className="col-span-2">Horas Hoje</div>
              <div className="col-span-1">Ação</div>
            </div>

            {/* Rows */}
            {equipeStatus.map((funcionario) => (
              <div key={funcionario.id} className="grid grid-cols-12 gap-4 items-center py-3 border-b border-border/50 hover:bg-muted/20 rounded-lg px-2 -mx-2 transition-colors">
                <div className="col-span-4 flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">
                      {funcionario.nome.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <span className="font-medium">{funcionario.nome}</span>
                </div>
                
                <div className="col-span-3 flex items-center space-x-2">
                  {getStatusIcon(funcionario.status)}
                  {getStatusBadge(funcionario.status)}
                </div>
                
                <div className="col-span-2 font-mono text-sm">
                  {funcionario.ultimoRegistro}
                </div>
                
                <div className="col-span-2 font-mono text-sm font-medium">
                  {funcionario.horasHoje}
                </div>
                
                <div className="col-span-1">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <TrendingUp className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
            <Button variant="outline">
              Exportar Relatório
            </Button>
            <Button>
              Ver Detalhes da Equipe
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>
              Acesso rápido às funcionalidades mais utilizadas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Revisar Ajustes Pendentes ({ajustesPendentes})
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <TrendingUp className="w-4 h-4 mr-2" />
              Gestão do Banco de Horas
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Calendar className="w-4 h-4 mr-2" />
              Fechamento do Mês
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resumo Semanal</CardTitle>
            <CardDescription>
              Métricas da semana atual
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Horas Trabalhadas</span>
              <span className="font-bold">342h 30m</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Média por Funcionário</span>
              <span className="font-bold">22h 50m</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Taxa de Presença</span>
              <span className="font-bold text-success">94.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Horas Extra</span>
              <span className="font-bold text-warning">15h 20m</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManagerDashboard;