// components/Layout.js
import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AuthContext } from '@/pages/_app';
import { supabase } from '@/lib/supabase';

const MENU_ITEMS_PREFEITURA = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/atendimentos', label: 'Atendimentos', icon: '📞' },
  { href: '/mapa-atendimento', label: 'Mapa de Atendimento', icon: '🗺️' },
  { href: '/mapa-geral', label: 'Mapa Geral', icon: '🌍' },
  { href: '/base-censo', label: 'Base do Censo', icon: '📋' },
  { href: '/modernizacao', label: 'Modernização', icon: '⚡' },
  { href: '/equipes', label: 'Equipes', icon: '👥' },
  { href: '/despachos', label: 'Despachos', icon: '📦' },
  { href: '/indicadores', label: 'Indicadores', icon: '📈' },
  { href: '/historico', label: 'Histórico', icon: '📜' },
  { href: '/usuarios', label: 'Usuários', icon: '👤' },
  { href: '/configuracoes', label: 'Configurações', icon: '⚙️' },
];

const MENU_ITEMS_ADMIN = [
  { href: '/admin/dashboard', label: 'Dashboard Master', icon: '🎛️' },
  { href: '/admin/prefeituras', label: 'Prefeituras', icon: '🏛️' },
  { href: '/admin/usuarios', label: 'Usuários', icon: '👥' },
  { href: '/admin/configuracoes', label: 'Configurações', icon: '⚙️' },
];

export default function Layout({ children, isAdmin = false }) {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const menuItems = isAdmin ? MENU_ITEMS_ADMIN : MENU_ITEMS_PREFEITURA;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const isActive = (href) => router.pathname === href;

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 fixed md:relative w-64 h-screen bg-slate-900 text-white transition-transform z-40 overflow-y-auto`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-slate-800">
          <Link href={isAdmin ? '/admin/dashboard' : '/dashboard'}>
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-lg font-bold">
                💡
              </div>
              <div>
                <h1 className="font-bold text-white">Iluminação</h1>
                <p className="text-xs text-slate-400">Gestão Pública</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <a
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive(item.href)
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </a>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-4 py-4 md:px-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-slate-100 rounded-lg"
            >
              <span className="text-xl">☰</span>
            </button>

            <h1 className="text-xl font-bold text-slate-900 flex-1 md:flex-none">
              Plataforma de Gestão
            </h1>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 px-4 py-2 hover:bg-slate-100 rounded-lg transition"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {user?.email?.charAt(0).toUpperCase()}
                </div>
                <span className="hidden md:inline text-sm text-slate-700">
                  {user?.email}
                </span>
                <span className="text-slate-400">▼</span>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-200">
                    <p className="text-sm font-medium text-slate-900">
                      {user?.email}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                  >
                    Sair
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
