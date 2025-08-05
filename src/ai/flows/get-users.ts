
'use server';
/**
 * @fileOverview A flow to manage user data.
 *
 * - getUsers - Fetches a list of users.
 * - updateUserRole - Updates a user's role.
 * - deleteUser - Deletes a user.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const UserRoleSchema = z.enum(['Admin', 'Developer', 'Viewer']);
const UserStatusSchema = z.enum(['Active', 'Inactive']);

const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  role: UserRoleSchema,
  status: UserStatusSchema,
  avatar: z.string().url(),
});
export type User = z.infer<typeof UserSchema>;

export type GetUsersOutput = z.infer<typeof GetUsersOutputSchema>;
const GetUsersOutputSchema = z.array(UserSchema);


// Mock database
let mockUsers: User[] = [
  { id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', name: 'Alice Johnson', email: 'alice.j@example.com', role: 'Admin', status: 'Active', avatar: 'https://placehold.co/100x100.png' },
  { id: '2b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bec', name: 'Bob Williams', email: 'bob.w@example.com', role: 'Developer', status: 'Active', avatar: 'https://placehold.co/100x100.png' },
  { id: '3b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bee', name: 'Charlie Brown', email: 'charlie.b@example.com', role: 'Developer', status: 'Inactive', avatar: 'https://placehold.co/100x100.png' },
  { id: '4b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bef', name: 'Diana Miller', email: 'diana.m@example.com', role: 'Viewer', status: 'Active', avatar: 'https://placehold.co/100x100.png' },
  { id: '5b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4beg', name: 'Ethan Garcia', email: 'ethan.g@example.com', role: 'Viewer', status: 'Active', avatar: 'https://placehold.co/100x100.png' },
];

// Get all users
export async function getUsers(): Promise<GetUsersOutput> {
  return getUsersFlow();
}

const getUsersFlow = ai.defineFlow(
  {
    name: 'getUsersFlow',
    outputSchema: GetUsersOutputSchema,
  },
  async () => {
    // In a real app, you'd fetch from a database.
    return mockUsers;
  }
);


// Update user role
const UpdateUserRoleInputSchema = z.object({
  userId: z.string().uuid(),
  role: UserRoleSchema,
});
export type UpdateUserRoleInput = z.infer<typeof UpdateUserRoleInputSchema>;

export async function updateUserRole(input: UpdateUserRoleInput): Promise<{ success: boolean }> {
  return updateUserRoleFlow(input);
}

const updateUserRoleFlow = ai.defineFlow(
  {
    name: 'updateUserRoleFlow',
    inputSchema: UpdateUserRoleInputSchema,
    outputSchema: z.object({ success: z.boolean() }),
  },
  async ({ userId, role }) => {
    mockUsers = mockUsers.map(user =>
      user.id === userId ? { ...user, role } : user
    );
    return { success: true };
  }
);


// Delete user
const DeleteUserInputSchema = z.string().uuid();
export type DeleteUserInput = z.infer<typeof DeleteUserInputSchema>;

export async function deleteUser(userId: DeleteUserInput): Promise<{ success: boolean }> {
    return deleteUserFlow(userId);
}

const deleteUserFlow = ai.defineFlow(
    {
        name: 'deleteUserFlow',
        inputSchema: DeleteUserInputSchema,
        outputSchema: z.object({ success: z.boolean() }),
    },
    async (userId) => {
        mockUsers = mockUsers.filter(user => user.id !== userId);
        return { success: true };
    }
);
