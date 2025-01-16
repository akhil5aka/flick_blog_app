import { GetServerSideProps } from "next";
import axios from "axios";

// Define a type for the API response data
type Post = {
  slug: string;
  updatedAt: string;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = process.env.baseUrl; // Make sure this is defined in your .env file
  const siteurl = process.env.siteURl; // Make sure this is defined in your .env file

  // Ensure the environment variables are set
  if (!baseUrl || !siteurl) {
    console.error("Missing environment variables: BASE_URL or SITE_URL");
    res.statusCode = 500;
    res.end("Internal Server Error");
    return { props: {} };
  }

  try {
    // Fetch posts from the API
    // const apiEndpoint = `${baseUrl}/api/posts`;
    const apiEndpoint = `${baseUrl}/api/blog-posts`;
    console.log("API Endpoint:", apiEndpoint); // Useful for development

    const response = await axios.get(apiEndpoint);

    // Check if the response contains valid data
    if (!response.data || !Array.isArray(response.data.data)) {
      console.error("Invalid API response format", response.data);
      res.statusCode = 500;
      res.end("Internal Server Error");
      return { props: {} };
    }

    const posts: Post[] = response.data.data;

    // If there are no posts, return an empty sitemap
    if (posts.length === 0) {
      console.warn("No posts found.");
    }

    // Build the XML sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${siteurl}/</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      ${posts
        .map((post) => {
          // Ensure post properties are defined before using them
          if (!post.slug || !post.updatedAt) {
            console.error("Missing data in post", post);
            return ''; // Skip the current post if data is incomplete
          }
          return `
            <url>
              <loc>${siteurl}/blog/${post.slug}</loc>
              <lastmod>${new Date(post.updatedAt).toISOString()}</lastmod>
              <changefreq>daily</changefreq>
              <priority>0.8</priority>
            </url>
          `;
        })
        .join("")}
    </urlset>`;

    // Set the response header for XML content and send the sitemap
    res.setHeader("Content-Type", "application/xml");
    res.write(sitemap);
    res.end();

    return {
      props: {}, // No props needed
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    if (axios.isAxiosError(error)) {
      console.error("Axios error details:", error.response?.data || error.message);
    }
    res.statusCode = 500;
    res.end("Internal Server Error");
    return { props: {} };
  }
};

const Sitemap = () => null;
export default Sitemap;
