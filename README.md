# Gateway Manager

This sample project focuses on managing gateways, which are master devices that control multiple peripheral devices.

When storing a gateway, all fields marked as "to be validated" must undergo validation, and an error should be returned if any field is invalid. Additionally, a gateway can have no more than 10 peripheral devices associated with it.

The service should provide the following functionalities:
- Displaying information about all stored gateways and their associated devices.
- Displaying details for a single gateway.
- Adding and removing devices from a gateway.

Each gateway includes:
- A unique serial number (string).
- A human-readable name (string).
- An IPv4 address (requires validation).
- Multiple associated peripheral devices.

Each peripheral device includes:
- A UID (number).
- A vendor (string).
- A creation date.
- A status (online/offline).


# Technologies
- Framework: Nestjs
- Database: MongoDB
- ORM: Mongoose
- API Documentation: Swagger
- Validation: `class-validator` + `class-transformer`
- Package manager: pnpm
- Unit Testing: Jest


# Todo
- [x] Add and validate configuration
- [x] Add swagger 
- [x] Add database integration
- [x] Gateway module
- [x] Peripheral device module
- [x] Dockerize application

# Running the application

To run the application in development mode 

`pnpm run start:dev`

To run the application in production mode

`pnpm run start`


# Running with docker
You can run this application with docker using this command
`docker-compose up -d --build`