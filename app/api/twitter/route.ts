// app/api/twitter/route.ts
import { NextResponse } from 'next/server';
import { TwitterApi } from 'twitter-api-v2';

export async function GET(request: Request) {
  console.log("API route hit"); // Debug log

  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }

  console.log("Username:", username); // Debug log

  // Temporarily return a test response
  return NextResponse.json({ message: "Test response", username });

  // Rest of the code commented out for now
  /*
  const client = new TwitterApi(process.env.TWITTER_BEARER_TOKEN as string);

  try {
    const user = await client.v2.userByUsername(username);
    if (!user.data || !user.data.id) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const tweets = await client.v2.userTimeline(user.data.id, {
      exclude: ['replies', 'retweets'],
      max_results: 10,
    });

    const formattedTweets = tweets.data.data.map(tweet => ({
      id: tweet.id,
      text: tweet.text
    }));

    return NextResponse.json(formattedTweets);
  } catch (error) {
    console.error('Error fetching tweets:', error);
    return NextResponse.json({ error: 'Error fetching tweets' }, { status: 500 });
  }
  */
}