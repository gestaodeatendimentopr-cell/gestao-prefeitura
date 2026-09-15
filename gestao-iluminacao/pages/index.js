import { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn, signUp } from '../lib/supabase';
import { useAuthStore, usePrefeituraStore } from '../lib/store';
import Link from 'next/link';
import { LogIn, Zap } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const { setPrefeitura } = usePrefeituraStore();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const { data, error: signInError } = await signIn(email, password);
        if (signInError) throw new Error(signInError.message);

        if (data?.user) {
          setUser(data.user);
          // TODO: Fetch user's prefecture
          router.push('/dashboard');
        }
      } else {
        if (password !== confirmPassword) {
          throw new Error('As senhas não conferem');
        }

        const { data, error: signUpError } = await signUp(email, password);
        if (signUpError) throw new Error(signUpError.message);

        if (data?.user) {
          setUser(data.user);
          router.push('/onboarding');
        }
      }
    } catch (err) {
      setError(err.message || 'Ocorreu um erro. Tente novamente.');
      console.error('Auth error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500 opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-sky-400 to-blue-500 rounded-xl mb-4">
            <Zap size={28} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Gestão de Iluminação</h1>
          <p className="text-slate-400 mt-2">Plataforma para Prefeituras</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-2xl p-8">
          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-slate-200">
            <button
              onClick={() => setIsLogin(true)}
              className={`pb-3 px-1 font-semibold transition-colors ${
                isLogin
                  ? 'text-sky-600 border-b-2 border-sky-600'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Entrar
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`pb-3 px-1 font-semibold transition-colors ${
                !isLogin
                  ? 'text-sky-600 border-b-2 border-sky-600'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Cadastro
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                placeholder="seu@email.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>

            {/* Confirm Password (Signup only) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>
            )}

            {/* Forgot Password Link (Login only) */}
            {isLogin && (
              <div className="text-right">
                <Link href="/forgot-password">
                  <a className="text-sm text-sky-600 hover:text-sky-700 font-medium">
                    Esqueceu a senha?
                  </a>
                </Link>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-semibold py-2.5 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
            >
              <LogIn size={18} />
              <span>{loading ? 'Processando...' : isLogin ? 'Entrar' : 'Cadastrar'}</span>
            </button>
          </form>

          {/* Terms */}
          <p className="text-center text-xs text-slate-500 mt-6">
            Ao continuar, você concorda com nossos{' '}
            <Link href="/terms">
              <a className="text-sky-600 hover:underline">Termos de Serviço</a>
            </Link>{' '}
            e{' '}
            <Link href="/privacy">
              <a className="text-sky-600 hover:underline">Política de Privacidade</a>
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-400 text-sm mt-8">
          © 2024 Gestão de Iluminação Pública. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}
