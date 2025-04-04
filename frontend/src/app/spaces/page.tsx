'use client';

import MainLayout from '@/components/layout/MainLayout';
import Card from '@/components/ui/Card';
import { FaPlus, FaSearch } from 'react-icons/fa';

export default function SpacesPage() {
  // Dados simulados para a lista de espaços
  const spaces = [
    { 
      id: 1, 
      name: 'Campo de Futebol Principal', 
      type: 'campo', 
      capacity: 22, 
      status: 'available',
      pricePerHour: 150
    },
    { 
      id: 2, 
      name: 'Quadra de Tênis 1', 
      type: 'quadra', 
      capacity: 4, 
      status: 'available',
      pricePerHour: 80
    },
    { 
      id: 3, 
      name: 'Piscina Olímpica', 
      type: 'piscina', 
      capacity: 30, 
      status: 'maintenance',
      pricePerHour: 200
    },
    { 
      id: 4, 
      name: 'Salão de Festas', 
      type: 'salão', 
      capacity: 100, 
      status: 'reserved',
      pricePerHour: 300
    },
  ];

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'campo':
        return { text: 'Campo', color: 'bg-green-100 text-green-800' };
      case 'quadra':
        return { text: 'Quadra', color: 'bg-blue-100 text-blue-800' };
      case 'piscina':
        return { text: 'Piscina', color: 'bg-cyan-100 text-cyan-800' };
      case 'salão':
        return { text: 'Salão', color: 'bg-purple-100 text-purple-800' };
      case 'academia':
        return { text: 'Academia', color: 'bg-red-100 text-red-800' };
      default:
        return { text: 'Outro', color: 'bg-gray-100 text-gray-800' };
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'available':
        return { text: 'Disponível', color: 'bg-green-100 text-green-800' };
      case 'maintenance':
        return { text: 'Em Manutenção', color: 'bg-yellow-100 text-yellow-800' };
      case 'reserved':
        return { text: 'Reservado', color: 'bg-blue-100 text-blue-800' };
      case 'closed':
        return { text: 'Fechado', color: 'bg-red-100 text-red-800' };
      default:
        return { text: status, color: 'bg-gray-100 text-gray-800' };
    }
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Espaços</h1>
        <p className="text-gray-600">Gerencie os espaços do clube</p>
      </div>

      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar espaços..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
        
        <button className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          <FaPlus className="mr-2" />
          Novo Espaço
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {spaces.map((space) => {
          const typeLabel = getTypeLabel(space.type);
          const statusLabel = getStatusLabel(space.status);
          
          return (
            <Card key={space.id} className="overflow-hidden">
              <div className="h-40 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-lg">Imagem do Espaço</span>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{space.name}</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${typeLabel.color}`}>
                    {typeLabel.text}
                  </span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusLabel.color}`}>
                    {statusLabel.text}
                  </span>
                </div>
                <div className="mt-3 text-sm text-gray-600">
                  <p>Capacidade: {space.capacity} pessoas</p>
                  <p>Preço por hora: R$ {space.pricePerHour.toFixed(2)}</p>
                </div>
                <div className="mt-4 flex justify-between">
                  <a href={`/spaces/${space.id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Ver detalhes
                  </a>
                  <a href={`/events/new?space=${space.id}`} className="text-green-600 hover:text-green-800 text-sm font-medium">
                    Reservar
                  </a>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </MainLayout>
  );
}