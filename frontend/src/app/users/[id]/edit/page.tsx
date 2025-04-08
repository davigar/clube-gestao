'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import MedicalInfoForm from '@/components/users/MedicalInfoForm';

const UserEdit = () => {
  const params = useParams();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: '',
    membershipType: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
  });

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
        setFormData({
          name: mockUser.name,
          email: mockUser.email,
          phone: mockUser.phone,
          status: mockUser.status,
          membershipType: mockUser.membershipType,
          address: { ...mockUser.address },
        });
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar dados do usuário');
        setLoading(false);
      }
    };

    fetchUser();
  }, [params.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      // Aqui você faria uma chamada para a API para atualizar os dados do usuário
      // const response = await fetch(`/api/users/${params.id}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });
      
      // Simulando sucesso
      alert('Perfil atualizado com sucesso!');
      router.push(`/users/${params.id}`);
    } catch (err) {
      setError('Erro ao atualizar perfil');
    }
  };

  const handleMedicalInfoSubmit = async (medicalData) => {
    try {
      // Aqui você faria uma chamada para a API para atualizar as informações médicas
      // const response = await fetch(`/api/users/${params.id}/medical-info`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(medicalData),
      // });
      
      // Simulando sucesso
      alert('Informações médicas atualizadas com sucesso!');
      router.push(`/users/${params.id}`);
    } catch (err) {
      setError('Erro ao atualizar informações médicas');
    }
  };

  const handleCancel = () => {
    router.push(`/users/${params.id}`);
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
          <h1 className="text-2xl font-bold text-gray-900">Editar Sócio</h1>
          <button
            onClick={handleCancel}
            className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded"
          >
            Cancelar
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
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'profile' && (
              <form onSubmit={handleProfileSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Informações Pessoais</h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefone</label>
                        <input
                          type="text"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                        <select
                          id="status"
                          name="status"
                          value={formData.status}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        >
                          <option value="active">Ativo</option>
                          <option value="inactive">Inativo</option>
                          <option value="pending">Pendente</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="membershipType" className="block text-sm font-medium text-gray-700">Tipo de Associação</label>
                        <select
                          id="membershipType"
                          name="membershipType"
                          value={formData.membershipType}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        >
                          <option value="standard">Padrão</option>
                          <option value="premium">Premium</option>
                          <option value="family">Família</option>
                          <option value="temporary">Temporário</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Endereço</h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="address.street" className="block text-sm font-medium text-gray-700">Rua</label>
                        <input
                          type="text"
                          id="address.street"
                          name="address.street"
                          value={formData.address.street}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="address.city" className="block text-sm font-medium text-gray-700">Cidade</label>
                        <input
                          type="text"
                          id="address.city"
                          name="address.city"
                          value={formData.address.city}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="address.state" className="block text-sm font-medium text-gray-700">Estado</label>
                        <input
                          type="text"
                          id="address.state"
                          name="address.state"
                          value={formData.address.state}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="address.zipCode" className="block text-sm font-medium text-gray-700">CEP</label>
                        <input
                          type="text"
                          id="address.zipCode"
                          name="address.zipCode"
                          value={formData.address.zipCode}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="address.country" className="block text-sm font-medium text-gray-700">País</label>
                        <input
                          type="text"
                          id="address.country"
                          name="address.country"
                          value={formData.address.country}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="mr-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Salvar
                  </button>
                </div>
              </form>
            )}

            {activeTab === 'medical' && (
              <MedicalInfoForm initialData={user.medicalInfo} onSubmit={handleMedicalInfoSubmit} />
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default UserEdit;