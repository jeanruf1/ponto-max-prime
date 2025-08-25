import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  Play, 
  Pause, 
  Square, 
  Coffee, 
  CheckCircle2,
  AlertTriangle,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

enum TipoRegistroPonto {
  ENTRADA = 'ENTRADA',
  SAIDA = 'SAIDA',
  INICIO_PAUSA = 'INICIO_PAUSA',
  FIM_PAUSA = 'FIM_PAUSA'
}

interface RegistroPonto {
  id: string;
  tipo: TipoRegistroPonto;
  dataHora: Date;
}

const EmployeeDashboard = () => {
  const { usuario } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [registros, setRegistros] = useState<RegistroPonto[]>([]);
  const [estadoAtual, setEstadoAtual] = useState<'nao_iniciado' | 'trabalhando' | 'em_pausa' | 'finalizado'>('nao_iniciado');

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Mock data for today's stats
  const horasTrabalhadasHoje = "05:30";
  const previsaoSaida = "18:00";
  const saldoBancoHoras = "+50h 15m";
  const saldoPositivo = true;

  const getNextAction = () => {
    switch (estadoAtual) {
      case 'nao_iniciado':
        return {
          label: 'Registrar Entrada',
          icon: Play,
          variant: 'default' as const,
          tipo: TipoRegistroPonto.ENTRADA
        };
      case 'trabalhando':
        return {
          label: 'Iniciar Pausa',
          icon: Coffee,
          variant: 'secondary' as const,
          tipo: TipoRegistroPonto.INICIO_PAUSA
        };
      case 'em_pausa':
        return {
          label: 'Finalizar Pausa',
          icon: Play,
          variant: 'default' as const,
          tipo: TipoRegistroPonto.FIM_PAUSA
        };
      case 'finalizado':
        return null;
      default:
        return null;
    }
  };

  const canRegisterSaida = estadoAtual === 'trabalhando';

  const handleRegistrarPonto = (tipo: TipoRegistroPonto) => {
    const novoRegistro: RegistroPonto = {
      id: Date.now().toString(),
      tipo,
      dataHora: new Date()
    };

    setRegistros([...registros, novoRegistro]);

    // Update estado based on the type of registro
    switch (tipo) {
      case TipoRegistroPonto.ENTRADA:
        setEstadoAtual('trabalhando');
        break;
      case TipoRegistroPonto.INICIO_PAUSA:
        setEstadoAtual('em_pausa');
        break;
      case TipoRegistroPonto.FIM_PAUSA:
        setEstadoAtual('trabalhando');
        break;
      case TipoRegistroPonto.SAIDA:
        setEstadoAtual('finalizado');
        break;
    }
  };

  const nextAction = getNextAction();

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTipoLabel = (tipo: TipoRegistroPonto) => {
    switch (tipo) {
      case TipoRegistroPonto.ENTRADA:
        return 'Entrada';
      case TipoRegistroPonto.SAIDA:
        return 'Saída';
      case TipoRegistroPonto.INICIO_PAUSA:
        return 'Início Pausa';
      case TipoRegistroPonto.FIM_PAUSA:
        return 'Fim Pausa';
    }
  };

  const getTipoBadgeVariant = (tipo: TipoRegistroPonto) => {
    switch (tipo) {
      case TipoRegistroPonto.ENTRADA:
        return 'default';
      case TipoRegistroPonto.SAIDA:
        return 'destructive';
      case TipoRegistroPonto.INICIO_PAUSA:
        return 'secondary';
      case TipoRegistroPonto.FIM_PAUSA:
        return 'outline';
      default:
        return 'default';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Olá, {usuario?.nome.split(' ')[0]}! 👋
        </h1>
        <p className="text-lg text-muted-foreground mt-1">
          {formatDate(currentTime)}
        </p>
      </div>

      {/* Main Clock Card */}
      <Card className="bg-gradient-to-br from-white to-muted/20 shadow-xl border-0">
        <CardContent className="pt-6">
          <div className="text-center space-y-6">
            {/* Current Time Display */}
            <div>
              <div className="text-6xl font-bold text-foreground font-mono tracking-tight">
                {formatTime(currentTime)}
              </div>
              <p className="text-muted-foreground mt-2">
                Horário atual
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              {nextAction && (
                <Button
                  onClick={() => handleRegistrarPonto(nextAction.tipo)}
                  size="lg"
                  variant={nextAction.variant}
                  className="w-full sm:w-auto h-14 text-lg px-8"
                >
                  <nextAction.icon className="w-5 h-5 mr-3" />
                  {nextAction.label}
                </Button>
              )}

              {canRegisterSaida && (
                <Button
                  onClick={() => handleRegistrarPonto(TipoRegistroPonto.SAIDA)}
                  size="lg"
                  variant="destructive"
                  className="w-full sm:w-auto h-14 text-lg px-8"
                >
                  <Square className="w-5 h-5 mr-3" />
                  Registrar Saída
                </Button>
              )}
            </div>

            {estadoAtual === 'finalizado' && (
              <div className="flex items-center justify-center text-success">
                <CheckCircle2 className="w-5 h-5 mr-2" />
                <span>Expediente finalizado!</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Horas Hoje</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{horasTrabalhadasHoje}</div>
            <p className="text-xs text-muted-foreground">
              Trabalhadas até agora
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Previsão Saída</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{previsaoSaida}</div>
            <p className="text-xs text-muted-foreground">
              Com base na jornada
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Banco de Horas</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${saldoPositivo ? 'text-success' : 'text-danger'}`}>
              {saldoBancoHoras}
            </div>
            <p className="text-xs text-muted-foreground">
              Saldo acumulado
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Today's Timeline */}
      {registros.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Registros de Hoje</CardTitle>
            <CardDescription>
              Sua linha do tempo de registros de ponto
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {registros.map((registro, index) => (
                <div key={registro.id} className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="flex-1 flex justify-between items-center">
                    <div>
                      <Badge variant={getTipoBadgeVariant(registro.tipo)}>
                        {getTipoLabel(registro.tipo)}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground font-mono">
                      {formatTime(registro.dataHora)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EmployeeDashboard;