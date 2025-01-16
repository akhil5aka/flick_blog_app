// import fs from 'fs';
// import path from 'path';
// import matter from 'gray-matter';
// import { MDXRemote } from 'next-mdx-remote';

// export async function getStaticPaths() {
//     const files = fs.readdirSync(path.join(process.cwd(), 'content'));
//     const paths = files.map((file) => ({
//         params: { slug: file.replace('.md', '') },
//     }));
//     return { paths, fallback: false };
// }

// export async function getStaticProps({ params }) {
//     const filePath = path.join(process.cwd(), 'content', `${params.slug}.md`);
//     const fileContent = fs.readFileSync(filePath, 'utf-8');
//     const { content, data } = matter(fileContent);

//     return { props: { content, data } };
// }

// export default function BlogPage({ content, data }) {
//     return (
//         <article>
//             <h1>{data.title}</h1>
//             <MDXRemote source={content} />
//         </article>
//     );
// }
