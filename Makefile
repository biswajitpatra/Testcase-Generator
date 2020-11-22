default:
	@echo "Select your command"

install:
	@echo "Installing dependencies"
	@pip3 install -r requirements.txt
	@cd client && yarn install

run:
	@cd client && yarn build
	@python3 server.py

frontend:
	@cd client && yarn start server



