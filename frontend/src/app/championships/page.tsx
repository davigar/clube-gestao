'use client';

import MainLayout from '@/components/layout/MainLayout';
import Card from '@/components/ui/Card';
import { FaPlus, FaSearch, FaCalendarAlt, FaMapMarkerAlt, FaTrophy, FaUsers } from 'react-icons/fa';

export default function ChampionshipsPage() {
  // Dados simulados para a lista de campeonatos
  const championships = [
    { 
      id: 1, 
      name: 'Campeonato Interno de Futebol', 
      sport: 'Futebol',
      startDate: '15/05/2025',
      endDate: '30/06/2025',
      location: 'Campo de Futebol Principal',
      participants: 32,
      type: 'interno',
      status: 'upcoming'
    },
    { 
      id: 2, 
      name: 'Torneio Regional de Tênis', 
      sport: 'Tênis',
      startDate: '10/06/2025',
      endDate: '15/06/2025',
      location: 'Quadras de Tênis',
      participants: 16,
      type: 'externo',
      status: 'upcoming'
    },
    { 
      id: 3, 
      name: 'Copa de Natação', 
      sport: 'Natação',
      startDate: '05/05/2025',
      endDate: '07/05/2025',
      location: 'Piscina Olímpica',
      participants: 24,
      type: 'interno',
      status: 'upcoming'
    },
  ];

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'interno':
        return { text: 'Interno', color: 'bg-blue-100 text-blue-800' };
      case 'externo':
        return { text: 'Externo', color: 'bg-purple-100 text-purple-800' };
      default:
        return { text: type, color: 'bg-gray-100 text-gray-800' };
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'upcoming':
        return { text: 'Próximo', color: 'bg-blue-100 text-blue-800' };
      case 'in_progress':
        return { text: 'Em Andamento', color: 'bg-green-100 text-green-800' };
      case 'completed':
        return { text: 'Concluído', color: 'bg-gray-100 text-gray-800' };
      case 'cancelled':
        return { text: 'Cancelado', color: 'bg-red-100 text-red-800' };
      default:
        return { text: status, color: 'bg-gray-100 text-gray-800' };
    }
  };

  const getSportIcon = (sport: string) => {
    switch (sport.toLowerCase()) {
      case 'futebol':
        return '⚽';
      case 'tênis':
      case 'tenis':
        return '🎾';
      case 'natação':
      case 'natacao':
        return '🏊';
      case 'basquete':
        return '🏀';
      case 'vôlei':
      case 'volei':
        return '🏐';
      default:
        return '🏆';
    }
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Campeonatos</h1>
        <p className="text-gray-600">Gerencie os campeonatos do clube</p>
      </div>

      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar campeonatos..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
        
        <button className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          <FaPlus className="mr-2" />
          Novo Campeonato
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {championships.map((championship) => {
          const typeLabel = getTypeLabel(championship.type);
          const statusLabel = getStatusLabel(championship.status);
          const sportIcon = getSportIcon(championship.sport);
          
          return (
            <Card key={championship.id} className="overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex items-center">
                <div className="text-3xl mr-3">{sportIcon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{championship.name}</h3>
                  <p className="text-sm text-gray-600">{championship.sport}</p>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${typeLabel.color}`}>
                    {typeLabel.text}
                  </span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusLabel.color}`}>
                    {statusLabel.text}
                  </span>
                </div>
                
                <div className="flex items-center mb-2">
                  <FaCalendarAlt className="text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600">
                    {championship.startDate} a {championship.endDate}
                  </span>
                </div>
                <div className="flex items-center mb-2">
                  <FaMapMarkerAlt className="text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600">{championship.location}</span>
                </div>
                <div className="flex items-center">
                  <FaUsers className="text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600">
                    {championship.participants} participantes
                  </span>
                </div>
                
                <div className="mt-4 flex justify-between">
                  <a href={`/championships/${championship.id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Ver detalhes
                  </a>
                  <a href={`/championships/${championship.id}/register`} className="text-green-600 hover:text-green-800 text-sm font-medium">
                    Inscrever-se
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