import { createClient } from '@supabase/supabase-js';
import config from '../config/env';

/**
 * Cliente do Supabase já configurado com o ambiente ativo (teste ou produção).
 * Importe este `supabase` onde precisar falar com o backend.
 */
export const supabase = createClient(config.supabaseUrl, config.supabaseAnonKey);
