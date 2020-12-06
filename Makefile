default:
	@echo "Select your command"

install:
	@echo "Installing dependencies"
	@pip3 install -r requirements.txt
	@cd client && yarn install

run:
	@echo "Building files..."
	@cd client && yarn build
	@echo "Starting server"
	@python3 app.py

frontend:
	@cd client && yarn start server

backend:
	@python3 app.py



