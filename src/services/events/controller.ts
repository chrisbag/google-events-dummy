import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { defaultEvents } from './data';
import { GoogleEvent } from './types';
import { createEventSchema, patchEventSchema } from './validation';
import * as Service from '../webhooks/service';
import { WebhookAction } from '../webhooks/types';

let events = defaultEvents;

// In-memory storage for events

export const createEvent = async (req: Request, res: Response) => {
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

  const { description, startAt, endAt, ownerId } = req.body;
  const newEvent: GoogleEvent = {
    id: uuidv4(),
    description: description || null,
    startAt,
    endAt,
    ownerId,
  };
  events.push(newEvent);
  await Service.callWebHooks(WebhookAction.CREATE, newEvent);
  res.status(201).json(newEvent);
};

export const getEvents = (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1; // Default to page 1 if page query parameter is not provided
  const limit = 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = events.slice(startIndex, endIndex);

  res.json({
    total: events.length,
    totalPages: Math.ceil(events.length / limit),
    currentPage: page,
    data: results,
  });
};

export const getEvent = async (req: Request, res: Response) => {
  const eventId = req.params.id;
  const event = events.find((event) => event.id === eventId);
  if (event) {
    res.json(event);
  } else {
    res.status(404).json({ error: "Event not found" });
  }
};

export const patchEvent = async (req: Request, res: Response) => {
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

  const { description, startAt, endAt } = req.body;
  const eventIndex = events.findIndex((event) => event.id === eventId);

  if (eventIndex !== -1) {
    // Update fields
    const updatedEvent = {
      ...events[eventIndex],
      description: description || events[eventIndex].description,
      startAt: startAt || events[eventIndex].startAt,
      endAt: endAt || events[eventIndex].endAt,
    };

    // Update event in memory
    events[eventIndex] = updatedEvent;
	  await Service.callWebHooks(WebhookAction.PATCH, updatedEvent)
    return res.json(updatedEvent);
  } else {
    return res.status(404).json({ error: "Event not found" });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  const eventId = req.params.id;

	const deletedEvent = events.find((event) => event.id === eventId);
	if(deletedEvent) {
		await Service.callWebHooks(WebhookAction.DELETE, deletedEvent);
	}
	// idea : else throw 404 error

	events = events.filter((event) => event.id !== eventId);
  res.sendStatus(204);
};
