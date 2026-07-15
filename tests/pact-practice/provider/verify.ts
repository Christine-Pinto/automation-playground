import path from 'path';
import { Verifier } from '@pact-foundation/pact';
import { createApp } from './app';

const PORT = 8081;

async function run() {
  const server = createApp().listen(PORT);

  try {
    const opts = {
      provider: 'WidgetProvider',
      providerBaseUrl: `http://localhost:${PORT}`,
      pactUrls: [path.resolve(__dirname, '../pacts/WidgetConsumer-WidgetProvider.json')],
      publishVerificationResult: false,
      providerVersion: '0.0.1',
      stateHandlers: {
        'widget 1 exists': () => Promise.resolve('widget 1 is seeded in the in-memory store'),
      },
    };

    await new Verifier(opts).verifyProvider();
    console.log('Pact verification succeeded');
  } finally {
    server.close();
  }
}

run().catch((err) => {
  console.error('Pact verification failed:', err);
  process.exit(1);
});
