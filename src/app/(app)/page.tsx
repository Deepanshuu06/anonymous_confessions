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

// Define the type of your message object
interface Message {
  title: string;
  message: string;
}

export default function Home() {
  const [carouselMessages, setCarouselMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Fetch or load messages from message.json
    setCarouselMessages(messages);
  }, []);

  return (
    <main className="container mx-auto py-8 mt-11">
      <section className="text-center mb-8">
        <h1 className="text-4xl font-bold">Dive into the anonymous World</h1>
        <p className="text-lg">text message</p>
      </section>
      <section>
        <Carousel className="w-full max-w-6xl mx-auto" > {/* Adjusted max-width for larger screens */}
          <CarouselContent>
            {carouselMessages.map((message, index) => (
              <CarouselItem key={index}>
                <div className="p-4 md:p-8"> {/* Increased padding for bigger card style on desktop */}
                  <Card className='h-80 flex'>
                    <CardContent className="flex items-center justify-center p-8"> {/* Increased padding for bigger card style */}
                      <div>
                        <h2 className="text-2xl text-red-600 md:text-4xl font-semibold mb-4">{message.title}</h2> {/* Increased font size on desktop */}
                        <p className="text-gray-700 items-center">{message.message}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
    </main>
  );
}


