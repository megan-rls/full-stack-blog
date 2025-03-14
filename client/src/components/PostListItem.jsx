import Image from "./Image"
import { Link } from "react-router-dom"

const PostListItem = () => {
  return (
    <div className='flex flex-col xl:flex-row gap-8'>

      {/* image */}
      <div className="md:hidden xl:block xl:w-1/3">
        <Image
          src="postImg.jpeg"
          className="rounded-2xl object-cover"
          w="735"
          // largest screen size w/ image is 767px
          // padding from main layout for small size is 16px (px-4)
          // 767-16-16=735
          // max image size that we can have is 735px
        />
      </div>

      {/* details */}
      <div className="flex flex-col gap-4 xl:w-2/3">
        <Link to="/test" className="text-4xl font-semibold">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        </Link>
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <span>Written by</span>
          <Link className="text-blue-800">John Doe</Link>
          <span>on</span>
          <Link className="text-blue-800">Web Design</Link>
          <span>2 days ago</span>
        </div>
      <p>
        Lorem ipsum dolor sit amet,
        consectetur adipisicing elit.
        Nemo, nulla quae. Harum quia magni eius.
        Rerum cupiditate dicta delectus placeat
        dolor ducimus obcaecati nisi libero
        nulla velit. Error, saepe ipsam.
      </p>
      <Link to="/test" className="underline text-blue-800 text-sm">Read More</Link>
      </div>
    </div>
  )
}

export default PostListItem