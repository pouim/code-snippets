// app/og/route.tsx

import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge'; // Crucial for performance!

export async function GET(req: NextRequest) {
    // Get the title from the search parameters
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title') || 'My Awesome Site';

    return new ImageResponse(
        (
            // Design your card using JSX and Tailwind CSS
            <div
                style={{ height: '100%', width: '100%', display: 'flex' }}
                tw="flex-col items-center justify-center bg-gray-900 text-white"
            >
                <h1 tw="text-6xl font-bold leading-tight tracking-tight">
                    {title}
                </h1>
                <p tw="mt-4 text-2xl text-gray-400">
                    From My Cool Blog
                </p>
            </div>
        ),
        // ImageResponse options
        {
            width: 1200,
            height: 630,
        }
    );
}

// app/blog/[slug]/page.tsx
import { Metadata } from 'next';

export async function generateMetadata({ params }): Promise<Metadata> {
    const post = await getPostBySlug(params.slug); // Fetch post data

    return {
        title: post.title,
        openGraph: {
            images: [`/og?title=${encodeURIComponent(post.title)}`],
        },
    };
}