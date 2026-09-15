// pages/index.js
import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { AuthContext } from './_app';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  // If already logged in, redirect to dashboard
  React.useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      // Redirect will happen automatically via auth listener
    } catch (err) {
      setError(err.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login - Gestão de Iluminação Pública</title>
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
        <div className="w-full max-w-md">
          {/* Logo / Branding */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-lg mb-4">
              <span className="text-white text-2xl font-bold">💡</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Gestão de Iluminação Pública
            </h1>
            <p className="text-slate-400">
              Central de Atendimento e Operação Municipal
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-xl shadow-xl p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="seu@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Senha
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-600">
              <p>Demo: Use credenciais de teste do Supabase</p>
            </div>
          </div>

          {/* Features */}
          <div className="mt-12 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl mb-2">📍</div>
              <p className="text-slate-400 text-sm">Mapa em Tempo Real</p>
            </div>
            <div>
              <div className="text-2xl mb-2">👥</div>
              <p className="text-slate-400 text-sm">Gestão de Equipes</p>
            </div>
            <div>
              <div className="text-2xl mb-2">📊</div>
              <p className="text-slate-400 text-sm">Indicadores</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
