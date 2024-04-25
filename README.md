# Google Calendar dummy Event API

Event API is a Node.js Express application for handling Calendar events.
It allows you to perform CRUD operations (Create, Read, Update, Delete) on events stored in memory.

## Usage

### Storage

Events are not persited in a DB, only in an array in memory.

### URL

https://dummy-google-calendar-80cb55ddab24.herokuapp.com

### API Key

This API requires an API key to access protected endpoints. Set the api-key header in your request with the value of your API key.

## API Endpoints

### Routes

- POST /events: Create a new event.
- GET /events: Get all events.
- GET /events/:id: Get a specific event by ID.
- PATCH /events/:id: Update a specific event by ID.
- DELETE /events/:id: Delete a specific event by ID.

### Event Schema

Events have the following fields:

- id: Unique identifier for the event - string - 5ea188cc-2209-4a1b-9471-55d7e14e8efa
- description: Description of the event - text | null - Meeging with a client
- startAt: Start date and time of the event - text datetime - YYYY-MM-DDTHH:mm:ssZ
- endAt: End date and time of the event - text datetime - YYYY-MM-DDTHH:mm:ssZ
- ownerId: Google id of the owner of the task - number - 1131 / 4323
