## Block Explorer

The app uses our custom Node.js middleware which acts as reverse proxy and support list of multiple nodes.

### Setup

You need to have Docker and Docker Compose set and running.

1. Create `.env` file in a root of a project.

Example:
```
MIDDLEWARE_URL=http://localhost:4000/rpc # middleware URL, by default its http://localhost:4000/rpc
NODE_URLS=http://3.138.177.248:7777/rpc # it can be comma separated list of RPCs
NETWORK_NAME=integration-test # network name, you can check it in chainspec
PEERS_UPDATE_INTERVAL=60 # interval time for update peer list
```

And if so desired, change the application logo / name / favicon / theme (this is experimental feature) by adding:

```
ORG_LOGO_URL=https://example.com/your-org-logo
ORG_NAME=Jenkins
ORG_FAVICON_URL=https://example.com/your-favicon
THEME={
  "BLACK":"[Desired color]",
  "WHITE":"[Desired color]",
  "PRIMARY":"[Desired color]",
  "SECONDARY":"[Desired color]",
  "LIGHTSUPPORTING":"[Desired color]",
  "BOXSHADOW":"[Desired color]",
  "MEDIUMSUPPORTING":"[Desired color]",
  "DARKSUPPORTING":"[Desired color]",
  "MEDIUMWARNING":"[Desired color]",
  "LIGHTWARNING":"[Desired color]",
  "DARKWARNING":"[Desired color]",
  "SUCCESS":"[Desired color]",
  "GRADIENT1":"[Desired color]",
  "GRADIENT2":"[Desired color]",
  "GRADIENT3":"[Desired color]",
  "GRADIENT4":"[Desired color]",
  "GRADIENT5":"[Desired color]",
  }
```

2. Run `make prod-build` or `make dev-build` if you are using the app for development purposes. (HMR and debug modes will be enabled)
3. Run `make prod-start` if you are using the app for production (optimized builds) or `make dev-start` for development. 
4. The frontend will be running at port `3000` and middleware at port `4000`.

### Testing
To run Cypress tests on the frontend:
```
  > cd frontend
  > npm run cy:run
```

To open Cypress
```
  > cd frontend
  > npm run cy:open
```

To run Cypress tests in Docker
```
  > make cy-build
  > make cy-test
```
