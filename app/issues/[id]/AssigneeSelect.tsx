'use client';
import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

import Skeleton from '@/app/components/Skeleton';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const getUsers = async () => {
    return await axios.get('/api/users').then((res) => res.data);
  };
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: getUsers,
    staleTime: 60 * 1000, //60s
    retry: 3,
  });

  if (isLoading) return <Skeleton height='2rem' />;

  if (error) return null;

  const assignToUser = (userId: string) => {
    return axios.patch<Issue>('/api/issues/' + issue.id, {
      assignedToUserId: userId === 'none' ? null : userId,
    });
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || 'none'}
        onValueChange={async (userId) => {
          let userName: string;

          if (userId !== 'none') {
            const { name } = await axios
              .post<User>('/api/users', { userId: userId || null })
              .then((res) => res.data);
            userName = name!;
          }

          toast.promise(assignToUser(userId), {
            loading: 'Loading...',
            success: (data) => {
              return userId === 'none'
                ? `Issue reverted to ${'Unassigned'}`
                : `Issue assigned to ${userName}`;
            },

            error: (err: Error) => `This just happened: ${console.log(err)}`,
          });
        }}
      >
        <Select.Trigger placeholder='Assign' />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value='none'>Unassigned</Select.Item>
            {users?.map((usr) => (
              <Select.Item key={usr.id} value={usr.id}>
                {usr.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

// async function fetchUser(userId: string) {
//   const user = await prisma.user.findUnique({
//     where: {
//       id: userId,
//     },
//   });
//   return user;
// }

export default AssigneeSelect;
