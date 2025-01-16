import Image from "next/image";
import { loadPostBySlug, loadposts } from "../../api/savepost/api_serivice";
import { Post, PostResponse } from "../../../hometypes";

interface Props {
  params: Promise<{ slug: string }>; // Make params a Promise
}

export default async function PostDetails({ params }: Props) {
  try {
    const { slug } = await params; // Extract slug from params

    // Fetch the post details by slug
    const postDetailsResponse: PostResponse = await loadPostBySlug(slug);

    // Check if postDetails exists and has the necessary structure
    if (!postDetailsResponse?.data?.length) {
      return <div className="text-center text-red-500">Post not found or data is incomplete.</div>;
    }

    // Extract the post details from the response
    const post: Post = postDetailsResponse.data[0];

    return (


      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        {/* Title Section */}
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{post.title}</h1>

        {/* Image Section */}
        {post.image && (
          <div className="w-full overflow-hidden rounded-md shadow-md mb-6">
            <Image
              src={
                post.image.formats?.thumbnail?.url
                  ? process.env.STRAPI_API + post.image.formats.thumbnail.url
                  : "/placeholder-image.jpg"
              } 
              alt={post.title}
              width={800}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Content Section */}
        <div className="space-y-4">
          {post.content.map((contentBlock, index) => (
            <p key={index} className="text-gray-700 text-base leading-relaxed">
              {contentBlock.children.map((child, childIndex) => (
                <span key={childIndex}>{child.text}</span>
              ))}
            </p>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading post details:", error);
    return (
      <div className="text-center text-red-600">
        Error loading post details. Please try again later.
      </div>
    );
  }
}

export async function generateStaticParams() {
  try {
    // Fetch posts to generate static paths
    const postPaths: PostResponse = await loadposts();

    if (!postPaths?.data?.length) {
      console.warn("No posts found or invalid data structure.");
      return []; // Return empty array if no valid posts are found
    }

    // Map the post slugs for static paths
    return postPaths.data.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return []; // Return empty array to avoid build failure
  }
}

export const revalidate = 10;
