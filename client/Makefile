.PHONY: install clean test start build deploy

ENVIRONMENT ?= local

install: node_modules

clean:
	rm -rf node_modules build

test: node_modules
	REACT_APP_ENVIRONMENT=test yarn test

start: node_modules
	REACT_APP_ENVIRONMENT=$(ENVIRONMENT) PORT=3001 HTTPS=true yarn start

build: node_modules
	REACT_APP_ENVIRONMENT=$(ENVIRONMENT) yarn build

deploy: build
	aws s3 sync build/ s3://recipe-experiments.djpdev.com

node_modules: package.json
	yarn install
	touch node_modules
