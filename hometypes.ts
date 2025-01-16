export interface HomePageData {
    data: {
      attributes: {
        title: string;
      };
    };
  }
  
  export interface Post {
    id: string | number;
    title: string;
    short_description: string;
    content: {
      children: { text: string }[];
    }[];
    publishedAt: string;
    slug: string;
    image?: {
      formats?: {
        thumbnail?: {
          url: string;
        };
      };
    };
  }
  
  export interface PostResponse {
    data: Post[];
  }
  
  export interface SlugPath {
    slug: string;
  }
  