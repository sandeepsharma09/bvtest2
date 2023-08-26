import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
// const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

const REACT_APP_SUPABASE_URL='https://umhzhrftadxnznqladop.supabase.co';
const REACT_APP_SUPABASE_ANON_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtaHpocmZ0YWR4bnpucWxhZG9wIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MTQ5MzE1NCwiZXhwIjoyMDA3MDY5MTU0fQ.qb_PgA2SpTRDpYx8ApjfYwg7WREXPq2oz5rWp40_cs8';

const supabase = createClient(REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_ANON_KEY)

export default supabase