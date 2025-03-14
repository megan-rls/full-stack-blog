import Image from "./Image"

const Comment = () => {
  return (
    <div className='bg-slate-50 rounded-xl p-4 mb-8'>
      <div className="flex items-center gap-4">
        <Image 
          src="userImg.jpeg"
          className="w-10 h-10 rounded-full object-cover"
          w="40"
        />
        <span className="font-medium">John Doe</span>
        <span className="text-sm text-gray-500">2 days ago</span>
      </div>
      <div className="mt-4">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
          Dolores odio odit at ducimus neque modi illo atque magni nobis
           distinctio. Rem, cum nulla? Impedit incidunt, voluptatibus 
           et corporis accusamus tempora.
        </p>
      </div>
    </div>
  )
}

export default Comment