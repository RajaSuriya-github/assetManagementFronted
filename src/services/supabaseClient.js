import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://vsuxlglyqozgmidnouuy.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzdXhsZ2x5cW96Z21pZG5vdXV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUwMDc0MjksImV4cCI6MjA0MDU4MzQyOX0.U2OXxOw9ukRwoXzTzeZP0eNLPNLzSH3p71Rtgy-HCkY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
