'use client';

import MainLayout from '@/components/layout/MainLayout';
import Card from '@/components/ui/Card';
import { FaUserPlus, FaSearch } from 'react-icons/fa';

export default function SociosPage() {
  // Dados simulados para a lista de sócios
  const socios = [
    { id: 1, name: 'João Silva', email: 'joao@exemplo.com', role: 'member', status: 'active' },
    { id: 2, name: 'Maria Oliveira', email: 'maria@exemplo.com', role: 'member', status: 'active' },
    { id: 3, name: 'Carlos Santos', email: 'carlos@exemplo.com', role: 'instructor', status: 'active' },
    { id: 4, name: 'Ana Souza', email: 'ana@exemplo.com', role: 'member', status: 'inactive' },
    { id: 5, name: 'Administrador', email: 'admin@clubegestao.com', role: 'admin', status: 'active' },
  ];

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

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Sócios</h1>
        <p className="text-gray-600">Gerencie os sócios do sistema</p>
      </div>

      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar sócios..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
        
        <a href="/socios/new" className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          <FaUserPlus className="mr-2" />
          Novo Sócio
        </a>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nome
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Função
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {socios.map((socio) => {
                const roleLabel = getRoleLabel(socio.role);
                const statusLabel = getStatusLabel(socio.status);
                
                return (
                  <tr key={socio.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{socio.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{socio.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${roleLabel.color}`}>
                        {roleLabel.text}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusLabel.color}`}>
                        {statusLabel.text}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href={`/socios/${socio.id}/view`} className="text-green-600 hover:text-green-900 mr-3">
                        Visualizar
                      </a>
                      <a href={`/socios/${socio.id}`} className="text-blue-600 hover:text-blue-900 mr-3">
                        Editar
                      </a>
                      <button 
                        onClick={() => {
                          if (window.confirm('Tem certeza que deseja excluir este sócio? Esta ação não pode ser desfeita.')) {
                            // Aqui viria a lógica para excluir o sócio
                            alert(`Sócio ${socio.name} excluído com sucesso!`);
                          }
                        }}
                        className="text-red-600 hover:text-red-900"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </MainLayout>
  );
}