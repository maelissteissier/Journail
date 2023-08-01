.PHONY: build_frontend build_all start

build_frontend:
	$(MAKE) -C ./journail-frontend-ng


build_all: build_frontend
	docker-compose build

start: build_all
	docker-compose up
