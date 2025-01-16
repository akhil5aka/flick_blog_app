const fs = require("fs");
const path = require("path");

// Directory to store the markdown files
const outputDir = path.join(__dirname, "content");

// Ensure the directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to generate markdown content
const generateMarkdownContent = (index) => {
  const title = `Ak test blogs ${index}`;
  const date = new Date().toISOString().split("T")[0]; // Current date in YYYY-MM-DD format
  const excerpt = `Excerpt for blog ${index}`;
  const content = `---\ntitle: "${title}"\ndate: "${date}"\nexcerpt: "${excerpt}"\n---\n\nBlog content for blog ${index}`;
  return content;
};

// Generate 1000 markdown files
for (let i = 1; i <= 1000; i++) {
  const filename = `blog-${i}.md`;
  const filePath = path.join(outputDir, filename);
  const markdownContent = generateMarkdownContent(i);

  // Write the markdown content to a file
  fs.writeFileSync(filePath, markdownContent, "utf8");
  console.log(`Created: ${filePath}`);
}

console.log("All markdown files generated successfully!");
