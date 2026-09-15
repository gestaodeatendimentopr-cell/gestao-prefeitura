import '../styles/globals.css';
import { useEffect } from 'react';
import { useAuthStore } from '../lib/store';
import { getCurrentUser } from '../lib/supabase';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const { setUser, setLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // Check for existing session on app load
    const checkSession = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          setUser(user);
        }
      } catch (error) {
        console.error('Session check error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [setUser, setLoading]);

  return <Component {...pageProps} />;
}

export default MyApp;
