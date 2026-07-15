import { createApp } from './app';

const PORT = process.env.PORT ? Number(process.env.PORT) : 8080;

createApp().listen(PORT, () => {
  console.log(`Pact practice provider listening on http://localhost:${PORT}`);
});
