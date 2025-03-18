import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IKContext, IKUpload } from "imagekitio-react";

// image kit authenticator thing to upload images
// you have to be authenticated to upload images
const authenticator = async () => {
  try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/upload-auth`);
      // console.log(response)

      if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Request failed with status ${response.status}: ${errorText}`);
      }

      // console.log(response.json())
      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
  } catch (error) {
      throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const Write = () => {

  // makes sure you are authenticated or else you won't be able to see this page
  const {isLoaded, isSignedIn} = useUser();

  // use with quill later once i fix the double toolbar
  const [value, setValue] = useState('');

  const navigate = useNavigate();

  const {getToken} = useAuth();

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const token = await getToken();
      return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
        headers:{
          Authorization:`Bearer ${token}`
        },
      });
    },
    // if post creation is successful, navigate to that post page
    onSuccess:(res)=>{
      toast.success("Post has been created!")
      navigate(`/${res.data.slug}`)
    }
  });

  if(!isLoaded) {
    return <div className="">Loading...</div>
  }

  if (isLoaded && !isSignedIn) {
    return <div className="">You should login!</div>
  }

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {
      title: formData.get("title"),
      category: formData.get("category"),
      desc: formData.get("desc"),
      // content: {value}, // use for react quill whenever you fix it lol
      content: formData.get("content")
    };
    // console.log(data)

    mutation.mutate(data)
  };

  // for image kit
  const onError = (err) => {
    console.log(err);
    toast.error("Image upload failed!");
  };

  const onSuccess = (res) => {
    console.log(res);
  };

  return (
    <div className='h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6'>
      <h1 className="text-xl font-light">Create a new post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1 mb-6">
        {/* <button className="w-max p-2 bg-white rounded-xl shadow-md text-sm text-gray-500">
          Add a cover image
        </button> */}
        <IKContext
          publicKey={import.meta.env.VITE_IK_PUBLIC_KEY}
          urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
          authenticator={authenticator}
        >
          <IKUpload
            useUniqueFileName
            onError={onError}
            onSuccess={onSuccess}
          />
        </IKContext>
        <input
          className="text-4xl font-semibold bg-transparent outline-none"
          type="text"
          placeholder="Type title here..."
          name="title"
        />
        <div className="flex items-center gap-4">
          <label className="text-sm" htmlFor="">Choose a category:</label>
          <select 
            className="p-2 bg-white rounded-xl shadow-md"
            name="category"
            id=""
          >
            <option value="general">General</option>
            <option value="web-design">Web Design</option>
            <option value="development">Development</option>
            <option value="databases">Databases</option>
            <option value="seo">Search Engines</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>
        <textarea
          className="p-4 bg-white rounded-xl shadow-md"
          name="desc"
          placeholder="A short description"
        />

        <div className="flex">
          <div className="flex flex-col gap-2 mr-2">
            <div className="cursor-pointer">🖼️</div>
            <div className="cursor-pointer">📽️</div>
          </div>
          <textarea
            className="flex-1 p-4 bg-white rounded-xl shadow-md"
            name="content"
            placeholder="replace with react quill one day"
          />
        </div>

        {/* <ReactQuill
          theme="snow"
          className="flex-1 rounded-xl bg-white shadow-md"
          value={value}
          onChange={setValue}
        /> */}
        <button
          disabled={mutation.isPending}
          className="bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36 disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? "Loading..." : "Send"}
        </button>
        {mutation.isError && <span>{mutation.error.message}</span>}
      </form>
    </div>
  )
}

export default Write