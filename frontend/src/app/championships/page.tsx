'use client';

import MainLayout from '@/components/layout/MainLayout';

export default function ChampionshipsPage() {
  // Dados simulados para a página de campeonatos
  const championships = [
    { id: 1, name: 'Campeonato Interno de Futebol', startDate: '15/04/2023', endDate: '30/06/2023', teams: 8, status: 'Em andamento' },
    { id: 2, name: 'Torneio de Tênis', startDate: '10/05/2023', endDate: '15/05/2023', participants: 16, status: 'Planejado' },
    { id: 3, name: 'Copa de Natação', startDate: '05/03/2023', endDate: '06/03/2023', participants: 24, status: 'Concluído' },
  ];

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Campeonatos</h1>
        <p className="text-gray-600">Gerencie os campeonatos do clube</p>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Novo Campeonato
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Buscar campeonato..."
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Buscar
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Período
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Participantes
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {championships.map((championship) => (
              <tr key={championship.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{championship.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {championship.startDate} - {championship.endDate}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {championship.teams ? `${championship.teams} equipes` : `${championship.participants} participantes`}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${championship.status === 'Em andamento' ? 'bg-green-100 text-green-800' : 
                      championship.status === 'Planejado' ? 'bg-blue-100 text-blue-800' : 
                      'bg-gray-100 text-gray-800'}`}>
                    {championship.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
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