export const currentDate = new Date(new Date().setHours(24, 0, 0, 0));

export const daysOfWeek = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday'
] as const;

export const quantityOfDaysInWeek: number = daysOfWeek.length;
