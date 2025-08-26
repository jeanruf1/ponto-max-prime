import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Building2, Users, Settings, Calendar, Shield } from 'lucide-react';

const Configuracoes = () => {
  const [tab, setTab] = useState('geral');
  useEffect(() => { document.title = 'Configurações | PontoMax'; }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
        <p className="text-lg text-muted-foreground mt-1">Preferências e administração</p>
      </div>

      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList>
          <TabsTrigger value="geral"><Settings className="w-4 h-4 mr-2"/>Geral</TabsTrigger>
          <TabsTrigger value="unidades"><Building2 className="w-4 h-4 mr-2"/>Unidades</TabsTrigger>
          <TabsTrigger value="equipes"><Users className="w-4 h-4 mr-2"/>Equipes</TabsTrigger>
          <TabsTrigger value="politicas"><Shield className="w-4 h-4 mr-2"/>Políticas</TabsTrigger>
          <TabsTrigger value="escalas"><Calendar className="w-4 h-4 mr-2"/>Escalas</TabsTrigger>
        </TabsList>

        <TabsContent value="geral">
          <Card>
            <CardHeader>
              <CardTitle>Preferências Gerais</CardTitle>
              <CardDescription>Configurações básicas do sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline">Salvar</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unidades">
          <Card>
            <CardHeader>
              <CardTitle>Unidades</CardTitle>
              <CardDescription>Gerencie suas unidades (CRUD mock)</CardDescription>
            </CardHeader>
            <CardContent>
              <Button>Nova Unidade</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="equipes">
          <Card>
            <CardHeader>
              <CardTitle>Equipes</CardTitle>
              <CardDescription>Crie e organize equipes</CardDescription>
            </CardHeader>
            <CardContent>
              <Button>Nova Equipe</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="politicas">
          <Card>
            <CardHeader>
              <CardTitle>Políticas Gerais</CardTitle>
              <CardDescription>Defina tolerâncias e arredondamentos</CardDescription>
            </CardHeader>
            <CardContent>
              <Button>Nova Política</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="escalas">
          <Card>
            <CardHeader>
              <CardTitle>Escalas de Trabalho</CardTitle>
              <CardDescription>Defina jornadas e associações</CardDescription>
            </CardHeader>
            <CardContent>
              <Button>Nova Escala</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Configuracoes;
