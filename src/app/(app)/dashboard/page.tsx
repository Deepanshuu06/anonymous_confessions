'use client';

import { acceptMessageSchema } from '@/Schemas/acceptMessageSchema';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Message } from '@/model/usermodel';
import { ApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import axios, { AxiosError } from 'axios';
import { Loader2, RefreshCcw } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import MessageCard from '@/components/messageCard';
import { useRouter } from 'next/navigation'; // Changed from 'next/navigation'
import {TwitterShareButton, WhatsappShareButton} from 'react-share'
import { WhatsappIcon,FacebookIcon } from "react-share"; // Import react-share icons
import { Typewriter } from 'react-simple-typewriter'



const Page = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);
  const [isShareMenuOpen , setIsShareMenuOpen] = useState(false)


  const { toast } = useToast();
  const { data: session } = useSession();
  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
  });

  const { register, watch, setValue } = form;
  const acceptMessages = watch('acceptMessages');

  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get<ApiResponse>('/api/accept-message');
      setValue('acceptMessages', response.data.isAcceptingMessages);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: 'Error',
        description: axiosError.response?.data.message || 'Failed to fetch message setting',
        variant: 'destructive',
      });
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue, toast]);

  const fetchMessages = useCallback(
    async (refresh = false) => {
      setIsLoading(true);
      setIsSwitchLoading(false);
      try {
        const response = await axios.get<ApiResponse>('/api/get-messages');
        setMessages(response.data.messages || []);
        console.log(messages);
        if (refresh) {
          toast({
            title: 'Refreshed Messages',
            description: 'Showing Latest Messages',
          });
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast({
          title: 'Error',
          description: axiosError.response?.data.message || 'Failed to fetch message setting',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
        setIsSwitchLoading(false);
      }
    },
    [toast],
  );

  useEffect(() => {
    if (!session || !session.user) return;
    fetchAcceptMessage();
    fetchMessages();

  }, [session, fetchMessages, fetchAcceptMessage]);

  

  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>('/api/accept-message', {
        acceptMessages: !acceptMessages,
      });
      setValue('acceptMessages', !acceptMessages);
      toast({
        title: response.data.message,
        variant: 'default',
      });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: 'Error',
        description: axiosError.response?.data.message || 'Failed to fetch message setting',
        variant: 'destructive',
      });
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(profileUrl)
      .then(() => {
        toast({
          title: 'Link copied!',
          variant: 'default',
        });
      })
      .catch(() => {
        toast({
          title: 'Error',
          description: 'Failed to copy link.',
          variant: 'destructive',
        });
      });
  };

  const handleDeleteMessage = useCallback((messageId: string) => {
    const updatedMessages = messages.filter((message) => message._id !== messageId);
    setMessages(updatedMessages);
  }, [messages]);

  const username = session?.user?.username || '';

  const profileUrl = `${process.env.NEXT_PUBLIC_PROFILE_BASE_URL}/u/${username}`;

const router = useRouter();
  if (!session) {
    router.replace('/');
  }

  const handleShareMenu = ()=>{
    setIsShareMenuOpen(!isShareMenuOpen)
    
  }
  return (

    <div className='my-8 mx-auto md:mx-6 lg:mx-auto p-6 rounded-2xl max-w-6xl overflow-y-auto'>
      <h1 className='text-2xl lg:text-4xl font-bold text-center'>
        {/* Life is simple {' '} */}
        <span className='text-xl lg:text-4xl text-red-400 font-bold overflow-hidden'>
          {/* Style will be inherited from the parent element */}
          <Typewriter
           words={[`Hello @${username}`, 'Share Profile Link', 'Receive Anon Messages', 'From Your' , 'Friends']}
            loop={true}
            cursor
            cursorStyle='|'
            typeSpeed={50}
            deleteSpeed={30}
            delaySpeed={1000}

          />
        </span>
      </h1>
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-red-100 rounded-2xl max-w-6xl overflow-y-auto">
  
      <div className="mb-4 ">
      <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
        <h2 className="text-lg font-semibold mb-2">Copy Your Unique Link</h2>{' '}
        <div className="flex items-center w-full">
          <input
            type="text"
            value={profileUrl} // Placeholder value
            disabled
            className="input input-bordered w-full p-2 mr-2 text-pink-700"
          />
          <div className='flex gap-4'>

          
          <Button onClick={handleCopyLink} className='bg-pink-500 hover:bg-pink-700'>Copy</Button> {/* Placeholder onClick function */}
          <Button onClick={handleShareMenu} className='bg-pink-500 hover:bg-pink-700 '>Share</Button> {/* Placeholder onClick function */}
          </div>
        </div>
      </div>

      {isShareMenuOpen && (
        <div className='absolute z-50 w-[50%] lg:w-[20%] bg-red-50 rounded-2xl shadow-md p-4 right-9 lg:right-40 flex items-center flex-col'>
          <WhatsappShareButton url={`${profileUrl} Hey, send me an anonymous message or ask me anything!`}>
            <Button className='w-full bg-green-500 mb-2 w-40'>Share on Whatsapp</Button>  
          </WhatsappShareButton>
          <TwitterShareButton url={`${profileUrl} Hey, send me an anonymous message or ask me anything!`}>
            <Button className='w-full bg-blue-200 w-40'>Share on Twitter</Button>
          </TwitterShareButton>
        </div>
      )}
      <div className="mb-4">
        <Switch
          {...register('acceptMessages')}
          checked={acceptMessages}
          onCheckedChange={handleSwitchChange}
          disabled={isSwitchLoading}
        />
        <span className="ml-2">Accept Messages: {acceptMessages ? 'On' : 'Off'}</span>
      </div>
      <Separator />

      <Button
        className="mt-4"
        variant="outline"
        onClick={(e) => {
          e.preventDefault();
          fetchMessages(true);
        }}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RefreshCcw className="h-4 w-4" />
        )}
      </Button>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <MessageCard
              key={message._id as string}
              message={message}
              onMessageDelete={handleDeleteMessage}
            />
          ))
        ) : (
          <p>No messages to display.</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default Page;
