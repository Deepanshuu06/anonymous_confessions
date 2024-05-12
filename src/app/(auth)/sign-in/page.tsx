'use client';
import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import Link from 'next/link';

import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';

import { signInSchema } from '@/Schemas/signInSchema';
import { signIn } from 'next-auth/react';

const Page = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting , setIsSubmitting] = useState(false)

  // zod implementation
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true)
    const result = await signIn('credentials', {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });
    if (result?.error) {
      setIsSubmitting(false)
      toast({
        title: 'login faild',
        description: 'incorrect user or pass',
        variant: 'destructive',
      });
    }
    if (result?.url) {
      router.replace('/dashboard');
    }
  };

  return ( <div className="bg-gray-50 min-h-screen flex items-center justify-center">
  <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-md w-full">
    <div className="p-6 text-center">
      <h1 className="text-4xl font-bold mb-4 text-violet-500">Join Anonymous Confession</h1>
      <p className="text-gray-600 mb-4">
        Share your thoughts anonymously. Sign up to start confessing.
      </p>
    </div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-8">
        <FormField
          name="identifier"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email/Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="Email/Username"
                  {...field}
                  autoFocus
                  className="border border-gray-300 rounded-md w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Password"
                  {...field}
                  autoFocus
                  type="password"
                  className="border border-gray-300 rounded-md w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      <div className="text-center">
              <Button type="submit" disabled={isSubmitting} className="bg-violet-500 hover:bg-violet-700 text-white px-4 py-2 rounded-md">
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin mr-2 h-5 w-5 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.373A8.001 8.001 0 0120 12h-4a4 4 0 00-4-4V0c-2.21 0-4 1.79-4 4h4zm10 2.627A8.001 8.001 0 014 12h4a4 4 0 004 4v4c2.21 0 4-1.79 4-4h-4z"></path>
                    </svg>
                    Please wait
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </div>
      </form>
    </Form>
    <div className="p-6 text-center text-gray-600">
      <p>
        Already a member?{' '}
        <Link href={'/sign-up'} className="text-violet-800">
          Sign Up
        </Link>
      </p>
      <Link href={'/'} className="text-blue-500">
        <Button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md mt-6">
          Back to Home
        </Button>
      </Link>
    </div>
  </div>
</div>
);
};
export default Page;
