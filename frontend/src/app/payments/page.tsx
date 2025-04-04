'use client';

import MainLayout from '@/components/layout/MainLayout';
import Card from '@/components/ui/Card';
import { FaPlus, FaSearch } from 'react-icons/fa';

export default function PaymentsPage() {
  // Dados simulados para a lista de pagamentos
  const payments = [
    { 
      id: 1, 
      description: 'Mensalidade de Abril/2025', 
      user: 'João Silva',
      amount: 150.00,
      dueDate: '10/04/2025',
      paymentDate: '08/04/2025',
      paymentType: 'mensalidade',
      paymentMethod: 'pix',
      status: 'pago'
    },
    { 
      id: 2, 
      description: 'Mensalidade de Abril/2025', 
      user: 'Maria Oliveira',
      amount: 150.00,
      dueDate: '10/04/2025',
      paymentDate: '09/04/2025',
      paymentType: 'mensalidade',
      paymentMethod: 'pix',
      status: 'pago'
    },
    { 
      id: 3, 
      description: 'Mensalidade de Maio/2025', 
      user: 'João Silva',
      amount: 150.00,
      dueDate: '10/05/2025',
      paymentDate: null,
      paymentType: 'mensalidade',
      paymentMethod: 'pix',
      status: 'pendente'
    },
    { 
      id: 4, 
      description: 'Mensalidade de Maio/2025', 
      user: 'Maria Oliveira',
      amount: 150.00,
      dueDate: '10/05/2025',
      paymentDate: null,
      paymentType: 'mensalidade',
      paymentMethod: 'pix',
      status: 'pendente'
    },
    { 
      id: 5, 
      description: 'Inscrição no Campeonato Interno de Futebol', 
      user: 'João Silva',
      amount: 50.00,
      dueDate: '01/05/2025',
      paymentDate: null,
      paymentType: 'campeonato',
      paymentMethod: 'pix',
      status: 'pendente'
    },
  ];

  const getPaymentTypeLabel = (type: string) => {
    switch (type) {
      case 'mensalidade':
        return { text: 'Mensalidade', color: 'bg-blue-100 text-blue-800' };
      case 'evento':
        return { text: 'Evento', color: 'bg-purple-100 text-purple-800' };
      case 'campeonato':
        return { text: 'Campeonato', color: 'bg-green-100 text-green-800' };
      case 'multa':
        return { text: 'Multa', color: 'bg-red-100 text-red-800' };
      default:
        return { text: 'Outro', color: 'bg-gray-100 text-gray-800' };
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pendente':
        return { text: 'Pendente', color: 'bg-yellow-100 text-yellow-800' };
      case 'pago':
        return { text: 'Pago', color: 'bg-green-100 text-green-800' };
      case 'atrasado':
        return { text: 'Atrasado', color: 'bg-red-100 text-red-800' };
      case 'cancelado':
        return { text: 'Cancelado', color: 'bg-gray-100 text-gray-800' };
      default:
        return { text: status, color: 'bg-gray-100 text-gray-800' };
    }
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Pagamentos</h1>
        <p className="text-gray-600">Gerencie os pagamentos do clube</p>
      </div>

      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar pagamentos..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
        
        <button className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          <FaPlus className="mr-2" />
          Nova Cobrança
        </button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descrição
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Membro
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vencimento
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
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
              {payments.map((payment) => {
                const typeLabel = getPaymentTypeLabel(payment.paymentType);
                const statusLabel = getStatusLabel(payment.status);
                
                return (
                  <tr key={payment.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{payment.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{payment.user}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">R$ {payment.amount.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{payment.dueDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${typeLabel.color}`}>
                        {typeLabel.text}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusLabel.color}`}>
                        {statusLabel.text}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {payment.status === 'pendente' && (
                        <a href={`/payments/${payment.id}/pay`} className="text-green-600 hover:text-green-900 mr-4">
                          Pagar
                        </a>
                      )}
                      <a href={`/payments/${payment.id}`} className="text-blue-600 hover:text-blue-900">
                        Detalhes
                      </a>
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