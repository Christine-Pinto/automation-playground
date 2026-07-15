import path from 'path';
import { PactV3, MatchersV3 } from '@pact-foundation/pact';
import { WidgetClient } from './widgetClient';

const { like, string, boolean } = MatchersV3;

const provider = new PactV3({
  consumer: 'WidgetConsumer',
  provider: 'WidgetProvider',
  dir: path.resolve(__dirname, '../pacts'),
});

describe('WidgetClient contract with WidgetProvider', () => {
  it('fetches a widget by id', async () => {
    provider
      .given('widget 1 exists')
      .uponReceiving('a request for widget 1')
      .withRequest({
        method: 'GET',
        path: '/widgets/1',
      })
      .willRespondWith({
        status: 200,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: {
          id: string('1'),
          name: like('Left-handed screwdriver'),
          inStock: boolean(true),
        },
      });

    await provider.executeTest(async (mockServer) => {
      const client = new WidgetClient(mockServer.url);
      const widget = await client.getWidget('1');

      expect(widget.id).toBe('1');
      expect(typeof widget.name).toBe('string');
      expect(typeof widget.inStock).toBe('boolean');
    });
  });
});
