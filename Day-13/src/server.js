import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Required for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 👇 FORCE dotenv to load .env from project root
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import app from './app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('SUPABASE_URL:', process.env.SUPABASE_URL); // TEMP DEBUG
  console.log(`Server running on port ${PORT}`);
});

