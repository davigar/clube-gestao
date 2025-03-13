'use client';

import MainLayout from '@/components/layout/MainLayout';
import Card from '@/components/ui/Card';
import { FaUsers, FaCalendarAlt, FaTrophy, FaMoneyBillWave } from 'react-icons/fa';

export default function DashboardPage() {
  // Dados simulados para o dashboard
  const stats = [
    { title: 'Membros Ativos', value: '245', icon: <FaUsers size={24} className="text-blue-500" />, change: '+5%' },
    { title: 'Eventos do Mês', value: '18', icon: <FaCalendarAlt size={24} className="text-green-500" />, change: '+12%' },
    { title: 'Campeonatos', value: '3', icon: <FaTrophy size={24} className="text-yellow-500" />, change: '0%' },
    { title: 'Receita Mensal', value: 'R$ 24.500', icon: <FaMoneyBillWave size={24} className="text-purple-500" />, change: '+8%' },
  ];

  const upcomingEvents = [
    { id: 1, title: 'Treino de Futebol', date: '15/03/2023', time: '18:00', location: 'Campo Principal' },
    { id: 2, title: 'Aula de Natação', date: '16/03/2023', time: '10:00', location: 'Piscina Olímpica' },
    { id: 3, title: 'Torneio de Tênis', date: '18/03/2023', time: '09:00', location: 'Quadras de Tênis' },
  ];

  const pendingPayments = [
    { id: 1, member: 'Carlos Silva', amount: 'R$ 150,00', dueDate: '20/03/2023', status: 'Pendente' },
    { id: 2, member: 'Ana Oliveira', amount: 'R$ 150,00', dueDate: '22/03/2023', status: 'Pendente' },
  ];

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Bem-vindo ao sistema de gestão do clube</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <Card key={index} className="flex items-center">
            <div className="mr-4">{stat.icon}</div>
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
              <p className={`text-xs ${stat.change.startsWith('+') ? 'text-green-600' : stat.change === '0%' ? 'text-gray-500' : 'text-red-600'}`}>
                {stat.change} em relação ao mês anterior
              </p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <Card title="Próximos Eventos" className="mb-6">
          <div className="divide-y">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="py-3 flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-800">{event.title}</h4>
                  <p className="text-sm text-gray-600">{event.date} às {event.time}</p>
                  <p className="text-xs text-gray-500">{event.location}</p>
                </div>
                <button className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                  Detalhes
                </button>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <a href="/events" className="text-sm text-blue-600 hover:text-blue-800">
              Ver todos os eventos
            </a>
          </div>
        </Card>

        {/* Pending Payments */}
        <Card title="Pagamentos Pendentes" className="mb-6">
          <div className="divide-y">
            {pendingPayments.map((payment) => (
              <div key={payment.id} className="py-3 flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-800">{payment.member}</h4>
                  <p className="text-sm text-gray-600">{payment.amount}</p>
                  <p className="text-xs text-gray-500">Vencimento: {payment.dueDate}</p>
                </div>
                <span className="px-3 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                  {payment.status}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <a href="/payments" className="text-sm text-blue-600 hover:text-blue-800">
              Ver todos os pagamentos
            </a>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}