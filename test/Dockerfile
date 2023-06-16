FROM cypress/included:12.13.0

ARG BLOCK_EXPLORER_URI
ENV BLOCK_EXPLORER_URI=${BLOCK_EXPLORER_URI}

RUN apt-get -q update && apt-get -qy install netcat

COPY ./test /app

RUN chmod +x ./app/wait-for.sh

WORKDIR /app

RUN ./node_modules/.bin/cypress install

RUN npx cypress verify

ENTRYPOINT [ "/bin/bash", "-c" ]

CMD ["./wait-for.sh frontend:3000 -- npx cypress run"]
