import { Flex, Card, Box } from '@radix-ui/themes';
import { Skeleton } from '@/app/components';

const IssueDetailsLoadingPage = () => {
  return (
    <Box className='max-w-xl'>
      <Skeleton height='40px' />
      <Flex gap='2' my='2'>
        <Skeleton width='5rem' />
        <Skeleton width='8rem' />
      </Flex>
      <Card className='prose' mt='4'>
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default IssueDetailsLoadingPage;
