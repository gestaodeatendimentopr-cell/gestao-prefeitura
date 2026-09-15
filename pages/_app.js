// pages/_app.js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabase';
import '@/styles/globals.css';

// Simple auth context
export const AuthContext = React.createContext();

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;

        if (data?.session) {
          setUser(data.session.user);
        }
      } catch (error) {
        console.error('Error checking user:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);

        // Redirect to login if session ends
        if (event === 'SIGNED_OUT') {
          router.push('/');
        }
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center">
          <div className="w-12 h-12 mb-4 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-300">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading }}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}

export default MyApp;
