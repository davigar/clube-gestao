'use client';

import MainLayout from '@/components/layout/MainLayout';
import { FaCalendarAlt } from 'react-icons/fa';

export default function EventsPage() {
  // Dados simulados para a página de eventos
  const events = [
    { id: 1, title: 'Treino de Futebol', date: '15/04/2023', time: '18:00 - 20:00', location: 'Campo Principal', status: 'Agendado' },
    { id: 2, title: 'Aula de Natação', date: '16/04/2023', time: '10:00 - 12:00', location: 'Piscina Olímpica', status: 'Agendado' },
    { id: 3, title: 'Torneio de Tênis', date: '18/04/2023', time: '09:00 - 17:00', location: 'Quadras de Tênis', status: 'Agendado' },
    { id: 4, title: 'Festa de Aniversário', date: '20/04/2023', time: '19:00 - 23:00', location: 'Salão de Festas', status: 'Agendado' },
    { id: 5, title: 'Manutenção da Piscina', date: '22/04/2023', time: '08:00 - 16:00', location: 'Piscina Olímpica', status: 'Agendado' },
  ];

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Eventos</h1>
        <p className="text-gray-600">Gerencie os eventos do clube</p>
      </div>

      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Novo Evento
          </button>
        </div>
        <div className="flex flex-1 md:flex-initial items-center space-x-2">
          <input
            type="text"
            placeholder="Buscar evento..."
            className="w-full md:w-auto px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Buscar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">{event.title}</h3>
              <span className="mt-1 inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                {event.status}
              </span>
            </div>
            <div className="p-4">
              <div className="flex items-center mb-2">
                <FaCalendarAlt className="text-gray-500 mr-2" />
                <span className="text-sm text-gray-600">{event.date}, {event.time}</span>
              </div>
              <div className="flex items-center mb-4">
                <span className="text-sm text-gray-600">{event.location}</span>
              </div>
              <div className="flex justify-between">
                <button className="text-blue-600 hover:text-blue-900">Detalhes</button>
                <button className="text-green-600 hover:text-green-900">Participar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}