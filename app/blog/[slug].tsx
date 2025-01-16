import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  // Asynchronously process the file path and content
  const filePath = path.join(process.cwd(), "content", `${params.slug}.md`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`File for slug ${params.slug} does not exist.`);
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");

  // Parse content and metadata
  const { content, data: metadata } = matter(fileContent);

  return (
    <div>
      <h1>{metadata.title}</h1>
      <p>{metadata.date}</p>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
