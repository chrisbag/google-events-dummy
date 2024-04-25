// Interface for Event
export interface GoogleEvent {
  id: string;
  description: string | null;
  startAt: string;
  endAt: string;
  ownerId: number;
}
