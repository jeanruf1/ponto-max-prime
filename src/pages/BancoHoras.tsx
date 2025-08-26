import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Filter } from 'lucide-react';

interface Linha {
  funcionario: string;
  saldo: number; // horas em minutos
  creditosMes: number;
  debitosMes: number;
}

const formatSaldo = (m: number) => {
  const sign = m >= 0 ? '+' : '-';
  const abs = Math.abs(m);
  const h = Math.floor(abs / 60);
  const min = abs % 60;
  return `${sign}${h}h ${min.toString().padStart(2, '0')}m`;
};

const BancoHoras = () => {
  const [filtro, setFiltro] = useState<'todos'|'positivos'|'negativos'|'zerados'>('todos');
  useEffect(() => { document.title = 'Banco de Horas | PontoMax'; }, []);

  const linhas: Linha[] = [
    { funcionario: 'Jean Rufino', saldo: 3015, creditosMes: 320, debitosMes: 25 },
    { funcionario: 'Ana Silva', saldo: -120, creditosMes: 40, debitosMes: 160 },
    { funcionario: 'Carlos Santos', saldo: 0, creditosMes: 60, debitosMes: 60 },
  ];

  const filtradas = useMemo(() => {
    return linhas.filter(l => {
      if (filtro === 'positivos') return l.saldo > 0;
      if (filtro === 'negativos') return l.saldo < 0;
      if (filtro === 'zerados') return l.saldo === 0;
      return true;
    });
  }, [filtro]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Gestão do Banco de Horas</h1>
        <p className="text-lg text-muted-foreground mt-1">Acompanhe saldos e movimentações</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><TrendingUp className="w-5 h-5 mr-2"/>Banco de Horas</CardTitle>
          <CardDescription>Filtre os saldos por status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Button variant={filtro==='todos'?'default':'outline'} onClick={() => setFiltro('todos')}>Todos</Button>
            <Button variant={filtro==='positivos'?'default':'outline'} onClick={() => setFiltro('positivos')}>Positivos</Button>
            <Button variant={filtro==='negativos'?'default':'outline'} onClick={() => setFiltro('negativos')}>Negativos</Button>
            <Button variant={filtro==='zerados'?'default':'outline'} onClick={() => setFiltro('zerados')}>Zerados</Button>
            <Button variant="secondary" className="ml-auto"><Filter className="w-4 h-4 mr-2"/>Filtros</Button>
          </div>

          <div className="space-y-2">
            <div className="grid grid-cols-12 gap-4 text-sm text-muted-foreground font-medium border-b pb-2">
              <div className="col-span-5">Funcionário</div>
              <div className="col-span-3">Saldo Atual</div>
              <div className="col-span-2">Créditos Mês</div>
              <div className="col-span-2">Débitos Mês</div>
            </div>
            {filtradas.map(l => (
              <div key={l.funcionario} className="grid grid-cols-12 gap-4 items-center py-3 border-b border-border/50 hover:bg-muted/20 rounded-lg px-2 -mx-2 transition-colors">
                <div className="col-span-5 font-medium">{l.funcionario}</div>
                <div className="col-span-3 font-mono font-bold">
                  <span className={l.saldo>0? 'text-success': l.saldo<0? 'text-danger': 'text-muted-foreground'}>
                    {formatSaldo(l.saldo)}
                  </span>
                </div>
                <div className="col-span-2 font-mono">{formatSaldo(l.creditosMes)}</div>
                <div className="col-span-2 font-mono">{formatSaldo(l.debitosMes)}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BancoHoras;
