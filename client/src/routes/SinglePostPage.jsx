import Image from "../components/Image"
import { Link } from "react-router-dom"
import PostMenuActions from "../components/PostMenuActions"
import Search from "../components/Search"
import Comments from "../components/Comments"

const SinglePostPage = () => {
  return (
    <div className='flex flex-col gap-8'>
      {/* post details */}
      <div className="flex gap-8">
        <div className="lg:w-3/5 flex flex-col">
          {/* title */}
          <h1 className="text-xl md:text-3xl xl:text-4xl exl:text-5xl font-semibold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est maiores facere corrupti atque?
          </h1>

          {/* author details */}
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>Written by</span>
            <Link className="text-blue-500">John Doe</Link>
            <span>on</span>
            <Link className="text-blue-500">Web Design</Link>
            <span>2 days ago</span>
          </div>
          {/*  summary details */}
          <p className="text-gray-500 font-medium">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptates perspiciatis temporibus voluptatibus, impedit 
            sapiente vel officia, aliquam quas fugit sunt delectus. Cum, nisi
             adipisci quae maiores sint nihil facere praesentium.
          </p>
        </div>

        {/* image */}
        <div className="hidden lg:block w-2/5">
          <Image
            src="postImg.jpeg"
            w="600"
            className="rounded-2xl"
          />
        </div>
      </div>

      {/* content */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* text */}
        <div className="lg:text-lg flex flex-col gap-6 text-justify">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere molestias sit dolores,
            assumenda iste perspiciatis natus consectetur velit in ab, laboriosam optio
            ex necessitatibus doloribus corrupti provident ullam totam odio? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Repellat delectus blanditiis et magnam, ipsam possimus? Nulla minus
            facilis repellendus aut inventore quia ipsam, non ut, ipsum quos eum, quisquam facere?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere molestias sit dolores,
            assumenda iste perspiciatis natus consectetur velit in ab, laboriosam optio
            ex necessitatibus doloribus corrupti provident ullam totam odio? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Repellat delectus blanditiis et magnam, ipsam possimus? Nulla minus
             facilis repellendus aut inventore quia ipsam, non ut, ipsum quos eum, quisquam facere?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere molestias sit dolores,
            assumenda iste perspiciatis natus consectetur velit in ab, laboriosam optio
            ex necessitatibus doloribus corrupti provident ullam totam odio? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Repellat delectus blanditiis et magnam, ipsam possimus? Nulla minus
             facilis repellendus aut inventore quia ipsam, non ut, ipsum quos eum, quisquam facere?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere molestias sit dolores,
            assumenda iste perspiciatis natus consectetur velit in ab, laboriosam optio
            ex necessitatibus doloribus corrupti provident ullam totam odio? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Repellat delectus blanditiis et magnam, ipsam possimus? Nulla minus
             facilis repellendus aut inventore quia ipsam, non ut, ipsum quos eum, quisquam facere?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere molestias sit dolores,
            assumenda iste perspiciatis natus consectetur velit in ab, laboriosam optio
            ex necessitatibus doloribus corrupti provident ullam totam odio? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Repellat delectus blanditiis et magnam, ipsam possimus? Nulla minus
             facilis repellendus aut inventore quia ipsam, non ut, ipsum quos eum, quisquam facere?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere molestias sit dolores,
            assumenda iste perspiciatis natus consectetur velit in ab, laboriosam optio
            ex necessitatibus doloribus corrupti provident ullam totam odio? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Repellat delectus blanditiis et magnam, ipsam possimus? Nulla minus
             facilis repellendus aut inventore quia ipsam, non ut, ipsum quos eum, quisquam facere?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere molestias sit dolores,
            assumenda iste perspiciatis natus consectetur velit in ab, laboriosam optio
            ex necessitatibus doloribus corrupti provident ullam totam odio? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Repellat delectus blanditiis et magnam, ipsam possimus? Nulla minus
             facilis repellendus aut inventore quia ipsam, non ut, ipsum quos eum, quisquam facere?
          </p>
        </div>

        {/* menu */}
        <div className="px-4 h-max sticky top-8">
          <h1 className="mb-4 text-sm font-medium">Author</h1>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-12">
              <Image
                src="userImg.jpeg"
                className="w-12 h-12 rounded-full object-cover"
                w="48"
                h="48" 
              />
              <Link className="text-blue-800">John Doe</Link>
            </div>
            <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur</p>
            <div className="flex gap-2">
              <Link>
                <Image src="facebook.svg" />
              </Link>
              <Link>
                <Image src="instagram.svg" />
              </Link>
            </div>
          </div>
          {/* save and delete post actions */}
          <PostMenuActions />

          {/* categories */}
          <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
          <div className="flex flex-col gap-2 text-sm">
            <Link className="underline">All</Link>
            <Link className="underline" to="/">Web Design</Link>
            <Link className="underline" to="/">Development</Link>
            <Link className="underline" to="/">Databases</Link>
            <Link className="underline" to="/">Search Engines</Link>
            <Link className="underline" to="/">Marketing</Link>
          </div>
          <h1 className="mt-8 mb-4 text-sm font-medium">Search</h1>
          <Search />
        </div>
      </div>
      <Comments />
    </div>
  )
}

export default SinglePostPage