'use client';
import { User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import Skeleton from '@/app/components/Skeleton';

const AssigneeSelect = () => {
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

  return (
    <Select.Root>
      <Select.Trigger placeholder='Assign' />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users?.map((usr) => (
            <Select.Item key={usr.id} value={usr.id}>
              {usr.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
