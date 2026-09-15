import { useAuthStore, useUIStore } from '../lib/store';
import { Bell, User, Search, Menu } from 'lucide-react';
import { useState } from 'react';

export default function Topbar() {
  const { user } = useAuthStore();
  const { setSidebarOpen } = useUIStore();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
      <div className="h-16 px-6 flex items-center justify-between gap-4">
        {/* Left Side - Search */}
        <div className="flex-1 max-w-xs">
          <div className="relative hidden sm:block">
            <Search size={18} className="absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Right Side - Notifications & User */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="sm:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Menu size={20} className="text-slate-600" />
          </button>

          {/* Notifications */}
          <button className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <Bell size={20} className="text-slate-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-sky-400 to-blue-500 rounded-lg flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-slate-900">{user?.email?.split('@')[0]}</p>
                <p className="text-xs text-slate-500">Usuário</p>
              </div>
            </button>

            {/* User Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
                <div className="px-4 py-3 border-b border-slate-200">
                  <p className="text-sm font-semibold text-slate-900">{user?.email}</p>
                  <p className="text-xs text-slate-500 mt-1">Administrador</p>
                </div>
                <button className="w-full text-left px-4 py-2 hover:bg-slate-100 text-sm text-slate-700 transition-colors">
                  Meu Perfil
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-slate-100 text-sm text-slate-700 transition-colors">
                  Configurações
                </button>
                <div className="border-t border-slate-200 mt-2">
                  <button className="w-full text-left px-4 py-2 hover:bg-slate-100 text-sm text-red-600 transition-colors">
                    Sair
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
