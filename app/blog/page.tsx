import { loadhomepage, loadposts } from "../api/savepost/api_serivice";
import dotenv from "dotenv";
import Link from "next/link";
import Image from "next/image";
import { Post, PostResponse } from "../../hometypes";
import styles from "../../page.module.css";

dotenv.config();

interface HomePageData {
  data: {
    attributes: {
      title: string;
    };
  };
}

export async function generateMetadata() {
  const postsdata: PostResponse | null = await loadposts();

  const postsMetadata = postsdata?.data.map((post: Post) => ({
    title: post.title || "Flick Network",
    description: post.short_description || "Explore the latest blog posts on Flick Network.",
    openGraph: {
      images: ["/default-image.jpg"], // Default image or dynamically fetched
    },
    twitter: {
      card: "summary_large_image",
    },
  }));

  return postsMetadata[0]; // Return the first metadata object as default
}

export default async function Home() {
  try {
    const homepagedata: HomePageData | null = await loadhomepage();
    const postsdata: PostResponse | null = await loadposts();
    const metadata = await generateMetadata(); // Fetch metadata

    // Hydration fix: Make sure content matches between SSR and CSR
    const title = metadata?.title || "Flick Network";
    const description = metadata?.description || "Explore the latest blog posts on Flick Network";

    return (
      <> 
        <head>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="title" content={title} />
        </head>

        <main className="flex flex-col items-center p-4">
          <header className="items-center">
            <h1 className="text-3xl font-bold mb-6 text-blue-800">
              {homepagedata?.data?.attributes?.title || "Flick Network"}
            </h1>
            <p className="items-center p-2">Welcome to our blog!</p>
          </header>

          <section className="w-full max-w-5xl">
            <h2 className="text-2xl font-semibold mb-6">Blog Posts</h2>
            {postsdata?.data?.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6">
                {postsdata.data.map((post: Post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    passHref
                    className="bg-gray-100 rounded-md shadow-black hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="w-full aspect-auto rounded-lg overflow-hidden drop-shadow shadow-inherit hover:shadow-lg">
                      <Image
                        src={
                          post.image?.formats?.thumbnail?.url
                            ? `${process.env.STRAPI_API}${post.image.formats.thumbnail.url}`
                            : "/placeholder-image.jpg"
                        }
                        alt={post.title}
                        width={500}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className={styles.postContent}>
                      <h3 className="text-2xl font-bold text-gray-700">
                        {post.title}
                      </h3>
                      <p className="text-sm font-bold text-gray-500">
                        {post.short_description}
                      </p>

                      <div className={styles.postMeta}>
                        <p className={styles.postDate}>
                          <strong>Published:</strong>{" "}
                          {new Date(post.publishedAt).toLocaleString()}
                        </p>
                      </div>

                      
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p>No blog posts found.</p>
            )}
          </section>
        </main>
      </>
    );
  } catch (error) {
    console.error("Error fetching homepage or posts data:", error);
    return <div>Error loading content. Please try again later.</div>;
  }
}

export const revalidate = 10;
