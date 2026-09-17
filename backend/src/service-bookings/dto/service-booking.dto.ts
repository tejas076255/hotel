import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const ServiceBookingStatusEnum = z.enum([
  'PENDING',
  'CONFIRMED',
  'IN_PROGRESS',
  'COMPLETED',
  'CANCELLED',
  'NO_SHOW',
]);

// Create Service Booking DTO
export const CreateServiceBookingSchema = z.object({
  serviceId: z.string().uuid({ message: 'Invalid service ID' }),
  bookingId: z.string().uuid({ message: 'Invalid booking ID' }),
  scheduledDate: z.coerce.date({ message: 'Invalid date' }),
  scheduledTime: z.coerce.date({ message: 'Invalid time' }),
  duration: z.number().int().positive().optional(),
  quantity: z.number().int().positive().default(1),
  specialRequests: z.string().optional(),
});

export class CreateServiceBookingDto extends createZodDto(
  CreateServiceBookingSchema,
) {}

// Update Service Booking DTO
export const UpdateServiceBookingSchema = z.object({
  scheduledDate: z.coerce.date().optional(),
  scheduledTime: z.coerce.date().optional(),
  duration: z.number().int().positive().optional(),
  quantity: z.number().int().positive().optional(),
  specialRequests: z.string().optional(),
  staffNotes: z.string().optional(),
});

export class UpdateServiceBookingDto extends createZodDto(
  UpdateServiceBookingSchema,
) {}

// Update Status DTO
export const UpdateServiceBookingStatusSchema = z.object({
  status: ServiceBookingStatusEnum,
  staffNotes: z.string().optional(),
});

export class UpdateServiceBookingStatusDto extends createZodDto(
  UpdateServiceBookingStatusSchema,
) {}

// Assign Staff DTO
export const AssignStaffSchema = z.object({
  assignedStaffId: z.string().uuid({ message: 'Invalid staff ID' }),
  staffNotes: z.string().optional(),
});

export class AssignStaffDto extends createZodDto(AssignStaffSchema) {}

// Cancel Service Booking DTO
export const CancelServiceBookingSchema = z.object({
  cancelReason: z
    .string()
    .min(10, { message: 'Cancellation reason must be at least 10 characters' }),
});

export class CancelServiceBookingDto extends createZodDto(
  CancelServiceBookingSchema,
) {}

// Query Service Bookings DTO
export const QueryServiceBookingsSchema = z.object({
  status: ServiceBookingStatusEnum.optional(),
  bookingId: z.string().uuid().optional(),
  serviceId: z.string().uuid().optional(),
  assignedStaffId: z.string().uuid().optional(),
  scheduledDate: z.coerce.date().optional(),
  page: z.coerce.number().int().positive().default(1).optional(),
  limit: z.coerce.number().int().positive().max(100).default(20).optional(),
});

export class QueryServiceBookingsDto extends createZodDto(
  QueryServiceBookingsSchema,
) {}
