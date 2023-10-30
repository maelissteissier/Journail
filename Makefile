.PHONY: build_frontend build_all start

build_frontend_manually:
	$(MAKE) -C ./journail-frontend-ng


build_all:
	docker-compose build

start: build_all
	docker-compose up

start_no_build:
	docker-compose up