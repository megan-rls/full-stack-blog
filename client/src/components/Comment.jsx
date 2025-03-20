import Image from "./Image";
import { format } from "timeago.js";
import { useUser, useAuth } from "@clerk/clerk-react";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";

const Comment = ({ comment, postId }) => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const role = user?.publicMetadata?.role;

  const queryClient = useQueryClient(); // allows us to validate our data

  const mutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.delete(
        `${import.meta.env.VITE_API_URL}/comments/${comment._id}`, 
        {
          headers:{
            Authorization:`Bearer ${token}`
        },
      }
    );
  },
    // if post creation is successful, navigate to that post page
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:["comments", postId]});
      toast.success("Comment deleted successfully");
    },
    onError: (error) => {
      toast.error(error.response.data);
    }
  });

  return (
    <div className='bg-slate-50 rounded-xl p-4 mb-8'>
      <div className="flex items-center gap-4">
        {comment.user.img && <Image 
          src={comment.user.img}
          className="w-10 h-10 rounded-full object-cover"
          w="40"
        />}
        <span className="font-medium">{comment.user.username}</span>
        <span className="text-sm text-gray-500">{format(comment.createdAt)}</span>
        {user &&
          (comment.user.username == user.username || role==="admin") && (
            <span 
              className="text-xs text-red-300 hover:text-red-500 cursor-pointer" 
              onClick={() => mutation.mutate()}
            >
              delete
            {mutation.isPending && <span>(in progress)</span>}
            </span>
          )}
      </div>
      <div className="mt-4">
        <p>
          {comment.desc}
        </p>
      </div>
    </div>
  )
}

export default Comment;