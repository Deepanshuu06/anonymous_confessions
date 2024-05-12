    // interfaces.ts
export interface Message {
    message: string;
  }
  

export function getRandomMessage(messages: Message[]): string {
    // Generate a random index within the range of the array's length
    const randomIndex = Math.floor(Math.random() * messages.length);
    // Return the message at the randomly generated index
    return messages[randomIndex].message;
  }