import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { 
  FaHome, 
  FaUsers, 
  FaCalendarAlt, 
  FaTrophy, 
  FaMoneyBillWave, 
  FaCog,
  FaSignOutAlt
} from 'react-icons/fa';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const pathname = usePathname();

  // Fechar o sidebar quando o caminho mudar (após clicar em um link)
  useEffect(() => {
    // Apenas em dispositivos móveis (viewport pequeno)
    if (window.innerWidth < 1024 && isOpen) {
      toggleSidebar();
    }
  }, [pathname, toggleSidebar, isOpen]);

  const menuItems = [
    { path: '/dashboard', name: 'Dashboard', icon: <FaHome size={20} /> },
    { path: '/users', name: 'Usuários', icon: <FaUsers size={20} /> },
    { path: '/spaces', name: 'Espaços', icon: <FaCalendarAlt size={20} /> },
    { path: '/events', name: 'Eventos', icon: <FaCalendarAlt size={20} /> },
    { path: '/championships', name: 'Campeonatos', icon: <FaTrophy size={20} /> },
    { path: '/payments', name: 'Pagamentos', icon: <FaMoneyBillWave size={20} /> },
    { path: '/settings', name: 'Configurações', icon: <FaCog size={20} /> },
  ];

  // Função para lidar com cliques nos itens do menu em dispositivos móveis
  const handleMenuItemClick = () => {
    if (window.innerWidth < 1024 && isOpen) {
      toggleSidebar();
    }
  };

  return (
    <>
      {/* Overlay para dispositivos móveis */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed top-0 left-0 h-full w-64 bg-gray-900 text-white z-30 
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 border-b border-gray-800">
            <h1 className="text-xl font-bold">Clube Gestão</h1>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 py-4 overflow-y-auto">
            <ul>
              {menuItems.map((item) => (
                <li key={item.path} className="mb-1">
                  <Link href={item.path} onClick={handleMenuItemClick}>
                    <div
                      className={`flex items-center px-6 py-3 hover:bg-gray-800 ${
                        pathname === item.path ? 'bg-gray-800 border-l-4 border-blue-500' : ''
                      }`}
                    >
                      <span className="mr-3">{item.icon}</span>
                      <span>{item.name}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-800">
            <button 
              className="flex items-center w-full px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded"
              onClick={() => {
                console.log('Logout');
                if (window.innerWidth < 1024 && isOpen) {
                  toggleSidebar();
                }
              }}
            >
              <FaSignOutAlt className="mr-3" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;