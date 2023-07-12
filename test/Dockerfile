FROM cypress/included:12.17.1

ARG BLOCK_EXPLORER_URI
ENV BLOCK_EXPLORER_URI=${BLOCK_EXPLORER_URI}

COPY ./test /app

WORKDIR /app

RUN npm install
RUN ./node_modules/.bin/cypress install

RUN npx cypress verify

CMD ["npx cypress run"]
