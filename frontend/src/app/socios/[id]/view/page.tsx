'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import Card from '@/components/ui/Card';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaIdCard, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaEdit, 
  FaArrowLeft,
  FaMoneyBillWave,
  FaTrophy,
  FaSwimmer,
  FaAddressCard,
  FaBirthdayCake,
  FaCalendarCheck,
  FaCalendarTimes,
  FaUserFriends
} from 'react-icons/fa';

interface UserViewPageProps {
  params: {
    id: string;
  };
}

export default function SocioViewPage({ params }: UserViewPageProps) {
  const router = useRouter();
  
  // Estado para armazenar os dados do sócio
  const [user, setUser] = useState<any>(null);
  
  // Estado para armazenar os dados do membro titular (se aplicável)
  const [mainMember, setMainMember] = useState<any>(null);

  // Estado para controlar o carregamento
  const [loading, setLoading] = useState(true);
  
  // Estado para controlar mensagens de erro
  const [error, setError] = useState('');

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
            activities: ['Natação', 'Futebol'],
            championships: [
              { name: 'Campeonato de Natação 2023', position: '3º lugar' },
              { name: 'Torneio de Futebol - Março/2023', position: 'Participante' }
            ],
            payments: [
              { date: '10/04/2023', value: 'R$ 150,00', status: 'Pago' },
              { date: '10/03/2023', value: 'R$ 150,00', status: 'Pago' },
              { date: '10/02/2023', value: 'R$ 150,00', status: 'Pago' }
            ]
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
            activities: ['Tênis', 'Academia'],
            championships: [
              { name: 'Torneio de Tênis - Fevereiro/2023', position: '1º lugar' }
            ],
            payments: [
              { date: '05/04/2023', value: 'R$ 250,00', status: 'Pago' },
              { date: '05/03/2023', value: 'R$ 250,00', status: 'Pago' },
              { date: '05/02/2023', value: 'R$ 250,00', status: 'Pago' }
            ]
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
            activities: ['Natação (Instrutor)', 'Hidroginástica (Instrutor)'],
            championships: [],
            payments: [
              { date: '15/04/2023', value: 'R$ 0,00', status: 'Isento' },
              { date: '15/03/2023', value: 'R$ 0,00', status: 'Isento' },
              { date: '15/02/2023', value: 'R$ 0,00', status: 'Isento' }
            ]
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
            activities: ['Vôlei', 'Pilates'],
            championships: [
              { name: 'Torneio de Vôlei - Dezembro/2022', position: '2º lugar' }
            ],
            payments: [
              { date: '10/04/2023', value: 'R$ 150,00', status: 'Pendente' },
              { date: '10/03/2023', value: 'R$ 150,00', status: 'Pendente' },
              { date: '10/02/2023', value: 'R$ 150,00', status: 'Pendente' },
              { date: '10/01/2023', value: 'R$ 150,00', status: 'Pago' }
            ]
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
            activities: ['Administração do Sistema'],
            championships: [],
            payments: []
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
            activities: ['Natação', 'Futebol Infantil'],
            championships: [],
            payments: []
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
            activities: ['Natação Infantil', 'Ballet'],
            championships: [],
            payments: []
          },
        ];
        
        const userData = mockUsers.find(u => u.id === parseInt(socioId));
        
        if (userData) {
          setUser(userData);
          
          // Se o usuário tiver um membro titular, buscar os dados do membro titular
          if (userData.mainMemberId) {
            const mainMemberData = mockUsers.find(u => u.id === userData.mainMemberId);
            if (mainMemberData) {
              setMainMember(mainMemberData);
            }
          }
        } else {
          setError('Sócio não encontrado');
          setTimeout(() => router.push('/socios'), 2000);
        }
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
        setError('Erro ao carregar dados do usuário');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  // Usando 'params' como dependência em vez de 'params.id'
  }, [params, router]);

  // Função para voltar à página anterior
  const handleBack = () => {
    router.back();
  };

  // Função para ir para a página de edição
  const handleEdit = () => {
    router.push(`/socios/${params.id}`);
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

  // Renderização condicional em caso de erro
  if (error) {
    return (
      <MainLayout>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Erro!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </MainLayout>
    );
  }

  // Função para obter o rótulo do papel do usuário
  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin':
        return { text: 'Administrador', color: 'bg-purple-100 text-purple-800' };
      case 'instructor':
        return { text: 'Instrutor', color: 'bg-blue-100 text-blue-800' };
      case 'member':
        return { text: 'Membro', color: 'bg-green-100 text-green-800' };
      default:
        return { text: role, color: 'bg-gray-100 text-gray-800' };
    }
  };

  // Função para obter o rótulo do status do usuário
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return { text: 'Ativo', color: 'bg-green-100 text-green-800' };
      case 'inactive':
        return { text: 'Inativo', color: 'bg-red-100 text-red-800' };
      case 'pending':
        return { text: 'Pendente', color: 'bg-yellow-100 text-yellow-800' };
      default:
        return { text: status, color: 'bg-gray-100 text-gray-800' };
    }
  };

  // Função para obter o rótulo do tipo de associação
  const getMembershipTypeLabel = (type: string) => {
    switch (type) {
      case 'standard':
        return { text: 'Padrão', color: 'bg-blue-100 text-blue-800' };
      case 'premium':
        return { text: 'Premium', color: 'bg-purple-100 text-purple-800' };
      case 'family':
        return { text: 'Família', color: 'bg-green-100 text-green-800' };
      case 'instructor':
        return { text: 'Instrutor', color: 'bg-yellow-100 text-yellow-800' };
      case 'admin':
        return { text: 'Administrador', color: 'bg-gray-100 text-gray-800' };
      default:
        return { text: type, color: 'bg-gray-100 text-gray-800' };
    }
  };

  const roleLabel = getRoleLabel(user.role);
  const statusLabel = getStatusLabel(user.status);
  const membershipTypeLabel = getMembershipTypeLabel(user.membershipType);

  return (
    <MainLayout>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Detalhes do Sócio</h1>
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
          <button 
            onClick={handleEdit}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <FaEdit className="mr-2" />
            Editar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna da esquerda - Informações básicas */}
        <div className="lg:col-span-1">
          <Card>
            <div className="p-6 flex flex-col items-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center mb-4">
                <FaUser className="text-gray-600" size={64} />
              </div>
              
              <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
              <p className="text-gray-600 mb-2">{user.email}</p>
              
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${roleLabel.color}`}>
                  {roleLabel.text}
                </span>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusLabel.color}`}>
                  {statusLabel.text}
                </span>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${membershipTypeLabel.color}`}>
                  {membershipTypeLabel.text}
                </span>
              </div>
              
              <div className="w-full mt-2">
                <div className="flex items-center mb-3">
                  <FaIdCard className="text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600">Membro desde {user.memberSince}</span>
                </div>
                <div className="flex items-center mb-3">
                  <FaCalendarAlt className="text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600">Último pagamento: {user.lastPayment}</span>
                </div>
                <div className="flex items-center mb-3">
                  <FaPhone className="text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600">{user.phone}</span>
                </div>
                <div className="flex items-center mb-3">
                  <FaEnvelope className="text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600">{user.email}</span>
                </div>
                <div className="flex items-center mb-3">
                  <FaAddressCard className="text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600">CPF: {user.cpf}</span>
                </div>
                <div className="flex items-center mb-3">
                  <FaBirthdayCake className="text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600">Idade: {user.age} anos</span>
                </div>
                <div className="flex items-center mb-3">
                  <FaCalendarCheck className="text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600">Data de Inclusão: {user.createdAt}</span>
                </div>
                {user.deactivatedAt && (
                  <div className="flex items-center mb-3">
                    <FaCalendarTimes className="text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">Data de Desativação: {user.deactivatedAt}</span>
                  </div>
                )}
                {user.mainMemberId && mainMember && (
                  <div className="flex items-center mb-3">
                    <FaUserFriends className="text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">
                      Membro Titular: <a href={`/socios/${mainMember.id}/view`} className="text-blue-600 hover:underline">{mainMember.name}</a>
                    </span>
                  </div>
                )}
              </div>
            </div>
          </Card>

          <Card className="mt-6">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Endereço</h3>
              <div className="flex items-start mb-3">
                <FaMapMarkerAlt className="text-gray-500 mr-2 mt-1" />
                <div>
                  <p className="text-sm text-gray-600">{user.address.street}</p>
                  <p className="text-sm text-gray-600">{user.address.city}, {user.address.state}</p>
                  <p className="text-sm text-gray-600">{user.address.zipCode}</p>
                  <p className="text-sm text-gray-600">{user.address.country}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Coluna da direita - Informações detalhadas */}
        <div className="lg:col-span-2">
          {/* Atividades */}
          <Card className="mb-6">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <FaSwimmer className="mr-2 text-blue-500" />
                Atividades
              </h3>
              
              {user.activities && user.activities.length > 0 ? (
                <ul className="space-y-2">
                  {user.activities.map((activity: string, index: number) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      <span className="text-gray-700">{activity}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic">Nenhuma atividade registrada</p>
              )}
            </div>
          </Card>
          
          {/* Campeonatos */}
          <Card className="mb-6">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <FaTrophy className="mr-2 text-yellow-500" />
                Campeonatos
              </h3>
              
              {user.championships && user.championships.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Campeonato
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Posição
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {user.championships.map((championship: any, index: number) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{championship.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{championship.position}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500 italic">Nenhum campeonato registrado</p>
              )}
            </div>
          </Card>
          
          {/* Pagamentos */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <FaMoneyBillWave className="mr-2 text-green-500" />
                Histórico de Pagamentos
              </h3>
              
              {user.payments && user.payments.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Data
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Valor
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {user.payments.map((payment: any, index: number) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{payment.date}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{payment.value}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              payment.status === 'Pago' ? 'bg-green-100 text-green-800' : 
                              payment.status === 'Pendente' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {payment.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500 italic">Nenhum pagamento registrado</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}