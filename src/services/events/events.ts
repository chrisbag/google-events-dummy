import { Express, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import chunk from "lodash/chunk";
import { defaultEvents } from "./data";
import { GoogleEvent } from "./types";
import { createEventSchema, patchEventSchema } from "./validation";

export default (app: Express) => {
  // In-memory storage for events
  let events = defaultEvents;

  // Routes
  app.post("/events", async (req: Request, res: Response) => {
    try {
      await createEventSchema.validate(req.body, {
        stripUnknown: false,
        abortEarly: false,
      });
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message, details: error.errors });
    }

    const { description, startAt, endAt, isDone } = req.body;
    const newEvent: GoogleEvent = {
      id: uuidv4(),
      description: description || null,
      startAt,
      endAt,
      isDone: isDone || false, // By default, event is not done
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
    const eventId = req.params.id;
    const event = events.find((event) => event.id === eventId);
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ error: "Event not found" });
    }
  });

  app.patch("/events/:id", async (req: Request, res: Response) => {
    const eventId = req.params.id;

    try {
      await patchEventSchema.validate(req.body, {
        stripUnknown: false,
        abortEarly: false,
      });
    } catch (error: any) {
      console.log(error);

      return res
        .status(400)
        .json({ error: error.message, details: error.errors });
    }

    const { description, startAt, endAt, isDone } = req.body;
    const eventIndex = events.findIndex((event) => event.id === eventId);

    if (eventIndex !== -1) {
      // Update fields
      const updatedEvent = {
        ...events[eventIndex],
        description: description || events[eventIndex].description,
        startAt: startAt || events[eventIndex].startAt,
        endAt: endAt || events[eventIndex].endAt,
        isDone: isDone !== undefined ? isDone : events[eventIndex].isDone,
      };

      // Update event in memory
      events[eventIndex] = updatedEvent;
      return res.json(updatedEvent);
    } else {
      return res.status(404).json({ error: "Event not found" });
    }
  });

  app.delete("/events/:id", (req: Request, res: Response) => {
    const eventId = req.params.id;
    events = events.filter((event) => event.id !== eventId);
    res.sendStatus(204);
  });
};
