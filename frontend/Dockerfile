FROM node:lts-alpine

WORKDIR /app

EXPOSE 3000

CMD npm install && npm start

FROM node:16.14.0-alpine AS base

ARG REACT_APP_MIDDLEWARE_URL
ENV REACT_APP_MIDDLEWARE_URL "$REACT_APP_MIDDLEWARE_URL"

WORKDIR /usr/src/app

EXPOSE 3000

COPY ./frontend/package*.json ./

RUN npm install

COPY ./frontend ./

RUN npm run build

### --- Final Image --- ###
FROM base 

ENV NODE_ENV "production"

USER root

RUN \
apk --no-cache --update add dumb-init && \
rm -rf /var/cache/apk/*

RUN npm install -g serve

USER 1000:1000

USER node
WORKDIR /build

COPY --from=base /usr/src/app/build ./

ENTRYPOINT [ "/usr/bin/dumb-init", "--" ]
CMD ["serve", "-d", "-l", "tcp://0.0.0.0:${PORT}", "-s", "/build"]
