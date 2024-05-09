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

export default function Home() {
  const [carouselMessages, setCarouselMessages] = useState([]);

  useEffect(() => {
    // Fetch or load messages from message.json
    setCarouselMessages(messages);
  }, []);

  return (
    <main className="container mx-auto py-8">
      <section className="text-center mb-8">
        <h1 className="text-4xl font-bold">Dive into the anonymous World</h1>
        <p className="text-lg">text message</p>
      </section>
      <section>
        <Carousel className="w-full max-w-xs mx-auto">
          <CarouselContent>
            {carouselMessages.map((message, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex items-center justify-center p-6">
                      <div>
                        <h2 className="text-xl font-semibold mb-2">{message.title}</h2>
                        <p className="text-gray-700">{message.message}</p>
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
