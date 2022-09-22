FROM node:16.14.0-alpine AS base

ENV NODE_ENV "development"

EXPOSE 4000

WORKDIR /usr/src/app

RUN npm install -g npm

COPY ./middleware/package*.json ./

RUN npm install

COPY ./middleware ./

RUN npm run build

# prod image
FROM base

ENV NODE_ENV "production"

WORKDIR /app

COPY ./middleware/package*.json ./

RUN npm install --production

COPY --from=base /usr/src/app/dist ./dist

CMD npm start
