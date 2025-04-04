'use client';

import MainLayout from '@/components/layout/MainLayout';
import { FaUser, FaEnvelope, FaPhone, FaIdCard, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

export default function ProfilePage() {
  // Dados simulados do usuário
  const user = {
    name: 'João Silva',
    email: 'joao@exemplo.com',
    phone: '(11) 98888-8888',
    role: 'member',
    status: 'active',
    membershipType: 'standard',
    memberSince: '15/03/2023',
    lastPayment: '10/04/2023',
    address: {
      street: 'Rua das Flores, 123',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567',
      country: 'Brasil',
    },
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Meu Perfil</h1>
        <p className="text-gray-600">Visualize e edite suas informações pessoais</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna da esquerda - Informações básicas */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center mb-4">
              <FaUser className="text-gray-600" size={64} />
            </div>
            
            <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
            <p className="text-gray-600 mb-4">{user.email}</p>
            
            <div className="w-full mt-4">
              <div className="flex items-center mb-3">
                <FaIdCard className="text-gray-500 mr-2" />
                <span className="text-sm text-gray-600">Membro {user.membershipType}</span>
              </div>
              <div className="flex items-center mb-3">
                <FaCalendarAlt className="text-gray-500 mr-2" />
                <span className="text-sm text-gray-600">Membro desde {user.memberSince}</span>
              </div>
              <div className="flex items-center">
                <FaCalendarAlt className="text-gray-500 mr-2" />
                <span className="text-sm text-gray-600">Último pagamento: {user.lastPayment}</span>
              </div>
            </div>
            
            <button className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Alterar Foto
            </button>
          </div>
        </div>
        
        {/* Coluna da direita - Formulário de edição */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Informações Pessoais</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={user.name}
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
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue={user.email}
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
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue={user.phone}
                    />
                  </div>
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
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue={user.address.street}
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue={user.address.city}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estado
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue={user.address.state}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CEP
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue={user.address.zipCode}
                  />
                </div>
              </div>
              
              <div className="pt-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Salvar Alterações
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}