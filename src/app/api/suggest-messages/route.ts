import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const prompt =
      "Imagine you're hosting a lively discussion on an anonymous social platform like Qooh.me. Craft three thought-provoking questions designed to spark engaging conversations among a diverse audience. Each question should be separated by ''. Focus on universal topics that foster curiosity and positivity. For instance, consider asking about favorite childhood memories, dream travel destinations, or unique talents people possess. Remember to keep the atmosphere welcoming and inclusive. Your output should resemble this format: What's your fondest childhood memory?||If you could visit any place in the world, where would you go?||What's a talent you wish you had?";

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-instruct',
      max_tokens: 50,
      stream: true,
      messages: [{ role: 'user', content: prompt }],
    });
    const stream = OpenAIStream(response);

    return new StreamingTextResponse(stream);
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      const { name, status, headers, message } = error;
      console.error('OpenAI API Error:', error.message);
      return NextResponse.json({ name, status, headers, message }, { status });
    } else {
      console.error('An Unexpected error occurred:', error);
    }
  }
}
