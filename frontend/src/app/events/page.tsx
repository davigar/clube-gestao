'use client';

import MainLayout from '@/components/layout/MainLayout';
import Card from '@/components/ui/Card';
import { FaPlus, FaSearch, FaCalendarAlt, FaMapMarkerAlt, FaClock, FaUsers } from 'react-icons/fa';

export default function EventsPage() {
  // Dados simulados para a lista de eventos
  const events = [
    { 
      id: 1, 
      title: 'Treino de Futebol', 
      space: 'Campo de Futebol Principal',
      date: '15/04/2025',
      time: '18:00 - 20:00',
      attendees: 15,
      maxAttendees: 22,
      eventType: 'treino',
      status: 'scheduled'
    },
    { 
      id: 2, 
      title: 'Aula de Natação', 
      space: 'Piscina Olímpica',
      date: '16/04/2025',
      time: '10:00 - 12:00',
      attendees: 8,
      maxAttendees: 10,
      eventType: 'aula',
      status: 'scheduled'
    },
    { 
      id: 3, 
      title: 'Torneio de Tênis', 
      space: 'Quadras de Tênis',
      date: '18/04/2025',
      time: '09:00 - 17:00',
      attendees: 12,
      maxAttendees: 16,
      eventType: 'competição',
      status: 'scheduled'
    },
    { 
      id: 4, 
      title: 'Festa de Aniversário', 
      space: 'Salão de Festas',
      date: '20/04/2025',
      time: '19:00 - 23:00',
      attendees: 45,
      maxAttendees: 100,
      eventType: 'evento_social',
      status: 'scheduled'
    },
  ];

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case 'treino':
        return { text: 'Treino', color: 'bg-blue-100 text-blue-800' };
      case 'aula':
        return { text: 'Aula', color: 'bg-green-100 text-green-800' };
      case 'competição':
        return { text: 'Competição', color: 'bg-red-100 text-red-800' };
      case 'evento_social':
        return { text: 'Evento Social', color: 'bg-purple-100 text-purple-800' };
      case 'manutenção':
        return { text: 'Manutenção', color: 'bg-yellow-100 text-yellow-800' };
      default:
        return { text: 'Outro', color: 'bg-gray-100 text-gray-800' };
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'scheduled':
        return { text: 'Agendado', color: 'bg-blue-100 text-blue-800' };
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

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Eventos</h1>
        <p className="text-gray-600">Gerencie os eventos do clube</p>
      </div>

      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar eventos..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
        
        <button className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          <FaPlus className="mr-2" />
          Novo Evento
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => {
          const typeLabel = getEventTypeLabel(event.eventType);
          const statusLabel = getStatusLabel(event.status);
          
          return (
            <Card key={event.id} className="overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-800">{event.title}</h3>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${typeLabel.color}`}>
                    {typeLabel.text}
                  </span>
                </div>
                <span className={`mt-2 inline-block px-2 py-1 text-xs font-semibold rounded-full ${statusLabel.color}`}>
                  {statusLabel.text}
                </span>
              </div>
              
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <FaCalendarAlt className="text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600">{event.date}</span>
                </div>
                <div className="flex items-center mb-2">
                  <FaClock className="text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600">{event.time}</span>
                </div>
                <div className="flex items-center mb-2">
                  <FaMapMarkerAlt className="text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600">{event.space}</span>
                </div>
                <div className="flex items-center">
                  <FaUsers className="text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600">
                    {event.attendees} / {event.maxAttendees} participantes
                  </span>
                </div>
                
                <div className="mt-4 flex justify-between">
                  <a href={`/events/${event.id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Ver detalhes
                  </a>
                  <a href={`/events/${event.id}/register`} className="text-green-600 hover:text-green-800 text-sm font-medium">
                    Participar
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