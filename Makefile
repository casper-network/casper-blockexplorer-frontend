export

.PHONY: dev-build dev-start clean

DEV_DC = docker-compose -p casperexplorer -f docker/docker-compose.dev.yml --env-file ./.env
TEST_DC = docker-compose -p cypress-blockexplorer -f docker/docker-compose.yml -f docker/docker-compose.dev.yml -f docker/docker-compose.cy-test.yml --env-file ./.env
PROD_DC = docker-compose -f docker/docker-compose.prod.yml --env-file ./.env

dev-build:
	$(DEV_DC) build

dev-start:
	$(DEV_DC) up

cy-test:
	$(TEST_DC) up --exit-code-from cypress

cy-build:
	$(TEST_DC) build

prod-build:
	$(PROD_DC) build

prod-start:
	$(PROD_DC) up

clean:
	$(PROD_DC) stop
	$(DEV_DC) stop

frontend-all: frontend-install frontend-audit frontend-lint frontend-test

frontend-install:
	cd frontend && npm install

frontend-ci-install:
	cd frontend && npm ci

frontend-audit:
	cd frontend && npm audit

frontend-lint:
	cd frontend && npm run lint

frontend-test:
	cd frontend && npm run test

nightly-npm-install: frontend-ci-install 

nightly-npm-tests: frontend-test 
