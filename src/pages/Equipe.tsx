import React, { useMemo, useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Users, Clock, UserCheck, UserX } from 'lucide-react';

interface Funcionario {
  id: string;
  nome: string;
  cargo: string;
  status: 'trabalhando' | 'em_pausa' | 'ausente' | 'finalizado';
}

const Equipe = () => {
  const [busca, setBusca] = useState('');

  useEffect(() => {
    document.title = 'Equipe | PontoMax';
  }, []);

  const equipe: Funcionario[] = [
    { id: '1', nome: 'Jean Rufino', cargo: 'Desenvolvedor', status: 'trabalhando' },
    { id: '2', nome: 'Ana Silva', cargo: 'Designer', status: 'em_pausa' },
    { id: '3', nome: 'Carlos Santos', cargo: 'Analista RH', status: 'trabalhando' },
    { id: '4', nome: 'Maria Oliveira', cargo: 'Suporte', status: 'ausente' },
  ];

  const filtrados = useMemo(() =>
    equipe.filter(f => f.nome.toLowerCase().includes(busca.toLowerCase())),
    [busca]
  );

  const statusBadge = (s: Funcionario['status']) => {
    const map: Record<Funcionario['status'], { label: string; cls: string; icon: React.ReactNode } > = {
      trabalhando: { label: 'Trabalhando', cls: 'bg-success text-success-foreground', icon: <Clock className="w-4 h-4" /> },
      em_pausa:    { label: 'Em Pausa', cls: '', icon: <Clock className="w-4 h-4" /> },
      ausente:     { label: 'Ausente', cls: 'bg-destructive text-destructive-foreground', icon: <UserX className="w-4 h-4" /> },
      finalizado:  { label: 'Finalizado', cls: 'border', icon: <UserCheck className="w-4 h-4" /> },
    };
    const it = map[s];
    return <Badge className={it.cls}>{it.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Equipe / Funcionários</h1>
        <p className="text-lg text-muted-foreground mt-1">Pesquise e acompanhe sua equipe em tempo real</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><Users className="w-5 h-5 mr-2" /> Funcionários</CardTitle>
          <CardDescription>Lista de colaboradores gerenciados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 mb-4">
            <div className="flex-1">
              <Input placeholder="Buscar por nome" value={busca} onChange={(e) => setBusca(e.target.value)} />
            </div>
            <Button variant="secondary"><Search className="w-4 h-4 mr-2" />Buscar</Button>
          </div>

          <div className="space-y-2">
            <div className="grid grid-cols-12 gap-4 text-sm text-muted-foreground font-medium border-b pb-2">
              <div className="col-span-5">Nome</div>
              <div className="col-span-3">Cargo</div>
              <div className="col-span-3">Status</div>
              <div className="col-span-1 text-right">Ação</div>
            </div>

            {filtrados.map(f => (
              <div key={f.id} className="grid grid-cols-12 gap-4 items-center py-3 border-b border-border/50 hover:bg-muted/20 rounded-lg px-2 -mx-2 transition-colors">
                <div className="col-span-5 font-medium">{f.nome}</div>
                <div className="col-span-3">{f.cargo}</div>
                <div className="col-span-3 flex items-center gap-2">{statusBadge(f.status)}</div>
                <div className="col-span-1 text-right">
                  <Button size="sm" variant="outline">Ver</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Equipe;
