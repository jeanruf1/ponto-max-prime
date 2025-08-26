import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Check, X } from 'lucide-react';

interface Ajuste {
  id: string;
  colaborador: string;
  data: string;
  tipo: 'Entrada' | 'Saída' | 'Início Pausa' | 'Fim Pausa';
  motivo: string;
  status: 'Pendente' | 'Aprovado' | 'Rejeitado';
}

const AjustesPendentes = () => {
  const [ajustes, setAjustes] = useState<Ajuste[]>([
    { id: '1', colaborador: 'Ana Silva', data: '2024-08-26 08:05', tipo: 'Entrada', motivo: 'Trânsito pesado', status: 'Pendente' },
    { id: '2', colaborador: 'Carlos Santos', data: '2024-08-25 12:00', tipo: 'Início Pausa', motivo: 'Emergência', status: 'Pendente' },
  ]);

  useEffect(() => { document.title = 'Ajustes Pendentes | PontoMax'; }, []);

  const updateStatus = (id: string, status: Ajuste['status']) => {
    setAjustes(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  const badge = (s: Ajuste['status']) => {
    const map: Record<Ajuste['status'], any> = {
      Pendente: <Badge variant="secondary">Pendente</Badge>,
      Aprovado: <Badge> Aprovado</Badge>,
      Rejeitado: <Badge variant="destructive">Rejeitado</Badge>,
    };
    return map[s];
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Revisar Ajustes Pendentes</h1>
        <p className="text-lg text-muted-foreground mt-1">Aprovar ou rejeitar solicitações de ajuste</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><AlertTriangle className="w-5 h-5 mr-2"/>Solicitações</CardTitle>
          <CardDescription>Processar ajustes enviados pelos colaboradores</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="grid grid-cols-12 gap-4 text-sm text-muted-foreground font-medium border-b pb-2">
              <div className="col-span-3">Colaborador</div>
              <div className="col-span-3">Data/Registro</div>
              <div className="col-span-2">Tipo</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2 text-right">Ação</div>
            </div>
            {ajustes.map(a => (
              <div key={a.id} className="grid grid-cols-12 gap-4 items-center py-3 border-b border-border/50">
                <div className="col-span-3 font-medium">{a.colaborador}
                  <div className="text-xs text-muted-foreground">{a.motivo}</div>
                </div>
                <div className="col-span-3">{a.data}</div>
                <div className="col-span-2">{a.tipo}</div>
                <div className="col-span-2">{badge(a.status)}</div>
                <div className="col-span-2 flex justify-end gap-2">
                  <Button size="sm" variant="outline" onClick={() => updateStatus(a.id, 'Aprovado')}><Check className="w-4 h-4 mr-1"/>Aprovar</Button>
                  <Button size="sm" variant="destructive" onClick={() => updateStatus(a.id, 'Rejeitado')}><X className="w-4 h-4 mr-1"/>Rejeitar</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AjustesPendentes;
