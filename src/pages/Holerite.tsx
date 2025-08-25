import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Download,
  DollarSign,
  FileText,
  Calendar,
  Eye
} from 'lucide-react';

interface ItemHolerite {
  descricao: string;
  referencia?: string;
  valor: number;
  tipo: 'vencimento' | 'desconto';
}

interface Holerite {
  mes: number;
  ano: number;
  status: 'Gerado' | 'Enviado' | 'Visualizado';
  salarioBase: number;
  totalVencimentos: number;
  totalDescontos: number;
  valorLiquido: number;
  itens: ItemHolerite[];
}

const Holerite = () => {
  const [periodoSelecionado, setPeriodoSelecionado] = useState('2024-08');

  const holerites: Holerite[] = [
    {
      mes: 8,
      ano: 2024,
      status: 'Visualizado',
      salarioBase: 5000.00,
      totalVencimentos: 5250.00,
      totalDescontos: 1575.00,
      valorLiquido: 3675.00,
      itens: [
        { descricao: 'Salário Base', valor: 5000.00, tipo: 'vencimento' },
        { descricao: 'Horas Extras Banco', referencia: '5h 15m', valor: 250.00, tipo: 'vencimento' },
        { descricao: 'INSS', referencia: '8%', valor: -420.00, tipo: 'desconto' },
        { descricao: 'IRRF', referencia: '15%', valor: -787.50, tipo: 'desconto' },
        { descricao: 'FGTS', referencia: '8%', valor: -420.00, tipo: 'desconto' },
        { descricao: 'Vale Transporte', valor: -132.00, tipo: 'desconto' },
        { descricao: 'Faltas Banco', referencia: '2h 30m', valor: -62.50, tipo: 'desconto' }
      ]
    },
    {
      mes: 7,
      ano: 2024,
      status: 'Visualizado',
      salarioBase: 5000.00,
      totalVencimentos: 5000.00,
      totalDescontos: 1520.00,
      valorLiquido: 3480.00,
      itens: [
        { descricao: 'Salário Base', valor: 5000.00, tipo: 'vencimento' },
        { descricao: 'INSS', referencia: '8%', valor: -400.00, tipo: 'desconto' },
        { descricao: 'IRRF', referencia: '15%', valor: -750.00, tipo: 'desconto' },
        { descricao: 'FGTS', referencia: '8%', valor: -400.00, tipo: 'desconto' },
        { descricao: 'Vale Transporte', valor: -132.00, tipo: 'desconto' }
      ]
    }
  ];

  const getCurrentHolerite = () => {
    const [ano, mes] = periodoSelecionado.split('-');
    return holerites.find(h => h.ano === parseInt(ano) && h.mes === parseInt(mes));
  };

  const holerite = getCurrentHolerite();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(Math.abs(value));
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'Gerado': 'secondary',
      'Enviado': 'default',
      'Visualizado': 'outline'
    } as const;
    
    return <Badge variant={variants[status as keyof typeof variants]}>{status}</Badge>;
  };

  const getMesNome = (mes: number) => {
    const meses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return meses[mes - 1];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Meu Holerite 💰
        </h1>
        <p className="text-lg text-muted-foreground mt-1">
          Consulte e baixe seus holerites mensais
        </p>
      </div>

      {/* Period Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Selecionar Período
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Mês/Ano</label>
              <Select value={periodoSelecionado} onValueChange={setPeriodoSelecionado}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024-08">Agosto 2024</SelectItem>
                  <SelectItem value="2024-07">Julho 2024</SelectItem>
                  <SelectItem value="2024-06">Junho 2024</SelectItem>
                  <SelectItem value="2024-05">Maio 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {holerite && (
              <Button>
                <Eye className="w-4 h-4 mr-2" />
                Visualizar
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Holerite Display */}
      {holerite ? (
        <div className="space-y-6">
          {/* Header Information */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">
                    Holerite - {getMesNome(holerite.mes)}/{holerite.ano}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    Jean Rufino • PontoMax Tecnologia LTDA
                  </CardDescription>
                </div>
                <div className="text-right space-y-2">
                  {getStatusBadge(holerite.status)}
                  <div>
                    <Button size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Baixar PDF
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Holerite Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Vencimentos */}
            <Card>
              <CardHeader className="bg-success/5">
                <CardTitle className="text-success flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Vencimentos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                {holerite.itens
                  .filter(item => item.tipo === 'vencimento')
                  .map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2">
                      <div>
                        <div className="font-medium">{item.descricao}</div>
                        {item.referencia && (
                          <div className="text-sm text-muted-foreground">{item.referencia}</div>
                        )}
                      </div>
                      <div className="font-mono font-bold text-success">
                        {formatCurrency(item.valor)}
                      </div>
                    </div>
                  ))
                }
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Total Vencimentos:</span>
                    <span className="text-success">{formatCurrency(holerite.totalVencimentos)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Descontos */}
            <Card>
              <CardHeader className="bg-danger/5">
                <CardTitle className="text-danger flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Descontos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                {holerite.itens
                  .filter(item => item.tipo === 'desconto')
                  .map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2">
                      <div>
                        <div className="font-medium">{item.descricao}</div>
                        {item.referencia && (
                          <div className="text-sm text-muted-foreground">{item.referencia}</div>
                        )}
                      </div>
                      <div className="font-mono font-bold text-danger">
                        {formatCurrency(item.valor)}
                      </div>
                    </div>
                  ))
                }
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Total Descontos:</span>
                    <span className="text-danger">{formatCurrency(holerite.totalDescontos)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Valor Líquido */}
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <div className="text-sm text-muted-foreground font-medium">VALOR LÍQUIDO A RECEBER</div>
                <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {formatCurrency(holerite.valorLiquido)}
                </div>
                <div className="text-sm text-muted-foreground">
                  Crédito em conta corrente
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Holerite não encontrado</h3>
            <p className="text-muted-foreground">
              Não há holerite disponível para o período selecionado.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Holerite;