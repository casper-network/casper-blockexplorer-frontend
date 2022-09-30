## Blockexplorer

The app uses our custom Node.js middleware which acts as reverse proxy and support list of multiple nodes.

### Setup

You need to have Docker and Docker Compose set and running.

1. Create `.env` file in a root of a project.

Example:
```
MIDDLEWARE_URL=http://localhost:4000/rpc # middleware URL, by default its http://localhost:4000/rpc
NODE_URLS=http://3.138.177.248:7777/rpc # it can be comma separated list of RPCs
NETWORK_NAME=integration-test # network name, you can check it in chainspec
```

2. Run `make prod-build` or `make dev-build` if you are using the app for development purposes. (HMR and debug modes will be enabled)
3. Run `make prod-start` if you are using the app for production (optimized builds) or `make dev-start` for development. 
4. The frontend will be running at port `3000` and middleware at port `4000`.

