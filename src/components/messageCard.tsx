import React from 'react';
import { Message } from '@/model/User.model';
import { Button } from '@/components/ui/button';

interface MessageCardProps {
  message: Message;
  onMessageDelete: (messageId: string) => void;
}

const MessageCard: React.FC<MessageCardProps> = ({ message, onMessageDelete }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-md">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{JSON.stringify(message)}</h3>
        <Button onClick={() => onMessageDelete(message._id)}>Delete</Button>
      </div>
      <p className="mt-2">{message.content}</p>
    </div>
  );
};

export default MessageCard;
