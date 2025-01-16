import { NextResponse } from "next/server";

// const STRAPI_API_URL = "http://localhost:1337/api"; // Replace with your Strapi instance URL
const STRAPI_API_URL = process.env.STRAPI_API_URL; // Replace with your Strapi instance URL

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Invalid Content-Type. Expected multipart/form-data." },
        { status: 400 }
      );
    }

    const formData = await req.formData();

    // Extract fields from the formData object
    const title = formData.get("title") as string;
    const date = formData.get("date") as string;
    const excerpt = formData.get("excerpt") as string | null;
    const content = formData.get("content") as string;
    const thumbnail = formData.get("thumbnail") as File | null;

    if (!title || !date || !content) {
      return NextResponse.json(
        { error: "Missing required fields: title, date, or content." },
        { status: 400 }
      );
    }

    // Convert title to a slug
    const slug = title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^a-z0-9-]/g, "");

    // Upload the thumbnail to Strapi
    let thumbnailId = null;
    if (thumbnail) {
      const uploadData = new FormData();
      uploadData.append("files", thumbnail);

      const uploadResponse = await fetch(`${STRAPI_API_URL}/upload`, {
        method: "POST",
        body: uploadData,
      });

      if (!uploadResponse.ok) {
        return NextResponse.json(
          { error: "Failed to upload thumbnail." },
          { status: 400 }
        );
      }

      const uploadResult = await uploadResponse.json();
      thumbnailId = uploadResult[0]?.id; // Extract the ID of the uploaded file
    }

    // Create the blog post in Strapi
    const blogData = {
      title,
      slug,
      date,
      excerpt: excerpt || "",
      content,
      thumbnail: thumbnailId, // Attach the uploaded file ID
    };

    // const blogResponse = await fetch(`${STRAPI_API_URL}/blogs`, {
      const blogResponse = await fetch(`${STRAPI_API_URL}/blog-posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer YOUR_STRAPI_API_TOKEN`, // Replace with your Strapi API token
      },
      body: JSON.stringify({ data: blogData }),
    });

    if (!blogResponse.ok) {
      return NextResponse.json(
        { error: "Failed to create blog post in Strapi." },
        { status: 400 }
      );
    }

    const blogResult = await blogResponse.json();

    return NextResponse.json(
      { message: "Blog created successfully!", blog: blogResult },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Failed to create blog post", details: error },
      { status: 500 }
    );
  }
}
