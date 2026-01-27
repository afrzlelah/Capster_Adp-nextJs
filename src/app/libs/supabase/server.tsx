import { createClient } from "@supabase/supabase-js";

export const supabaseServer = createClient(
  process.env.NEXT_SUPABASE_PUBLIC_URL!,
  process.env.NEXT_SUPABASE_PUBLIC_ANON_KEY!,
);
