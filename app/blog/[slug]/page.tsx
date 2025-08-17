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