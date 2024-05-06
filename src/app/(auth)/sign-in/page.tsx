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

  // zod implementation
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const result = await signIn('credentials', {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });
    if (result?.error) {
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

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-md w-full">
        <div className="p-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Join Anonymous Confession</h1>
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
                  <FormLabel>Email/username</FormLabel>
                  <FormControl>
                    <Input placeholder="Email/username" {...field} />
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
                    <Input placeholder="Password" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-center">
              <Button type="submit">Signin</Button>
            </div>
          </form>
        </Form>
        <div className="p-6 text-center text-gray-600">
          <p>
            Already a member?{' '}
            <Link href={'/sign-up'} className="text-blue-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
