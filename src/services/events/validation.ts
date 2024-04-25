import { object, string, number } from "yup";

const datetime = string().test(
  "is-datetime",
  "Please enter a valid datetime in the format YYYY-MM-DDTHH:mm:ssZ",
  (value) => {
    if (!value) return true;
    return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(Z|(\+|-)\d{2}:\d{2})$/.test(
      value
    );
  }
);

// Validation schema for creating events
export const createEventSchema = object().shape({
  description: string().nullable(),
  startAt: datetime.required(),
  endAt: datetime.required(),
  ownerId: number().min(1).max(3).required(),
});

// Validation schema for patching events
export const patchEventSchema = object().shape({
  description: string().nullable(),
  startAt: datetime.required(),
  endAt: datetime.required(),
  ownerId: number().min(1).max(3).required(),
});
