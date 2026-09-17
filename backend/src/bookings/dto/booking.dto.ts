import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// Enums
export const BookingStatusEnum = z.enum([
  'PENDING',
  'CONFIRMED',
  'CHECKED_IN',
  'CHECKED_OUT',
  'CANCELLED',
  'NO_SHOW',
]);

export const BookingSourceEnum = z.enum([
  'WEBSITE',
  'PHONE',
  'WALK_IN',
  'OTA',
]);

// Create Booking DTO
export const CreateBookingSchema = z.object({
  userId: z.string().uuid({ message: 'Invalid user ID' }),
  roomIds: z
    .array(z.string().uuid({ message: 'Invalid room ID' }))
    .min(1, { message: 'Must select at least 1 room' }),
  checkInDate: z.coerce.date({ message: 'Invalid check-in date' }),
  checkOutDate: z.coerce.date({ message: 'Invalid check-out date' }),
  guestName: z.string().min(2, { message: 'Guest name must be at least 2 characters' }),
  guestEmail: z.string().email({ message: 'Invalid email' }),
  guestPhone: z.string().min(1, { message: 'Phone number is required' }),
  guestIdNumber: z.string().optional(),
  numberOfGuests: z
    .number()
    .int()
    .positive({ message: 'Number of guests must be greater than 0' }),
  specialRequests: z.string().optional(),
  promotionCode: z.string().optional(),
  bookingSource: BookingSourceEnum.default('WEBSITE'),
});

export class CreateBookingDto extends createZodDto(CreateBookingSchema) {}

// Update Booking DTO
export const UpdateBookingSchema = z.object({
  guestName: z.string().min(2).optional(),
  guestEmail: z.string().email().optional(),
  guestPhone: z.string().min(10).optional(),
  guestIdNumber: z.string().optional(),
  numberOfGuests: z.number().int().positive().optional(),
  specialRequests: z.string().optional(),
  checkInDate: z.coerce.date().optional(),
  checkOutDate: z.coerce.date().optional(),
});

export class UpdateBookingDto extends createZodDto(UpdateBookingSchema) {}

// Update Booking Status DTO
export const UpdateBookingStatusSchema = z.object({
  status: BookingStatusEnum,
  staffNotes: z.string().optional(),
});

export class UpdateBookingStatusDto extends createZodDto(
  UpdateBookingStatusSchema,
) {}

// Cancel Booking DTO
export const CancelBookingSchema = z.object({
  cancelReason: z
    .string()
    .min(10, { message: 'Cancellation reason must be at least 10 characters' }),
});

export class CancelBookingDto extends createZodDto(CancelBookingSchema) {}

// Check Availability DTO
export const CheckAvailabilitySchema = z.object({
  roomTypeId: z
    .string()
    .uuid({ message: 'Invalid room type ID' })
    .optional(),
  checkInDate: z.coerce.date({ message: 'Invalid check-in date' }),
  checkOutDate: z.coerce.date({ message: 'Invalid check-out date' }),
  numberOfRooms: z
    .number()
    .int()
    .positive()
    .default(1)
    .optional(),
});

export class CheckAvailabilityDto extends createZodDto(
  CheckAvailabilitySchema,
) {}

// Query DTO for listing bookings
export const QueryBookingsSchema = z.object({
  status: BookingStatusEnum.optional(),
  userId: z.string().uuid().optional(),
  checkInDate: z.coerce.date().optional(),
  checkOutDate: z.coerce.date().optional(),
  page: z.coerce.number().int().positive().default(1).optional(),
  limit: z.coerce.number().int().positive().max(100).default(20).optional(),
});

export class QueryBookingsDto extends createZodDto(QueryBookingsSchema) {}
