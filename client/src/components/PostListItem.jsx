import Image from "./Image"
import { Link } from "react-router-dom"
import { format } from "timeago.js";


const PostListItem = ({post}) => {

  return (
    <div className='flex flex-col xl:flex-row gap-8 mb-12'>

      {/* image */}
      {post.img && <div className="md:hidden xl:block xl:w-1/3">
        <Image
          src={post.img}
          className="rounded-2xl object-cover"
          w="735"
          // largest screen size w/ image is 767px
          // padding from main layout for small size is 16px (px-4)
          // 767-16-16=735
          // max image size that we can have is 735px
        />
      </div>}

      {/* details */}
      <div className="flex flex-col gap-4 xl:w-2/3">
        <Link to={`/${post.slug}`} className="text-4xl font-semibold">
          {post.title}
        </Link>
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <span>Written by</span>
          <Link className="text-blue-800">{post.user.username}</Link>
          <span>on</span>
          <Link className="text-blue-800">{post.category}</Link>
          <span>{format(post.createdAt)}</span>
        </div>
      <p>
        {post.desc}
      </p>
      <Link to={`/${post.slug}`} className="underline text-blue-800 text-sm">Read More</Link>
      </div>
    </div>
  )
}

export default PostListItem