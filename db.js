// db.js
import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
    connectionString: "postgresql://postgres.wdojtftbjguknpkofjbi:9090@aws-1-us-east-1.pooler.supabase.com:5432/postgres"
});
