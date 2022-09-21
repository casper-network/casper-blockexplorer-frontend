## Blockexplorer

The app uses nginx reverse proxy so its eliminates CORS errors that can happen when quering the node when it's running casper-node < 1.5.

### Setup

You need to have Docker and Docker Compose set and running.

1. Create `.env` file in a root of a project.

Example:

```
MIDDLEWARE_URL=http://localhost:4000/rpc # middleware URL, by default its http://localhost:4000/rpc
NODE_URLS=http://3.138.177.248:7777/rpc # it can be comma separated list of RPCs
NETWORK_NAME=integration-test
```

2. Run `make dev-build`
3. Run `make dev-start`.
4. The app will be running at port `3000`.
