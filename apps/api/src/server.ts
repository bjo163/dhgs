import Fastify from 'fastify';

const app = Fastify({ logger: true });

app.get('/health', async () => ({
  service: 'dhgs-api',
  status: 'ok',
  authority: 'technical-service-only',
  version: '0.1.0'
}));

app.get('/api/v1/meta', async () => ({
  product: 'DHGS',
  mode: 'SANDBOX',
  note: 'This prototype API does not possess statutory or coercive authority.'
}));

const port = Number(process.env.PORT ?? 4000);
await app.listen({ port, host: '0.0.0.0' });
