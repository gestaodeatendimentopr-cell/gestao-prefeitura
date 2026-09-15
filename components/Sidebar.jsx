import Link from 'next/link';
import { useRouter } from 'next/router';
import { useUIStore, usePrefeituraStore } from '../lib/store';
import {
  LayoutGrid,
  ClipboardList,
  Zap,
  Truck,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';
import { signOut } from '../lib/supabase';
import { useState } from 'react';

export default function Sidebar() {
  const router = useRouter();
  const { sidebarOpen, setSidebarOpen } = useUIStore();
  const { prefeitura } = usePrefeituraStore();
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);

  const menuItems = [
    { label: 'Dashboard', icon: LayoutGrid, href: '/dashboard', role: ['all'] },
    { label: 'Atendimentos', icon: ClipboardList, href: '/atendimentos', role: ['all'] },
    { label: 'Modernização', icon: Zap, href: '/modernizacao', role: ['admin', 'supervisor'] },
    { label: 'Despacho', icon: Truck, href: '/despacho', role: ['admin', 'supervisor'] },
    { label: 'Indicadores', icon: BarChart3, href: '/indicadores', role: ['admin', 'supervisor'] },
    { label: 'Configurações', icon: Settings, href: '/configuracoes', role: ['admin'] },
  ];

  const isActive = (href) => router.pathname === href;

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
      setLoggingOut(false);
    }
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="hidden max-sm:flex fixed top-4 left-4 z-50 p-2 rounded-lg bg-sky-600 text-white"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed max-sm:absolute top-0 left-0 h-screen w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white
          transform transition-transform duration-300 ease-in-out z-40
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full max-sm:hidden'}
          flex flex-col
        `}
      >
        {/* Logo */}
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-xl font-bold bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent">
            GIA
          </h1>
          <p className="text-xs text-slate-400 mt-1">Gestão de Iluminação</p>
        </div>

        {/* Prefecture Info */}
        {prefeitura && (
          <div className="px-6 py-4 bg-slate-800 border-b border-slate-700">
            <p className="text-xs text-slate-400 uppercase tracking-wide">Prefeitura</p>
            <p className="text-sm font-semibold mt-1 truncate">{prefeitura.nome}</p>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <li key={item.href}>
                  <Link href={item.href}>
                    <a
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                        ${
                          active
                            ? 'bg-sky-600 text-white font-semibold'
                            : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                        }
                      `}
                    >
                      <Icon size={18} />
                      <span className="text-sm">{item.label}</span>
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="border-t border-slate-700 p-4">
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition-colors disabled:opacity-50"
          >
            <LogOut size={18} />
            <span className="text-sm">{loggingOut ? 'Saindo...' : 'Sair'}</span>
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 max-sm:block hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}
