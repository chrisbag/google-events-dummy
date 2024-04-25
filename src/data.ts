import { GoogleEvent } from "./types";

export const defaultEvents: GoogleEvent[] = [
  {
    id: 1,
    description: "Meeting with Client",
    startAt: "2024-04-25T09:00:00Z",
    endAt: "2024-04-25T10:00:00Z",
    isDone: false,
  },
  {
    id: 2,
    description: "Team Standup",
    startAt: "2024-04-25T10:30:00Z",
    endAt: "2024-04-25T11:00:00Z",
    isDone: true,
  },
  {
    id: 3,
    description: "Lunch",
    startAt: "2024-04-25T12:00:00Z",
    endAt: "2024-04-25T13:00:00Z",
    isDone: false,
  },
];
