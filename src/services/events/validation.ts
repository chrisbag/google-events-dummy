import { object, string, number, ref } from 'yup';

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

const endAtValidation = datetime.required().test('test-endAt', 'End date should be after start date', function checkEnd(
		end
) {
	const { startAt } = this.parent;
	return new Date(end) >= new Date(startAt);
});

const startAtValidation = datetime.required().test('test-endAt', 'Start date should be before end date', function checkStart(
		start
) {
	const { endAt } = this.parent;
	return new Date(start) <= new Date(endAt);
});

// Validation schema for creating events
export const createEventSchema = object().shape({
  description: string().nullable(),
  startAt: startAtValidation,
  endAt: endAtValidation,
  ownerId: number().required(),
});

// Validation schema for patching events
export const patchEventSchema = object().shape({
  description: string().nullable(),
  startAt: startAtValidation,
  endAt: endAtValidation,
  ownerId: number().required(),
});
