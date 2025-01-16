import { HomePageData, PostResponse, SlugPath } from "../../../hometypes"; // Import the types


interface PostData {
    attributes: {
      slug: string;
      [key: string]: unknown; // Add other attributes if needed
    };
  }


// const STRAPI_API_URL = "http://localhost:1337/api";

const STRAPI_API_URL = process.env.STRAPI_API_URL;


// Function to load homepage data
export const loadhomepage = async (): Promise<HomePageData> => {
  try {
    const response = await fetch(`${STRAPI_API_URL}/home-page`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch homepage data: ${response.statusText}`);
    }

    return await response.json(); // Return the typed data
  } catch (err) {
    console.error("Error fetching homepage data:", err);
    throw new Error("Could not load homepage data.");
  }
};

// Function to load posts data
export const loadposts = async (): Promise<PostResponse> => {
  try {
    // const response = await fetch(`${STRAPI_API_URL}/posts?populate=image`, {
      const response = await fetch(`${STRAPI_API_URL}/blog-posts?populate=image`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }

    return await response.json(); // Return the typed data
  } catch (err) {
    console.error("Error fetching posts:", err);
    throw new Error("Could not load posts data.");
  }
};

// Function to load a single post by slug
export const loadPostBySlug = async (slug: string): Promise<PostResponse> => {
  try {
    const response = await fetch(
      // `${STRAPI_API_URL}/posts?filters[slug][$eq]=${slug}&populate=image`
      `${STRAPI_API_URL}/blog-posts?filters[slug][$eq]=${slug}&populate=image`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch post data");
    }

    return await response.json(); // Return the typed data
  } catch (err) {
    console.error("Error fetching post by slug:", err);
    throw new Error("Could not load post data.");
  }
};

// Function to load all slugs for generating static paths
export const loadapaths = async (): Promise<SlugPath[]> => {
  try {
    // const response = await fetch(`${STRAPI_API_URL}/posts`, {
      const response = await fetch(`${STRAPI_API_URL}/blog-posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch paths: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data.map((post: PostData) => ({
      slug: post.attributes.slug,
    }));
  } catch (err) {
    console.error("Error fetching slugs for paths:", err);
    throw new Error("Could not load paths.");
  }
};
