'use client';

import MainLayout from '@/components/layout/MainLayout';
import { FaUsers } from 'react-icons/fa';

export default function UsersPage() {
  // Dados simulados para a página de usuários
  const users = [
    { id: 1, name: 'João Silva', email: 'joao@exemplo.com', role: 'Membro', status: 'Ativo' },
    { id: 2, name: 'Maria Oliveira', email: 'maria@exemplo.com', role: 'Membro', status: 'Ativo' },
    { id: 3, name: 'Carlos Santos', email: 'carlos@exemplo.com', role: 'Instrutor', status: 'Ativo' },
    { id: 4, name: 'Ana Souza', email: 'ana@exemplo.com', role: 'Membro', status: 'Inativo' },
    { id: 5, name: 'Administrador', email: 'admin@clubegestao.com', role: 'Administrador', status: 'Ativo' },
  ];

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Usuários</h1>
        <p className="text-gray-600">Gerencie os usuários do sistema</p>
      </div>

      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Novo Usuário
          </button>
        </div>
        <div className="flex flex-1 md:flex-initial items-center space-x-2">
          <input
            type="text"
            placeholder="Buscar usuário..."
            className="w-full md:w-auto px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Buscar
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome
              </th>
              <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Função
              </th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  <div className="md:hidden text-xs text-gray-500 mt-1">{user.email}</div>
                  <div className="md:hidden text-xs text-gray-500 mt-1">{user.role}</div>
                </td>
                <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{user.email}</div>
                </td>
                <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{user.role}</div>
                </td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${user.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">Editar</button>
                  <button className="text-red-600 hover:text-red-900">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
}