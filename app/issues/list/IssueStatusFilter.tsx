'use client';
import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import React from 'react';

const IssueStatusFilter = () => {
  const router = useRouter();

  const stauses: { label: string; value?: Status }[] = [
    { label: 'All' },
    { label: 'Open', value: 'OPEN' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Closed', value: 'CLOSED' },
  ];

  return (
    <Select.Root
      onValueChange={(status) => {
        const query = status !== 'none' ? `?status=${status}` : '';
        router.push('/issues/list' + query);
      }}
    >
      <Select.Trigger placeholder='Select status...' />
      <Select.Content>
        {stauses.map((status) => (
          <Select.Item key={status.value || '1'} value={status.value || 'none'}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
