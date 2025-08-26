import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Send, Settings, Calendar, Loader2 } from 'lucide-react';

const Fechamento = () => {
  const [periodo, setPeriodo] = useState('2024-08');
  const [step, setStep] = useState<1|2|3|4>(1);
  const [processing, setProcessing] = useState(false);

  useEffect(() => { document.title = 'Fechamento | PontoMax'; }, []);

  const next = async () => {
    if (step === 2) {
      setProcessing(true);
      setTimeout(() => { setProcessing(false); setStep(3); }, 1200);
      return;
    }
    setStep((s) => (Math.min(4, (s + 1)) as any));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Fechamento e Holerites</h1>
        <p className="text-lg text-muted-foreground mt-1">Fluxo passo a passo para gerar e enviar holerites</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><Calendar className="w-5 h-5 mr-2"/>Passo {step}</CardTitle>
          <CardDescription>
            {step===1 && 'Selecione o mês/ano de referência.'}
            {step===2 && 'Revise os saldos do banco de horas e selecione funcionários.'}
            {step===3 && 'Revise os holerites gerados.'}
            {step===4 && 'Envie os holerites selecionados.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {step===1 && (
            <div className="flex gap-4 items-end">
              <div className="w-64">
                <label className="text-sm font-medium mb-2 block">Mês/Ano</label>
                <Select value={periodo} onValueChange={setPeriodo}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024-08">Agosto 2024</SelectItem>
                    <SelectItem value="2024-07">Julho 2024</SelectItem>
                    <SelectItem value="2024-06">Junho 2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={next}><Settings className="w-4 h-4 mr-2"/>Avançar</Button>
            </div>
          )}

          {step===2 && (
            <div>
              <div className="grid grid-cols-12 gap-4 text-sm text-muted-foreground font-medium border-b pb-2">
                <div className="col-span-6">Funcionário</div>
                <div className="col-span-3">Saldo Banco</div>
                <div className="col-span-3">Selecionado</div>
              </div>
              {[{n:'Jean Rufino', s:'+50h 15m'}, {n:'Ana Silva', s:'-02h 00m'}].map((l) => (
                <div key={l.n} className="grid grid-cols-12 gap-4 items-center py-3 border-b border-border/50">
                  <div className="col-span-6">{l.n}</div>
                  <div className="col-span-3">{l.s}</div>
                  <div className="col-span-3">✔️</div>
                </div>
              ))}
              <div className="mt-4">
                <Button onClick={next} disabled={processing}>
                  {processing ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin"/>Gerando...</>) : (<><CheckCircle2 className="w-4 h-4 mr-2"/>Gerar Holerites</>)}
                </Button>
              </div>
            </div>
          )}

          {step===3 && (
            <div>
              <div className="mb-4">Holerites gerados: 2 • Status: <span className="font-medium">Gerado</span></div>
              <Progress value={70} />
              <div className="mt-4">
                <Button onClick={next}><Send className="w-4 h-4 mr-2"/>Enviar Selecionados</Button>
              </div>
            </div>
          )}

          {step===4 && (
            <div className="text-success font-medium">Holerites enviados com sucesso!</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Fechamento;
