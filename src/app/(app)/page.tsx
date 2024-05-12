'use client'
import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import messages from '@/message.json';
import { User } from '@/model/usermodel';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // Changed from 'next/navigation'
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Define the type of your message object
interface Message {
  title: string;
  message: string;
}

export default function Home() {
  const [carouselMessages, setCarouselMessages] = useState<Message[]>([]);
  const router = useRouter();
  const { data: session } = useSession();
  const user: User = session?.user as User;

  useEffect(() => {
    // Fetch or load messages from message.json
    setCarouselMessages(messages);
  }, []);

  return (
    <main className="container mx-auto py-8 mt-11">
      <section className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-violet-800">Dive into the Anonymous World</h1>
        {session?.user && 
          <Link href="/dashboard">
            <Button className="bg-red-600 text-white mt-10 md:mt-14">Go to Dashboard</Button>
          </Link>}
        <p className="text-lg text-gray-600 mt-10 md:mt-8">Welcome to our platform. Explore and connect!</p>
      </section>
      <section>
        <Carousel className="w-full max-w-screen-xl mx-auto">
          <CarouselContent>
            {carouselMessages.map((message, index) => (
              <CarouselItem key={index}>
                <div className="p-4 md:p-6 ">
                  <Card className="h-full shadow-lg min-h-52 ">
                    <CardContent className="flex items-center justify-center p-6">
                      <div className='min-h-52'>
                        <h2 className="text-2xl md:text-3xl text-violet-500 font-semibold mb-4 text-center">{message.title}</h2>
                        <p className="text-gray-700 text-center">{message.message}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:block bg-gray-200 rounded-full p-2 md:p-3 absolute top-1/2 left-2 transform -translate-y-1/2 shadow-lg" />
          <CarouselNext className="hidden md:block bg-gray-200 rounded-full p-2 md:p-3 absolute top-1/2 right-2 transform -translate-y-1/2 shadow-lg" />
        </Carousel>
      </section>
    </main>
  );
}