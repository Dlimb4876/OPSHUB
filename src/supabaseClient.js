import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qyizsvakmsraqdziqbti.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF5aXpzdmFrbXNyYXFkemlxYnRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzMzQ1MjgsImV4cCI6MjA4ODkxMDUyOH0.fDz1vMcyIuLnHOb-3WNJvWLlU4yYlDL36uShZnO4hxk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
