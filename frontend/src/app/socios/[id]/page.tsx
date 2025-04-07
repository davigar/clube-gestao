'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import Card from '@/components/ui/Card';
import { FaSave, FaArrowLeft, FaTrash, FaUser, FaEnvelope, FaPhone, FaIdCard, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';

interface UserEditPageProps {
  params: {
    id: string;
  };
}

export default function SocioEditPage({ params }: UserEditPageProps) {
  const router = useRouter();
  
  // Estado para armazenar os dados do sócio
  const [user, setUser] = useState({
    id: 0,
    name: '',
    email: '',
    phone: '',
    phone2: '',
    cpf: '',
    rg: '',
    gender: 'nao_informado',
    birthDate: '',
    age: '',
    studyPeriod: 'nao',
    schoolName: '',
    fatherName: '',
    motherName: '',
    hasMedicalInsurance: false,
    medicalInsuranceName: '',
    role: 'member',
    status: 'active',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'Brasil',
    },
    memberSince: '',
    createdAt: '',
    deactivatedAt: '',
    lastPayment: '',
    membershipType: 'standard',
    mainMemberId: null,
  });

  // Estado para controlar o carregamento
  const [loading, setLoading] = useState(true);
  
  // Estado para controlar mensagens de erro/sucesso
  const [message, setMessage] = useState({ type: '', text: '' });

  // Função para carregar os dados do usuário
  useEffect(() => {
    // Simulando uma chamada à API
    const fetchUser = async () => {
      setLoading(true);
      const socioId = params.id;
      try {
        // Em um cenário real, isso seria uma chamada à API
        // const response = await fetch(`/api/socios/${socioId}`);
        // const data = await response.json();
        
        // Dados simulados para demonstração
        const mockUsers = [
          { 
            id: 1, 
            name: 'João Silva', 
            email: 'joao@exemplo.com', 
            phone: '(11) 98765-4321',
            cpf: '123.456.789-00',
            age: '35',
            role: 'member', 
            status: 'active',
            address: {
              street: 'Rua das Flores, 123',
              city: 'São Paulo',
              state: 'SP',
              zipCode: '01234-567',
              country: 'Brasil',
            },
            memberSince: '15/03/2023',
            createdAt: '15/03/2023',
            deactivatedAt: '',
            lastPayment: '10/04/2023',
            membershipType: 'standard',
            mainMemberId: null,
          },
          { 
            id: 2, 
            name: 'Maria Oliveira', 
            email: 'maria@exemplo.com', 
            phone: '(11) 91234-5678',
            cpf: '987.654.321-00',
            age: '28',
            role: 'member', 
            status: 'active',
            address: {
              street: 'Av. Paulista, 1000',
              city: 'São Paulo',
              state: 'SP',
              zipCode: '01310-100',
              country: 'Brasil',
            },
            memberSince: '20/01/2023',
            createdAt: '20/01/2023',
            deactivatedAt: '',
            lastPayment: '05/04/2023',
            membershipType: 'premium',
            mainMemberId: null,
          },
          { 
            id: 3, 
            name: 'Carlos Santos', 
            email: 'carlos@exemplo.com', 
            phone: '(11) 97777-8888',
            cpf: '111.222.333-44',
            age: '42',
            role: 'instructor', 
            status: 'active',
            address: {
              street: 'Rua dos Esportes, 456',
              city: 'São Paulo',
              state: 'SP',
              zipCode: '04567-890',
              country: 'Brasil',
            },
            memberSince: '10/02/2022',
            createdAt: '10/02/2022',
            deactivatedAt: '',
            lastPayment: '15/04/2023',
            membershipType: 'instructor',
            mainMemberId: null,
          },
          { 
            id: 4, 
            name: 'Ana Souza', 
            email: 'ana@exemplo.com', 
            phone: '(11) 95555-6666',
            cpf: '444.555.666-77',
            age: '31',
            role: 'member', 
            status: 'inactive',
            address: {
              street: 'Rua das Margaridas, 789',
              city: 'São Paulo',
              state: 'SP',
              zipCode: '05678-901',
              country: 'Brasil',
            },
            memberSince: '05/06/2022',
            createdAt: '05/06/2022',
            deactivatedAt: '15/01/2023',
            lastPayment: '10/01/2023',
            membershipType: 'standard',
            mainMemberId: null,
          },
          { 
            id: 5, 
            name: 'Administrador', 
            email: 'admin@clubegestao.com', 
            phone: '(11) 99999-0000',
            cpf: '000.111.222-33',
            age: '45',
            role: 'admin', 
            status: 'active',
            address: {
              street: 'Av. Principal, 1000',
              city: 'São Paulo',
              state: 'SP',
              zipCode: '01000-000',
              country: 'Brasil',
            },
            memberSince: '01/01/2022',
            createdAt: '01/01/2022',
            deactivatedAt: '',
            lastPayment: 'N/A',
            membershipType: 'admin',
            mainMemberId: null,
          },
          { 
            id: 6, 
            name: 'Pedro Silva', 
            email: 'pedro@exemplo.com', 
            phone: '(11) 92222-3333',
            cpf: '555.666.777-88',
            age: '10',
            role: 'member', 
            status: 'active',
            address: {
              street: 'Rua das Flores, 123',
              city: 'São Paulo',
              state: 'SP',
              zipCode: '01234-567',
              country: 'Brasil',
            },
            memberSince: '15/03/2023',
            createdAt: '15/03/2023',
            deactivatedAt: '',
            lastPayment: '10/04/2023',
            membershipType: 'family',
            mainMemberId: 1,
          },
          { 
            id: 7, 
            name: 'Julia Silva', 
            email: 'julia@exemplo.com', 
            phone: '(11) 94444-5555',
            cpf: '888.999.000-11',
            age: '8',
            role: 'member', 
            status: 'active',
            address: {
              street: 'Rua das Flores, 123',
              city: 'São Paulo',
              state: 'SP',
              zipCode: '01234-567',
              country: 'Brasil',
            },
            memberSince: '15/03/2023',
            createdAt: '15/03/2023',
            deactivatedAt: '',
            lastPayment: '10/04/2023',
            membershipType: 'family',
            mainMemberId: 1,
          },
        ];
        
        const userData = mockUsers.find(u => u.id === parseInt(socioId));
        
        if (userData) {
          setUser(userData);
        } else {
          setMessage({ type: 'error', text: 'Sócio não encontrado' });
          setTimeout(() => router.push('/socios'), 2000);
        }
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
        setMessage({ type: 'error', text: 'Erro ao carregar dados do usuário' });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  // Usando 'params' como dependência em vez de 'params.id'
  }, [params, router]);

  // Função para atualizar os campos do sócio
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setUser(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev] as object,
          [child]: value
        }
      }));
    } else {
      // Para campos do tipo checkbox, usamos a propriedade checked
      const fieldValue = type === 'checkbox' ? checked : value;
      setUser(prev => ({ ...prev, [name]: fieldValue }));
    }
  };

  // Função para salvar as alterações
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Simulando uma chamada à API
      // Em um cenário real, isso seria uma chamada à API
      // const response = await fetch(`/api/users/${id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(user)
      // });
      
      // Simulando um atraso de rede
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage({ type: 'success', text: 'Sócio atualizado com sucesso!' });
      
      // Redirecionar após salvar
      setTimeout(() => router.push('/socios'), 2000);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      setMessage({ type: 'error', text: 'Erro ao atualizar usuário' });
    }
  };

  // Função para excluir o usuário
  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita.')) {
      try {
        // Simulando uma chamada à API
        // Em um cenário real, isso seria uma chamada à API
        // const response = await fetch(`/api/users/${id}`, {
        //   method: 'DELETE'
        // });
        
        // Simulando um atraso de rede
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setMessage({ type: 'success', text: 'Sócio excluído com sucesso!' });
        
        // Redirecionar após excluir
        setTimeout(() => router.push('/socios'), 2000);
      } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        setMessage({ type: 'error', text: 'Erro ao excluir usuário' });
      }
    }
  };

  // Função para voltar à página anterior
  const handleBack = () => {
    router.back();
  };

  // Renderização condicional durante o carregamento
  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Editar Sócio</h1>
          <p className="text-gray-600">ID: {id}</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={handleBack}
            className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Voltar
          </button>
          <a 
            href={`/users/${id}/view`}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <FaUser className="mr-2" />
            Visualizar
          </a>
          <button 
            onClick={handleDelete}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            <FaTrash className="mr-2" />
            Excluir
          </button>
        </div>
      </div>

      {/* Mensagem de sucesso/erro */}
      {message.text && (
        <div className={`mb-6 p-4 rounded-md ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna da esquerda - Informações básicas */}
          <div className="lg:col-span-1">
            <Card>
              <div className="p-6 flex flex-col items-center">
                <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center mb-4">
                  <FaUser className="text-gray-600" size={64} />
                </div>
                
                <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
                <p className="text-gray-600 mb-4">{user.email}</p>
                
                <div className="w-full mt-4">
                  <div className="flex items-center mb-3">
                    <FaIdCard className="text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">Membro desde {user.memberSince}</span>
                  </div>
                  <div className="flex items-center">
                    <FaCalendarAlt className="text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">Último pagamento: {user.lastPayment}</span>
                  </div>
                </div>
                
                <button 
                  type="button"
                  className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Alterar Foto
                </button>
              </div>
            </Card>
          </div>
          
          {/* Coluna da direita - Formulário de edição */}
          <div className="lg:col-span-2">
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Informações Pessoais</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={user.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaEnvelope className="text-gray-400" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={user.email}
                          onChange={handleChange}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Telefone
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaPhone className="text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          value={user.phone}
                          onChange={handleChange}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CPF
                      </label>
                      <input
                        type="text"
                        name="cpf"
                        value={user.cpf}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="000.000.000-00"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Idade
                      </label>
                      <input
                        type="number"
                        name="age"
                        value={user.age}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="0"
                        max="120"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Função
                      </label>
                      <select
                        name="role"
                        value={user.role}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="member">Membro</option>
                        <option value="instructor">Instrutor</option>
                        <option value="admin">Administrador</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <select
                        name="status"
                        value={user.status}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="active">Ativo</option>
                        <option value="inactive">Inativo</option>
                        <option value="pending">Pendente</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tipo de Associação
                      </label>
                      <select
                        name="membershipType"
                        value={user.membershipType}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="standard">Padrão</option>
                        <option value="premium">Premium</option>
                        <option value="family">Família</option>
                        <option value="instructor">Instrutor</option>
                        <option value="admin">Administrador</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Membro Titular
                      </label>
                      <select
                        name="mainMemberId"
                        value={user.mainMemberId || ''}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={user.membershipType !== 'family'}
                      >
                        <option value="">Selecione um membro titular</option>
                        <option value="1">João Silva</option>
                        <option value="2">Maria Oliveira</option>
                        <option value="3">Carlos Santos</option>
                      </select>
                      <p className="text-xs text-gray-500 mt-1">
                        {user.membershipType !== 'family' ? 'Disponível apenas para membros do tipo Família' : ''}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Data de Inclusão
                      </label>
                      <input
                        type="date"
                        name="createdAt"
                        value={user.createdAt ? new Date(user.createdAt.split('/').reverse().join('-')).toISOString().split('T')[0] : ''}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Data de Início
                      </label>
                      <input
                        type="date"
                        name="memberSince"
                        value={user.memberSince ? new Date(user.memberSince.split('/').reverse().join('-')).toISOString().split('T')[0] : ''}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Data de Desativação
                      </label>
                      <input
                        type="date"
                        name="deactivatedAt"
                        value={user.deactivatedAt ? new Date(user.deactivatedAt.split('/').reverse().join('-')).toISOString().split('T')[0] : ''}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={user.status !== 'inactive'}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {user.status !== 'inactive' ? 'Disponível apenas para usuários inativos' : ''}
                      </p>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-medium text-gray-800 pt-4">Endereço</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rua e Número
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaMapMarkerAlt className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="address.street"
                        value={user.address.street}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cidade
                      </label>
                      <input
                        type="text"
                        name="address.city"
                        value={user.address.city}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Estado
                      </label>
                      <input
                        type="text"
                        name="address.state"
                        value={user.address.state}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CEP
                      </label>
                      <input
                        type="text"
                        name="address.zipCode"
                        value={user.address.zipCode}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      País
                    </label>
                    <input
                      type="text"
                      name="address.country"
                      value={user.address.country}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="pt-4">
                    <button 
                      type="submit"
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <FaSave className="mr-2" />
                      Salvar Alterações
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </form>
    </MainLayout>
  );
}