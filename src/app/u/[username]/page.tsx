'use client';import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CardHeader, CardContent, Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import * as z from 'zod';
import { ApiResponse } from '@/types/ApiResponse';
import Link from 'next/link';
import { messageSchema } from '@/Schemas/messageSchema';
import { useParams } from 'next/navigation'; // Importing useParams from next/router

type Params = {
  username: string;
};

const specialChar = '||';

const parseStringMessages = (messageString: string): string[] => {
  return messageString.split(specialChar);
};

const initialMessageString =
  "What's your favorite movie?||Do you have any pets?||What's your dream job?";

export default function SendMessage() {
  const [isLoading, setIsLoading] = useState(false);
  const [messageContent, setMessageContent] = useState('');

  const params = useParams<Params>();
  const username = params.username;

  const [completion, setCompletion] = useState(initialMessageString);
  const [isSuggestLoading, setIsSuggestLoading] = useState(false);
  const [error, setError] = useState<AxiosError<ApiResponse, any> | null>(null); // Define explicit type for error state variable

  const handleMessageClick = (message: string) => {
    setMessageContent(message);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    if (isLoading) return;

    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse>('/api/send-message', {
        content: messageContent,
        username,
      });
      console.log('Form submitted');
      toast({
        title: response.data.message,
        variant: 'default',
      });
      setMessageContent('');
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: 'Error',
        description: axiosError.response?.data.message ?? 'Failed to send message',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSuggestedMessages = async () => {
    try {
      setIsSuggestLoading(true);
      const response = await axios.get('/api/suggest-messages');
      setCompletion(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError(error as AxiosError<ApiResponse, any>);
    } finally {
      setIsSuggestLoading(false);
    }
  };

  return (
    <div className="container mx-auto my-8 p-6 bg-white rounded max-w-4xl">
      <h1 className="text-4xl font-bold mb-6 text-center">Public Profile Link</h1>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block">
              Send Anonymous Message to @{username}
              <Textarea
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                placeholder="Write your anonymous message here"
                className="resize-none"
              />
            </label>
          </div>
          <div className="flex justify-center">
            <Button type="submit" disabled={isLoading || !messageContent}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                'Send It'
              )}
            </Button>
          </div>
        </div>
      </form>

      <div className="space-y-4 my-8">
        <div className="space-y-2">
          <Button onClick={fetchSuggestedMessages} className="my-4" disabled={isSuggestLoading}>
            Suggest Messages
          </Button>
          <p>Click on any message below to select it.</p>
        </div>
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold">Messages</h3>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4">
            {error ? (
              <p className="text-red-500">{error.message}</p>
            ) : (
              parseStringMessages(completion).map((message, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="mb-2"
                  onClick={() => handleMessageClick(message)}
                >
                  {message}
                </Button>
              ))
            )}
          </CardContent>
        </Card>
      </div>
      <Separator className="my-6" />
      <div className="text-center">
        <div className="mb-4">Get Your Message Board</div>
        <Link href={'/sign-up'}>
          <Button>Create Your Account</Button>
        </Link>
      </div>
    </div>
  );
}