import type { Post } from "@/types";
import { Link } from "react-router";

interface PostProps {
  posts: Post[];
}

const imageUrl = import.meta.env.VITE_IMG_URL;

function BlogCard({ posts }: PostProps) {
  return (
    <div className="my-8 grid grid-cols-1 gap-8 px-4 md:grid-cols-2 md:px-0 lg:grid-cols-3">
      {posts.map((post) => (
        <Link to={`/blogs/${post.id}`} key={post.id}>
          <img
            src={imageUrl + post.image}
            alt="Blog Post"
            className="mb-4 w-full rounded-2xl"
            loading="lazy"
            decoding="async"
          />
          <h3 className="ml-4 line-clamp-1 font-semibold">{post.title}</h3>
          <div className="mt-2 ml-4 text-sm">
            <span className="">
              by <span className="font-semibold">{post.author.fullName} </span>{" "}
              on
              <span className="font-semibold"> {post.updatedAt}</span>
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default BlogCard;
