'use client'

import { Button, TextField, Callout, Text, Spinner } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import React from 'react';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createIssueSchema } from '@/app/validationSchemas';


type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({ resolver: zodResolver(createIssueSchema) });

  const [error, setError] = useState('');
const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <div className='max-w-xl' >
      {error && <Callout.Root color="red" className='mb-5'>
        <Callout.Text >
          {'You will need admin privileges to install and access this application.'}
        </Callout.Text>
      </Callout.Root>
      }
      <form
        className='space-y-3'
        onSubmit={handleSubmit(async (data) => {
          try {
            setIsSubmitting(true);
            await axios.post('/api/issues', data);
            router.push('/issues');
          } catch (error) {
            setIsSubmitting(false);
            setError('An unexpected error occurred/ Please try again later');
          }
        })}>
        <TextField.Root placeholder="Title" {...register('title')}>
          {errors.title && <Text color="red" as="p">{errors.title.message}</Text>}
        </TextField.Root>

        <Controller
          name='description'
          control={control}
          render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
        />
        {errors.description && <Text color="red" as="p">{errors.description.message}</Text>}
        <Button disabled={isSubmitting}>Submit New Issue{isSubmitting && <Spinner />}</Button>
      </form>
    </div>
  )
}

export default NewIssuePage