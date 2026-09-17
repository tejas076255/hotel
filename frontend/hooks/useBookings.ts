import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookingsApi, BookingsFilters } from '@/services/bookings.api';
import { CreateBookingDto, UpdateBookingDto } from '@/types/booking';
import { toast } from 'sonner';

// Query keys
export const bookingKeys = {
  all: ['bookings'] as const,
  lists: () => [...bookingKeys.all, 'list'] as const,
  list: (filters?: BookingsFilters) => [...bookingKeys.lists(), filters] as const,
  details: () => [...bookingKeys.all, 'detail'] as const,
  detail: (id: string) => [...bookingKeys.details(), id] as const,
};

/**
 * Get all bookings with filters
 */
export function useBookings(filters?: BookingsFilters) {
  return useQuery({
    queryKey: bookingKeys.list(filters),
    queryFn: () => bookingsApi.getBookings(filters),
  });
}

/**
 * Get booking by ID
 */
export function useBooking(id: string) {
  return useQuery({
    queryKey: bookingKeys.detail(id),
    queryFn: () => bookingsApi.getBooking(id),
    enabled: !!id,
  });
}

/**
 * Create booking mutation
 */
export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBookingDto) => bookingsApi.createBooking(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.lists() });
      toast.success('Room booked successfully!');
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || 'Booking failed. Please try again.';
      toast.error(message);
    },
  });
}

/**
 * Update booking mutation
 */
export function useUpdateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBookingDto }) =>
      bookingsApi.updateBooking(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: bookingKeys.detail(variables.id),
      });
      toast.success('Booking updated successfully!');
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message ||
        'Update failed. Please try again.';
      toast.error(message);
    },
  });
}

/**
 * Cancel booking mutation
 */
export function useCancelBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      bookingsApi.cancelBooking(id, reason),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: bookingKeys.detail(variables.id),
      });
      toast.success('Booking cancelled successfully!');
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || 'Cancellation failed. Please try again.';
      toast.error(message);
    },
  });
}

/**
 * Update booking status mutation (admin/receptionist)
 */
export function useUpdateBookingStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
      staffNotes,
    }: {
      id: string;
      status: string;
      staffNotes?: string;
    }) => bookingsApi.updateBookingStatus(id, status, staffNotes),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: bookingKeys.detail(variables.id),
      });
      toast.success('Booking status updated successfully!');
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message ||
        'Failed to update booking status. Please try again.';
      toast.error(message);
    },
  });
}
