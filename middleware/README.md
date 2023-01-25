# Blockexplorer Middleware

Middleware was written by Express.js and Typescript.

## Test
We use mocha for unit test and e2e test.

- Unit test files are named like *.spec.ts.

  To run unit test
  
  ```bash
  npm run test:unit
  ```

- E2E test files that require 3rd party are named like *.test.ts.

  To run e2e test
  
  ```bash
  npm run test:e2e
  ```

## Development
You can test apis via Swagger UI. Start development server by run 

```bash
npm run dev
```

and access `http://localhost:<PORT>/docs`.