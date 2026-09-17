import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  usersApi,
  UsersFilters,
  CreateUserDto,
  UpdateUserDto,
  UpdateUserStatusDto,
  UpdateUserRoleDto,
} from '@/services/users.api';
import { toast } from 'sonner';

// Query keys
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (filters?: UsersFilters) => [...userKeys.lists(), filters] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
};

/**
 * Get all users with filters
 */
export function useUsers(filters?: UsersFilters) {
  return useQuery({
    queryKey: userKeys.list(filters),
    queryFn: () => usersApi.getUsers(filters),
  });
}

/**
 * Get user by ID
 */
export function useUser(id: string) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => usersApi.getUser(id),
    enabled: !!id,
  });
}

/**
 * Create user mutation
 */
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserDto) => usersApi.createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      toast.success('User created successfully!');
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || 'Failed to create user.';
      toast.error(message);
    },
  });
}

/**
 * Update user mutation
 */
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserDto }) =>
      usersApi.updateUser(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.invalidateQueries({ queryKey: userKeys.detail(variables.id) });
      toast.success('User updated successfully!');
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || 'Failed to update user.';
      toast.error(message);
    },
  });
}

/**
 * Update user status mutation (admin only)
 */
export function useUpdateUserStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserStatusDto }) =>
      usersApi.updateUserStatus(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.invalidateQueries({ queryKey: userKeys.detail(variables.id) });
      toast.success('Status updated successfully!');
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || 'Failed to update status.';
      toast.error(message);
    },
  });
}

/**
 * Update user role mutation (admin only)
 */
export function useUpdateUserRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserRoleDto }) =>
      usersApi.updateUserRole(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.invalidateQueries({ queryKey: userKeys.detail(variables.id) });
      toast.success('Role updated successfully!');
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || 'Failed to update role.';
      toast.error(message);
    },
  });
}

/**
 * Delete user mutation (admin only)
 */
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => usersApi.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      toast.success('User deleted successfully!');
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || 'Failed to delete user.';
      toast.error(message);
    },
  });
}
