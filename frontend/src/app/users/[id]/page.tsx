'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import MedicalInfoForm from '@/components/users/MedicalInfoForm';

const UserView = () => {
  const params = useParams();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Aqui você faria uma chamada para a API para buscar os dados do usuário
        // const response = await fetch(`/api/users/${params.id}`);
        // const data = await response.json();
        
        // Simulando dados para demonstração
        const mockUser = {
          _id: params.id,
          name: 'João Silva',
          email: 'joao.silva@example.com',
          phone: '(11) 98765-4321',
          role: 'member',
          status: 'active',
          membershipType: 'standard',
          memberSince: '2023-01-15',
          address: {
            street: 'Rua das Flores, 123',
            city: 'São Paulo',
            state: 'SP',
            zipCode: '01234-567',
            country: 'Brasil',
          },
          medicalInfo: {
            medicalTreatment: {
              dental: true,
              physiotherapy: false,
              phytotherapy: false,
              speechTherapy: false,
              medication: true,
              psychological: false,
              other: false,
              otherDescription: '',
            },
            frequentInfections: {
              tonsils: false,
              skin: false,
              nose: true,
              mouth: false,
              ear: false,
              teeth: false,
              lung: false,
              hemorrhage: false,
              other: false,
              otherDescription: '',
            },
            epilepsyOrSeizure: {
              hasCondition: false,
              description: '',
            },
            allergicProblem: {
              hasCondition: true,
              description: 'Alergia a poeira e pólen',
            },
            heartProblem: {
              hasCondition: false,
              description: '',
            },
            bloodProblem: {
              hasCondition: false,
              description: '',
            },
            diabetesProblem: {
              hasCondition: false,
              description: '',
            },
            boneProblem: {
              hasCondition: false,
              description: '',
            },
          }
        };
        
        setUser(mockUser);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar dados do usuário');
        setLoading(false);
      }
    };

    fetchUser();
  }, [params.id]);

  const handleEdit = () => {
    router.push(`/users/${params.id}/edit`);
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </MainLayout>
    );
  }

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

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Detalhes do Sócio</h1>
          <button
            onClick={handleEdit}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
          >
            Editar
          </button>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'profile'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Perfil
              </button>
              <button
                onClick={() => setActiveTab('medical')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'medical'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Informações Médicas
              </button>
              <button
                onClick={() => setActiveTab('payments')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'payments'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Pagamentos
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'profile' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Informações Pessoais</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Nome</p>
                      <p className="mt-1">{user.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="mt-1">{user.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Telefone</p>
                      <p className="mt-1">{user.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Tipo de Associação</p>
                      <p className="mt-1">{user.membershipType}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Status</p>
                      <p className="mt-1">{user.status}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Membro desde</p>
                      <p className="mt-1">{new Date(user.memberSince).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Endereço</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Rua</p>
                      <p className="mt-1">{user.address.street}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Cidade</p>
                      <p className="mt-1">{user.address.city}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Estado</p>
                      <p className="mt-1">{user.address.state}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">CEP</p>
                      <p className="mt-1">{user.address.zipCode}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">País</p>
                      <p className="mt-1">{user.address.country}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'medical' && (
              <MedicalInfoForm readOnly={true} initialData={user.medicalInfo} />
            )}

            {activeTab === 'payments' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Histórico de Pagamentos</h3>
                <p className="text-gray-500">Nenhum pagamento registrado.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default UserView;