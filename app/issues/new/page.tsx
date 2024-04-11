'use client';
import { Button, Callout, Text, TextField } from '@radix-ui/themes';
import { useForm, Controller } from 'react-hook-form';
import 'easymde/dist/easymde.min.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { createIssueSchema } from '@/app/validationSchema';
import { z } from 'zod';
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

// here we can generate the interface based on the defined schema
type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState('');
  return (
    <div className='max-w-xl'>
      {error && (
        <Callout.Root color='red' className='mb-3'>
          {error}
        </Callout.Root>
      )}
      <form
        className='space-y-3'
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post('/api/issues', data);
            router.push('/issues');
          } catch (error) {
            setError('An unexpected error occured');
          }
        })}
      >
        <TextField.Root placeholder='Title' {...register('title')} />
        {errors.title && (
          <Text color='pink' as='p'>
            {errors.title.message}
          </Text>
        )}
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder='Write something here...' {...field} />
          )}
        />
        {errors.description && (
          <Text color='pink' as='p'>
            {errors.description.message}
          </Text>
        )}

        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
