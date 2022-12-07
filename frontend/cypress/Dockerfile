FROM cypress/included:11.2.0

ARG BLOCK_EXPLORER_URI
ENV BLOCK_EXPLORER_URI=${BLOCK_EXPLORER_URI}

COPY ./frontend /app

WORKDIR /app

RUN npx cypress verify

CMD ["npx cypress run"]