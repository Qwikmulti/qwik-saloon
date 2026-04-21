export const BUSINESS_HOURS = {
  open: '09:00',
  close: '19:00',
  bufferMinutes: 15,
} as const;

export const BOOKING_WINDOW = {
  minDaysAhead: 1,
  maxDaysAhead: 60,
} as const;

export const CANCELLATION_WINDOW_HOURS = 24;

export const SERVICE_CATEGORIES = [
  { value: 'haircut', label: 'Haircuts' },
  { value: 'coloring', label: 'Colouring' },
  { value: 'treatment', label: 'Treatments' },
  { value: 'styling', label: 'Styling' },
  { value: 'other', label: 'Other Services' },
] as const;

export const BOOKING_STATUSES = [
  { value: 'pending', label: 'Pending', color: 'yellow' },
  { value: 'confirmed', label: 'Confirmed', color: 'blue' },
  { value: 'completed', label: 'Completed', color: 'green' },
  { value: 'cancelled', label: 'Cancelled', color: 'red' },
  { value: 'no_show', label: 'No Show', color: 'gray' },
] as const;

export const TIME_INTERVALS = [15, 30, 45, 60] as const;