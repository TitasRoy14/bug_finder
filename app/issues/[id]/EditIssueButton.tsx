import { Pencil2Icon } from '@radix-ui/react-icons';
import { Box, Button } from '@radix-ui/themes';
import Link from 'next/link';

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button>
      <Link href={`/issues/${issueId}/edit`} className='flex space-x-2'>
        <Box mt='0.11rem'>
          <Pencil2Icon />
        </Box>
        <Box>Edit Issue</Box>
      </Link>
    </Button>
  );
};

export default EditIssueButton;
