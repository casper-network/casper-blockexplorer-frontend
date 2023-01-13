import { defineConfig } from 'cypress';
import path from 'path';

export default defineConfig({
  e2e: {
    specPattern: path.resolve(__dirname, 'cypress/e2e/**/*.cy.ts'),
    baseUrl: 'http://localhost:3000',
    env: {
      MIDDLEWARE_URL: 'http://localhost:4000',
    },
  },
});
