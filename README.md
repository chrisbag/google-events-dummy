# Google Calendar dummy Event API

Event API is a Node.js Express application for handling Calendar events.
It allows you to perform CRUD operations (Create, Read, Update, Delete) on events stored in memory.

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/chrisbag/google-events-dummy.git
   ```

2. Install dependencies

```
   cd event-api
   yarn install
```

## Usage

### Development

To run the application in development mode, use the following command:

```
yarn dev
```

### Production

To build the application for production and run the compiled JavaScript code, use the following commands:

```
yarn build
yarn start
```

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
- startAt: Start date and time of the event - text
- endAt: End date and time of the event - text
- isDone: Indicates whether the event is completed or not - boolean
