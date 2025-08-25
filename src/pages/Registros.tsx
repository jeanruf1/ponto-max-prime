import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar,
  Clock,
  Search,
  FileText,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface RegistroDetalhado {
  data: string;
  entrada?: string;
  inicioAlmoco?: string;
  fimAlmoco?: string;
  saida?: string;
  totalTrabalhado: string;
  horasExtras: string;
  debito: string;
  status: 'Fechado' | 'Aberto';
}

const Registros = () => {
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [mesAno, setMesAno] = useState('2024-08');

  const registros: RegistroDetalhado[] = [
    {
      data: '2024-08-26',
      entrada: '08:00',
      inicioAlmoco: '12:00',
      fimAlmoco: '13:00',
      saida: '17:00',
      totalTrabalhado: '08:00',
      horasExtras: '00:00',
      debito: '00:00',
      status: 'Fechado'
    },
    {
      data: '2024-08-25',
      entrada: '08:15',
      inicioAlmoco: '12:00',
      fimAlmoco: '13:00',
      saida: '17:30',
      totalTrabalhado: '08:15',
      horasExtras: '00:15',
      debito: '00:00',
      status: 'Fechado'
    },
    {
      data: '2024-08-24',
      entrada: '08:30',
      inicioAlmoco: '12:00',
      fimAlmoco: '13:00',
      saida: '17:00',
      totalTrabalhado: '07:30',
      horasExtras: '00:00',
      debito: '00:30',
      status: 'Fechado'
    },
    {
      data: '2024-08-23',
      entrada: '08:00',
      inicioAlmoco: '12:00',
      fimAlmoco: '13:00',
      totalTrabalhado: '05:30',
      horasExtras: '00:00',
      debito: '00:00',
      status: 'Aberto'
    }
  ];

  const toggleRow = (data: string) => {
    setExpandedRows(prev => 
      prev.includes(data) 
        ? prev.filter(d => d !== data)
        : [...prev, data]
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    return (
      <Badge variant={status === 'Fechado' ? 'outline' : 'default'}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Meus Registros 📋
        </h1>
        <p className="text-lg text-muted-foreground mt-1">
          Visualize e gerencie seus registros de ponto
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="w-5 h-5 mr-2" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Período</label>
              <Input
                type="month"
                value={mesAno}
                onChange={(e) => setMesAno(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex items-end">
              <Button>
                <Search className="w-4 h-4 mr-2" />
                Buscar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Registros Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Registros do Período
          </CardTitle>
          <CardDescription>
            Clique em uma linha para ver os detalhes dos registros do dia
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {/* Header */}
            <div className="grid grid-cols-12 gap-4 font-medium text-sm text-muted-foreground border-b pb-3">
              <div className="col-span-3">Data</div>
              <div className="col-span-2">Total Trabalhado</div>
              <div className="col-span-2">Horas Extras</div>
              <div className="col-span-2">Débito</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-1"></div>
            </div>

            {/* Rows */}
            {registros.map((registro) => (
              <div key={registro.data} className="space-y-2">
                {/* Main Row */}
                <div 
                  className="grid grid-cols-12 gap-4 items-center py-3 hover:bg-muted/20 rounded-lg px-2 -mx-2 cursor-pointer transition-colors"
                  onClick={() => toggleRow(registro.data)}
                >
                  <div className="col-span-3">
                    <div className="font-medium">{formatDate(registro.data)}</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(registro.data).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                  
                  <div className="col-span-2">
                    <div className="font-mono font-medium">{registro.totalTrabalhado}</div>
                  </div>
                  
                  <div className="col-span-2">
                    <div className={`font-mono font-medium ${registro.horasExtras !== '00:00' ? 'text-success' : ''}`}>
                      {registro.horasExtras}
                    </div>
                  </div>
                  
                  <div className="col-span-2">
                    <div className={`font-mono font-medium ${registro.debito !== '00:00' ? 'text-danger' : ''}`}>
                      {registro.debito}
                    </div>
                  </div>
                  
                  <div className="col-span-2">
                    {getStatusBadge(registro.status)}
                  </div>
                  
                  <div className="col-span-1 flex justify-end">
                    {expandedRows.includes(registro.data) ? (
                      <ChevronUp className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedRows.includes(registro.data) && (
                  <div className="ml-4 p-4 bg-muted/10 rounded-lg border-l-4 border-primary">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-muted-foreground">Entrada</div>
                        <div className="font-mono text-lg">
                          {registro.entrada || '-'}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-muted-foreground">Início Almoço</div>
                        <div className="font-mono text-lg">
                          {registro.inicioAlmoco || '-'}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-muted-foreground">Fim Almoço</div>
                        <div className="font-mono text-lg">
                          {registro.fimAlmoco || '-'}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-muted-foreground">Saída</div>
                        <div className="font-mono text-lg">
                          {registro.saida || '-'}
                        </div>
                      </div>
                    </div>
                    
                    {registro.status === 'Aberto' && (
                      <div className="mt-4 pt-4 border-t flex justify-end">
                        <Button variant="outline" size="sm">
                          <FileText className="w-4 h-4 mr-2" />
                          Solicitar Ajuste
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-6 pt-6 border-t bg-muted/5 p-4 rounded-lg">
            <h4 className="font-medium mb-4">Resumo do Período</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">160h 30m</div>
                <div className="text-sm text-muted-foreground">Total Trabalhado</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-success">+5h 15m</div>
                <div className="text-sm text-muted-foreground">Horas Extras</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-danger">-2h 30m</div>
                <div className="text-sm text-muted-foreground">Débitos</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Registros;