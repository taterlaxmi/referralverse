import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const redditUrl = 'https://www.reddit.com/r/IndiaReferral/new.json?limit=50';
    
    const response = await fetch(redditUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 ReferralVerse/1.0.0',
      },
      // Next.js cache for 1 hour to prevent rate limits
      next: { revalidate: 3600 } 
    });

    if (!response.ok) {
      throw new Error(`Reddit API returned status: ${response.status}`);
    }

    const data = await response.json();
    
    // Exact match for the requested Reddit Flair: Referral Code 🔑
    const posts = data.data.children
      .filter((post: any) => {
        const flair = post.data.link_flair_text || '';
        return flair === 'Referral Code 🔑' || flair.toLowerCase() === 'referral code';
      })
      .map((post: any) => ({
        title: post.data.title,
        description: post.data.selftext,
      }));

    // Just take the top 10 relevant posts to save LLM context window tokens
    const topPosts = posts.slice(0, 10);

    // If Gemini API Key is missing, return raw posts (or error)
    if (!process.env.GEMINI_API_KEY) {
      console.warn("GEMINI_API_KEY is not set. Returning raw Reddit posts.");
      return NextResponse.json({ success: true, deals: [], rawPosts: topPosts, warning: "LLM not configured" });
    }

    // Prepare content for LLM
    const promptText = `
    You are an AI assistant that extracts referral codes and deals from Reddit posts.
    I will provide you with a list of Reddit posts. Each post has a title and a description.
    Please extract the application name, the referral code, the sign up bonus, and the referral bonus for each post.
    Return the result strictly as a valid JSON array of objects.
    Each object must have the following keys:
    - "application": string
    - "code": string (the referral code to use)
    - "signUpBonus": string (the bonus the new user gets, e.g. "Rs 100" or "N/A" if not specified)
    - "referralBonus": string (the bonus the referrer gets, or "N/A" if not specified)
    
    If a post does not contain a clear referral code, skip it.
    Output ONLY the JSON array without any markdown formatting, backticks, or extra text.
    
    Reddit Posts:
    ${JSON.stringify(topPosts)}
    `;

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
    
    const llmResponse = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: promptText }] }],
        generationConfig: {
            responseMimeType: "application/json",
        }
      })
    });

    if (!llmResponse.ok) {
      const errText = await llmResponse.text();
      console.error("Gemini API Error:", errText);
      throw new Error(`Gemini API Error: ${errText.slice(0, 100)}...`);
    }

    const llmData = await llmResponse.json();
    const rawJsonText = llmData.candidates?.[0]?.content?.parts?.[0]?.text || "[]";
    
    let processedDeals = [];
    try {
      processedDeals = JSON.parse(rawJsonText);
    } catch (e) {
      console.error("Failed to parse LLM JSON output:", rawJsonText);
      throw new Error("Failed to parse extracted deals from AI response.");
    }

    return NextResponse.json({ success: true, deals: processedDeals });
  } catch (error: any) {
    console.error('Error fetching Reddit referrals:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to process referral codes',
      diagnostics: error.message 
    }, { status: 500 });
  }
}
