import { createClient } from '@supabase/supabase-js';

// Replace these with your actual strings from the Supabase API Keys page
const supabaseUrl = 'https://vlgtfnwdibgmeitqzwwp.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsZ3RmbndkaWJnbWVpdHF6d3dwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0NjMyOTYsImV4cCI6MjA4NzAzOTI5Nn0.xUepoG7NbJIUshCUmj6cy9f2YVROdVWleXLRdeVs6aw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);