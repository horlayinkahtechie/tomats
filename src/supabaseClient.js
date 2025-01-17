import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hcqiyjnvylycoqtifbwa.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjcWl5am52eWx5Y29xdGlmYndhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0MzczODEsImV4cCI6MjA1MjAxMzM4MX0.KjE7VfqEDnAlBQXTwPuoqHb_cx-RmornNLL48SV2oZQ";
export const supabase = createClient(supabaseUrl, supabaseKey);

export const getCurrentUser = async () => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error("Error fetching user:", error);
    return null;
  }

  return session?.user || null;
};

export default supabase;
