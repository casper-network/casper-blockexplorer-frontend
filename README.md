## Block Explorer

The app uses our custom Node.js middleware which acts as reverse proxy and support list of multiple nodes.

### Setup

Docker and Docker Compose must be set and running before the following steps:

1. Create a `.env` file in the root of the project.

Example:
```
MIDDLEWARE_URL=http://localhost:4000 # middleware URL, by default it is http://localhost:4000/rpc
NODE_URLS=http://3.138.177.248:7777/rpc # A comma separated list of RPCs
SIDECAR_REST_URL=http://localhost:18888 # The sidecar's REST URL
SIDECAR_EVENTSTREAM_URL=http://localhost:19999 # The sidecar event stream URL
NETWORK_NAME=integration-test # The network name. You can check the network's name in `chainspec`
PEERS_UPDATE_INTERVAL=60 # The interval time for updating the peer list
```

* When running locally inside a Docker and pointing to an NCTL network, 127.0.0.1 equals `host.docker.internal`. This should be used as `localhost` in `.env`.

If desired, you can change the application logo / name / favicon by adding:

```
ORG_LOGO_URL=https://example.com/your-org-logo
ORG_NAME=Jenkins
ORG_FAVICON_URL=https://example.com/your-favicon
```

2. Run `make prod-build` or `make dev-build` if you are using the app for development purposes (HMR and debug modes will be enabled).
3. Run `make prod-start` if you are using the app for production (optimized builds) or `make dev-start` for development. 
4. The frontend will be running at port `3000` and middleware at port `4000`.

### Testing
To run Cypress tests on the frontend:
```
  cd frontend
  npm run cy:run
```

To open Cypress
```
  cd frontend
  npm run cy:open
```

To run Cypress tests in Docker
```
  make cy-build
  make cy-test
```
