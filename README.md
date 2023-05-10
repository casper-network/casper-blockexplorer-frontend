# Blockexplorer Middleware

Here is the [middleware repo](https://github.com/casper-network/casper-blockexplorer-middleware) for the blockexplorer app.
If you want to run the whole app on your own you might need it. Please follow the `README.md` in the middleware repo and then use the middleware URL as `MIDDLEWARE_URL` env variable.

### Setup

Docker and Docker Compose must be set and running before the following steps:

1. Create a `.env` file in the root of the project.

Example:
```
MIDDLEWARE_URL=http://localhost:4000 # Middleware URL, by default it is http://localhost:4000/rpc
DEFAULT_PAGINATION=10 # The page size used to paginate tables
```

If desired, you can change the application logo / name / favicon by adding:

```
ORG_LOGO_URL=https://example.com/your-org-logo
ORG_LOGO_SIZE=0-100
ORG_NAME=Jenkins
ORG_FAVICON_URL=https://example.com/your-favicon
ORG_FONT_URL=https://fonts.googleapis.com/css2?family=your-font-name:wght@your-font-weights-separated-by-semi-colons&display=swap
ORG_PRIMARY_FONT_NAME=your-font-name
ORG_SECONDARY_FONT_NAME=your-font-name
```

You can provide some, none, or all of the colors. Similarly, you can provide light and/or dark mode.

```
LIGHT_THEME={
  "PRIMARY":"pink",
  "SECONDARY":"",
  "LIGHTSUPPORTING":"",
  "BOXSHADOW":"",
  "MEDIUMSUPPORTING":"",
  "DARKSUPPORTING":"",
  "MEDIUMWARNING":"",
  "LIGHTWARNING":"",
  "DARKWARNING":"",
  "SUCCESS":""
}

DARK_THEME={
  "PRIMARY":"blue"
}

```

2. Run `make prod-build` or `make dev-build` if you are using the app for development purposes (HMR and debug modes will be enabled).
3. Run `make prod-start` if you are using the app for production (optimized builds) or `make dev-start` for development. 
4. The frontend will be running at port `3000`. 

### Testing
To run Cypress tests on the frontend:
```
  npm run cy:run
```

To open Cypress
```
  npm run cy:open
```

To run Cypress tests in Docker
```
  make cy-build
  make cy-test
```
