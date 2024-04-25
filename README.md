# Google Calendar dummy Event API

Event API is a Node.js Express application for handling Calendar events.
It allows you to perform CRUD operations (Create, Read, Update, Delete) on events stored in memory.

## Usage

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

- id: Unique identifier for the event - number
- description: Description of the event - text | null
- startAt: Start date and time of the event - text datetime YYYY-MM-DDTHH:mm:ssZ
- endAt: End date and time of the event - text datetime YYYY-MM-DDTHH:mm:ssZ
- isDone: Indicates whether the event is completed or not - boolean
