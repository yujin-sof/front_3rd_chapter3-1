import { EventForm } from '../types.ts';

export const validateEventForm = (formData: Partial<EventForm>) => {
  const requiredFields = ['title', 'date', 'startTime', 'endTime'];

  for (const field of requiredFields) {
    if (!formData[field]) {
      return false;
    }
  }
  return true;
};
