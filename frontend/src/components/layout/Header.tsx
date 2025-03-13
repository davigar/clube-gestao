import { FaBars, FaBell, FaUser } from 'react-icons/fa';
import { useState } from 'react';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="bg-white shadow-md h-16 flex items-center justify-between px-6 z-10">
      {/* Left side - Menu toggle and title */}
      <div className="flex items-center">
        <button 
          className="text-gray-600 focus:outline-none lg:hidden"
          onClick={toggleSidebar}
        >
          <FaBars size={20} />
        </button>
        <h1 className="ml-4 text-xl font-semibold text-gray-800 lg:ml-0">Clube Gestão</h1>
      </div>

      {/* Right side - Notifications and Profile */}
      <div className="flex items-center">
        {/* Notifications */}
        <div className="relative">
          <button 
            className="p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <FaBell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Notifications dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-20">
              <div className="px-4 py-2 text-sm font-semibold text-gray-700 border-b">
                Notificações
              </div>
              <div className="max-h-60 overflow-y-auto">
                <div className="px-4 py-2 border-b hover:bg-gray-100">
                  <p className="text-sm font-medium text-gray-800">Pagamento pendente</p>
                  <p className="text-xs text-gray-500">Mensalidade de Março vence em 3 dias</p>
                </div>
                <div className="px-4 py-2 border-b hover:bg-gray-100">
                  <p className="text-sm font-medium text-gray-800">Novo campeonato</p>
                  <p className="text-xs text-gray-500">Você foi convocado para o Campeonato Regional</p>
                </div>
              </div>
              <a href="#" className="block px-4 py-2 text-xs text-center text-blue-600 hover:bg-gray-100">
                Ver todas as notificações
              </a>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative ml-4">
          <button 
            className="flex items-center focus:outline-none"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <FaUser className="text-gray-600" />
            </div>
            <span className="ml-2 text-sm font-medium text-gray-700 hidden md:block">
              João Silva
            </span>
          </button>

          {/* Profile dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
              <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Meu Perfil
              </a>
              <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Configurações
              </a>
              <div className="border-t border-gray-100"></div>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Sair
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;