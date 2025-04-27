import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a mock client if environment variables are missing
const createMockClient = () => {
  console.warn('Supabase environment variables are missing. Using mock client.');
  return {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signInWithPassword: async () => ({ error: new Error('Supabase not configured') }),
      signUp: async () => ({ error: new Error('Supabase not configured') }),
      signOut: async () => ({ error: new Error('Supabase not configured') }),
    },
  };
};

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMockClient();