import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';

export async function POST(req: NextRequest) {
  try {
    const { username } = await req.json();

    if (!username) {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    const url = `https://www.instagram.com/${username}/`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // Extract follower count
    const followerCount = parseInt($('meta[name="description"]').attr('content')?.match(/(\d+) Followers/)?.[1] || '0', 10);

    // Extract recent posts
    const posts = $('article img').slice(0, 12).map((_, el) => ({
      likes: parseInt($(el).attr('alt')?.match(/(\d+) likes/)?.[1] || '0', 10),
      comments: parseInt($(el).attr('alt')?.match(/(\d+) comments/)?.[1] || '0', 10),
    })).get();

    // Calculate engagement rate
    const totalEngagement = posts.reduce((sum, post) => sum + post.likes + post.comments, 0);
    const averageEngagement = totalEngagement / posts.length;
    const engagementRate = (averageEngagement / followerCount) * 100;

    return NextResponse.json({
      username,
      followerCount,
      engagementRate: engagementRate.toFixed(2),
      postCount: posts.length,
    });
  } catch (error) {
    console.error('Error scraping Instagram:', error);
    return NextResponse.json({ error: 'Failed to fetch Instagram data' }, { status: 500 });
  }
}