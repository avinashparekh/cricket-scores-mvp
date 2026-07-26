import 'dotenv/config';
import { createApp } from './app';

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

const app = createApp();

app.listen(PORT, HOST, () => {
  console.log(`Cricket Scores API listening on http://${HOST}:${PORT}`);
});
