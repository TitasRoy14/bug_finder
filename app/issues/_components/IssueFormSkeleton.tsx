import { Box } from '@radix-ui/themes';
import React from 'react';
import Skeleton from '@/app/components/Skeleton';

const IssueFormSkeleton = () => {
  return (
    <Box className='max-w-xl'>
      <Skeleton height='2rem' className='mb-2' />
      <Skeleton height='20rem' />
      <Skeleton height='2rem' width='7rem' className='mt-12' />
    </Box>
  );
};

export default IssueFormSkeleton;
