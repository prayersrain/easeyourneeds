import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  db: {
    schema: 'public',
  },
});

// Helper function for querying
export async function query<T>(sql: string, params: any[] = []): Promise<T[]> {
  const { data, error } = await supabase.rpc('execute_sql', {
    sql_query: sql,
    sql_params: params,
  });

  if (error) throw error;
  return data as T[];
}

export default supabase;
