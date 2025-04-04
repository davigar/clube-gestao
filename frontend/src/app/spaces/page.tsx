'use client';

import MainLayout from '@/components/layout/MainLayout';
import { FaCalendarAlt } from 'react-icons/fa';

export default function SpacesPage() {
  // Dados simulados para a página de espaços
  const spaces = [
    { id: 1, name: 'Campo de Futebol Principal', type: 'Campo', capacity: 22, status: 'Disponível' },
    { id: 2, name: 'Quadra de Tênis 1', type: 'Quadra', capacity: 4, status: 'Disponível' },
    { id: 3, name: 'Piscina Olímpica', type: 'Piscina', capacity: 30, status: 'Em Manutenção' },
    { id: 4, name: 'Salão de Festas', type: 'Salão', capacity: 100, status: 'Reservado' },
    { id: 5, name: 'Academia', type: 'Academia', capacity: 50, status: 'Disponível' },
  ];

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Espaços</h1>
        <p className="text-gray-600">Gerencie os espaços do clube</p>
      </div>

      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Novo Espaço
          </button>
        </div>
        <div className="flex flex-1 md:flex-initial items-center space-x-2">
          <input
            type="text"
            placeholder="Buscar espaço..."
            className="w-full md:w-auto px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Buscar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {spaces.map((space) => (
          <div key={space.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="h-40 bg-gray-200 flex items-center justify-center">
              <FaCalendarAlt className="text-gray-400" size={48} />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{space.name}</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                  {space.type}
                </span>
                <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                  Capacidade: {space.capacity}
                </span>
                <span className={`px-2 py-1 text-xs rounded-full 
                  ${space.status === 'Disponível' ? 'bg-green-100 text-green-800' : 
                    space.status === 'Em Manutenção' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-blue-100 text-blue-800'}`}>
                  {space.status}
                </span>
              </div>
              <div className="mt-4 flex justify-between">
                <button className="text-blue-600 hover:text-blue-900">Detalhes</button>
                <button className="text-green-600 hover:text-green-900">Reservar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}