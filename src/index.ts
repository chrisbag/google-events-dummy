import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import chunk from "lodash/chunk";

import { defaultEvents } from "./data";

const app = express();
const PORT = 3040;

// Middleware
app.use(bodyParser.json());

// Interface for Event
interface Event {
  id: number;
  isDone: boolean;
  description: string;
  startAt: string;
  endAt: string;
}

// In-memory storage for events
let events = defaultEvents;

// Routes
app.post("/events", (req: Request, res: Response) => {
  const { description, startAt, endAt } = req.body;
  const newEvent: Event = {
    id: events.length + 1,
    description,
    startAt,
    endAt,
    isDone: false, // By default, event is not done
  };
  events.push(newEvent);
  res.status(201).json(newEvent);
});

app.get("/events", (req: Request, res: Response) => {
  res.json({
    total: events.length,
    data: chunk(events, 10),
  });
});

app.get("/events/:id", (req: Request, res: Response) => {
  const eventId = parseInt(req.params.id);
  const event = events.find((event) => event.id === eventId);
  if (event) {
    res.json(event);
  } else {
    res.status(404).send("Event not found");
  }
});

app.patch("/events/:id", (req: Request, res: Response) => {
  const eventId = parseInt(req.params.id);
  const { description, startAt, endAt, isDone } = req.body;
  const eventIndex = events.findIndex((event) => event.id === eventId);
  if (eventIndex !== -1) {
    events[eventIndex] = {
      ...events[eventIndex],
      description: description || events[eventIndex].description,
      startAt: startAt || events[eventIndex].startAt,
      endAt: endAt || events[eventIndex].endAt,
      isDone: isDone || events[eventIndex].isDone,
    };
    res.json(events[eventIndex]);
  } else {
    res.status(404).send("Event not found");
  }
});

app.delete("/events/:id", (req: Request, res: Response) => {
  const eventId = parseInt(req.params.id);
  events = events.filter((event) => event.id !== eventId);
  res.sendStatus(204);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
