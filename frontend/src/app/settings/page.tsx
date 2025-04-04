'use client';

import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Card from '@/components/ui/Card';
import { FaSave, FaUser, FaBuilding, FaCreditCard, FaBell, FaShieldAlt, FaDatabase } from 'react-icons/fa';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', name: 'Geral', icon: <FaBuilding /> },
    { id: 'profile', name: 'Perfil', icon: <FaUser /> },
    { id: 'payment', name: 'Pagamentos', icon: <FaCreditCard /> },
    { id: 'notifications', name: 'Notificações', icon: <FaBell /> },
    { id: 'security', name: 'Segurança', icon: <FaShieldAlt /> },
    { id: 'system', name: 'Sistema', icon: <FaDatabase /> },
  ];

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Configurações</h1>
        <p className="text-gray-600">Gerencie as configurações do sistema</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar de navegação */}
        <div className="w-full md:w-64">
          <Card>
            <nav className="p-2">
              <ul>
                {tabs.map((tab) => (
                  <li key={tab.id} className="mb-1">
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center w-full px-4 py-2 text-left rounded-md ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className="mr-3">{tab.icon}</span>
                      <span>{tab.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </Card>
        </div>

        {/* Conteúdo da aba selecionada */}
        <div className="flex-1">
          <Card>
            {activeTab === 'general' && (
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Configurações Gerais</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nome do Clube
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue="Clube Gestão"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Endereço
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue="Av. Principal, 1000"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cidade
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        defaultValue="São Paulo"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Estado
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        defaultValue="SP"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Telefone
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue="(11) 3333-4444"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue="contato@clubegestao.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Horário de Funcionamento
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue="Segunda a Domingo, 06:00 às 22:00"
                    />
                  </div>
                  
                  <div className="pt-4">
                    <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      <FaSave className="mr-2" />
                      Salvar Alterações
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'profile' && (
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Configurações de Perfil</h2>
                <p className="text-gray-600">Configure as opções de perfil de usuário.</p>
              </div>
            )}
            
            {activeTab === 'payment' && (
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Configurações de Pagamento</h2>
                <p className="text-gray-600">Configure as opções de pagamento e integração com gateways.</p>
              </div>
            )}
            
            {activeTab === 'notifications' && (
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Configurações de Notificações</h2>
                <p className="text-gray-600">Configure as opções de notificações por email e WhatsApp.</p>
              </div>
            )}
            
            {activeTab === 'security' && (
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Configurações de Segurança</h2>
                <p className="text-gray-600">Configure as opções de segurança e permissões.</p>
              </div>
            )}
            
            {activeTab === 'system' && (
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Configurações do Sistema</h2>
                <p className="text-gray-600">Configure as opções do sistema e banco de dados.</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}