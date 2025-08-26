import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { User, Save } from 'lucide-react';

const Perfil = () => {
  const { usuario } = useAuth();
  const [nome, setNome] = useState(usuario?.nome || '');
  const [senha, setSenha] = useState('');

  useEffect(() => { document.title = 'Perfil | PontoMax'; }, []);

  const handleSalvar = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock save
    alert('Perfil salvo com sucesso!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Meu Perfil</h1>
        <p className="text-lg text-muted-foreground mt-1">Informações da conta</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><User className="w-5 h-5 mr-2"/>Dados do Usuário</CardTitle>
          <CardDescription>Atualize suas informações básicas</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSalvar} className="space-y-4 max-w-xl">
            <div>
              <Label>Nome</Label>
              <Input value={nome} onChange={(e) => setNome(e.target.value)} />
            </div>
            <div>
              <Label>E-mail</Label>
              <Input value={usuario?.email} disabled />
            </div>
            <div>
              <Label>Nova senha</Label>
              <Input type="password" placeholder="••••••" value={senha} onChange={(e) => setSenha(e.target.value)} />
            </div>
            <Button type="submit"><Save className="w-4 h-4 mr-2"/>Salvar</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Perfil;
