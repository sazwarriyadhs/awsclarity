
'use client';

import React, { useState, useEffect, useTransition } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MoreHorizontal, PlusCircle, Trash, Edit, UserPlus } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useLanguage } from '@/contexts/LanguageContext';
import { handleGetUsers, handleUpdateUserRole, handleDeleteUser } from '@/lib/actions';
import type { User } from '@/ai/flows/get-users';

export default function UserManagementTable() {
  const { t } = useLanguage();
  const [users, setUsers] = useState<User[]>([]);
  const [isPending, startTransition] = useTransition();
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const roleTextMap = {
    Admin: t.admin,
    Developer: t.developer,
    Viewer: t.viewer,
  };

  const statusTextMap = {
    Active: t.active,
    Inactive: t.inactive,
  };
  
  const fetchUsers = () => {
    startTransition(async () => {
      const result = await handleGetUsers();
      if (result.status === 'success' && result.data) {
        setUsers(result.data);
      } else {
        console.error(result.message);
        // TODO: Show toast on error
      }
    });
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, newRole: User['role']) => {
    startTransition(async () => {
      await handleUpdateUserRole({ userId, role: newRole });
      fetchUsers(); // Refetch users to show updated data
      setEditingUser(null);
    });
  };
  
  const handleDelete = async (userId: string) => {
    startTransition(async () => {
        await handleDeleteUser(userId);
        fetchUsers();
    });
  }


  if (isPending && users.length === 0) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-10 w-full" />
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
       <div className="flex justify-end">
         <Button>
           <UserPlus className="mr-2 h-4 w-4" />
           {t.addUser}
         </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t.name}</TableHead>
              <TableHead>{t.role}</TableHead>
              <TableHead>{t.status}</TableHead>
              <TableHead className="text-right">{t.actions}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user.avatar} data-ai-hint="person portrait" />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-0.5">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                   <Badge variant={user.role === 'Admin' ? 'default' : 'secondary'}>
                    {roleTextMap[user.role]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={user.status === 'Active' ? 'outline' : 'destructive'}>
                     {statusTextMap[user.status]}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                   <Dialog>
                    <AlertDialog>
                        <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">{t.actions}</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>{t.actions}</DropdownMenuLabel>
                             <DialogTrigger asChild>
                                <DropdownMenuItem onSelect={() => setEditingUser(user)}>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>{t.editRole}</span>
                                </DropdownMenuItem>
                            </DialogTrigger>
                            <AlertDialogTrigger asChild>
                                <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                                <Trash className="mr-2 h-4 w-4" />
                                <span>{t.deleteUser}</span>
                                </DropdownMenuItem>
                            </AlertDialogTrigger>
                        </DropdownMenuContent>
                        </DropdownMenu>

                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>{t.confirmDelete}</AlertDialogTitle>
                                <AlertDialogDescription>{t.deleteUserConfirmation}</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>{t.cancel}</AlertDialogCancel>
                                <AlertDialogAction
                                onClick={() => handleDelete(user.id)}
                                className="bg-destructive hover:bg-destructive/90"
                                >
                                {t.delete}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                     <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{t.editRole}</DialogTitle>
                          <DialogDescription>
                             Update the role for {editingUser?.name}.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                           <Label htmlFor="role-select">{t.role}</Label>
                            <Select
                                defaultValue={editingUser?.role}
                                onValueChange={(newRole) => {
                                    if(editingUser) {
                                        handleRoleChange(editingUser.id, newRole as User['role'])
                                    }
                                }}
                            >
                                <SelectTrigger id="role-select">
                                    <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Admin">{t.admin}</SelectItem>
                                    <SelectItem value="Developer">{t.developer}</SelectItem>
                                    <SelectItem value="Viewer">{t.viewer}</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                         <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">{t.cancel}</Button>
                            </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                   </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
