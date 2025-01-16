module.exports = {

"[project]/app/api/savepost/api_serivice.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "loadPostBySlug": (()=>loadPostBySlug),
    "loadapaths": (()=>loadapaths),
    "loadhomepage": (()=>loadhomepage),
    "loadposts": (()=>loadposts)
});
// const STRAPI_API_URL = "http://localhost:1337/api";
const STRAPI_API_URL = process.env.STRAPI_API_URL;
const loadhomepage = async ()=>{
    try {
        const response = await fetch(`${STRAPI_API_URL}/home-page`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
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
const loadposts = async ()=>{
    try {
        // const response = await fetch(`${STRAPI_API_URL}/posts?populate=image`, {
        const response = await fetch(`${STRAPI_API_URL}/blog-posts?populate=image`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
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
const loadPostBySlug = async (slug)=>{
    try {
        const response = await fetch(// `${STRAPI_API_URL}/posts?filters[slug][$eq]=${slug}&populate=image`
        `${STRAPI_API_URL}/blog-posts?filters[slug][$eq]=${slug}&populate=image`);
        if (!response.ok) {
            throw new Error("Failed to fetch post data");
        }
        return await response.json(); // Return the typed data
    } catch (err) {
        console.error("Error fetching post by slug:", err);
        throw new Error("Could not load post data.");
    }
};
const loadapaths = async ()=>{
    try {
        // const response = await fetch(`${STRAPI_API_URL}/posts`, {
        const response = await fetch(`${STRAPI_API_URL}/blog-posts`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch paths: ${response.statusText}`);
        }
        const data = await response.json();
        return data.data.map((post)=>({
                slug: post.attributes.slug
            }));
    } catch (err) {
        console.error("Error fetching slugs for paths:", err);
        throw new Error("Could not load paths.");
    }
};
}}),
"[project]/app/blog/[slug]/page.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>PostDetails),
    "generateStaticParams": (()=>generateStaticParams),
    "revalidate": (()=>revalidate)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/image.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$savepost$2f$api_serivice$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/api/savepost/api_serivice.ts [app-rsc] (ecmascript)");
;
;
;
async function PostDetails({ params }) {
    try {
        const { slug } = await params; // Extract slug from params
        // Fetch the post details by slug
        const postDetailsResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$savepost$2f$api_serivice$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["loadPostBySlug"])(slug);
        // Check if postDetails exists and has the necessary structure
        if (!postDetailsResponse?.data?.length) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center text-red-500",
                children: "Post not found or data is incomplete."
            }, void 0, false, {
                fileName: "[project]/app/blog/[slug]/page.tsx",
                lineNumber: 18,
                columnNumber: 14
            }, this);
        }
        // Extract the post details from the response
        const post = postDetailsResponse.data[0];
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-2xl font-bold text-gray-800 mb-4",
                    children: post.title
                }, void 0, false, {
                    fileName: "[project]/app/blog/[slug]/page.tsx",
                    lineNumber: 29,
                    columnNumber: 9
                }, this),
                post.image && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full overflow-hidden rounded-md shadow-md mb-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        src: post.image.formats?.thumbnail?.url ? process.env.STRAPI_API + post.image.formats.thumbnail.url : "/placeholder-image.jpg",
                        alt: post.title,
                        width: 800,
                        height: 400,
                        className: "w-full h-auto object-cover"
                    }, void 0, false, {
                        fileName: "[project]/app/blog/[slug]/page.tsx",
                        lineNumber: 34,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/blog/[slug]/page.tsx",
                    lineNumber: 33,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: post.content.map((contentBlock, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-700 text-base leading-relaxed",
                            children: contentBlock.children.map((child, childIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: child.text
                                }, childIndex, false, {
                                    fileName: "[project]/app/blog/[slug]/page.tsx",
                                    lineNumber: 53,
                                    columnNumber: 17
                                }, this))
                        }, index, false, {
                            fileName: "[project]/app/blog/[slug]/page.tsx",
                            lineNumber: 51,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/blog/[slug]/page.tsx",
                    lineNumber: 49,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/blog/[slug]/page.tsx",
            lineNumber: 27,
            columnNumber: 7
        }, this);
    } catch (error) {
        console.error("Error loading post details:", error);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center text-red-600",
            children: "Error loading post details. Please try again later."
        }, void 0, false, {
            fileName: "[project]/app/blog/[slug]/page.tsx",
            lineNumber: 63,
            columnNumber: 7
        }, this);
    }
}
async function generateStaticParams() {
    try {
        // Fetch posts to generate static paths
        const postPaths = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$savepost$2f$api_serivice$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["loadposts"])();
        if (!postPaths?.data?.length) {
            console.warn("No posts found or invalid data structure.");
            return []; // Return empty array if no valid posts are found
        }
        // Map the post slugs for static paths
        return postPaths.data.map((post)=>({
                slug: post.slug
            }));
    } catch (error) {
        console.error("Error generating static params:", error);
        return []; // Return empty array to avoid build failure
    }
}
const revalidate = 10;
}}),
"[project]/app/blog/[slug]/page.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_export_namespace__(__turbopack_import__("[project]/app/blog/[slug]/page.tsx [app-rsc] (ecmascript)"));
}}),
"[project]/.next-internal/server/app/blog/[slug]/page/actions.js [app-rsc] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),

};

//# sourceMappingURL=_c4e930._.js.map