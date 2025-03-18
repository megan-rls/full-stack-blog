import { IKContext, IKUpload } from "imagekitio-react";
import { useRef } from "react";
import { toast } from "react-toastify";


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

const Upload = ({ children, type, setProgress, setData }) => {

  const ref = useRef(null)

  // for image kit
  const onError = (err) => {
    console.log(err);
    toast.error("Image upload failed!");
  };

  const onSuccess = (res) => {
    console.log(res);
    setData(res);
  };

  const onUploadProgress = (progress) => {
    console.log(progress);
    setProgress(Math.round((progress.loaded/progress.total)*100));
  }

  const handleClick = (e) => {
    e.preventDefault(); // Prevent default form submission
    ref.current.click(); // Trigger the IKUpload click event
  };

  return (
    <IKContext
    publicKey={import.meta.env.VITE_IK_PUBLIC_KEY}
    urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
    authenticator={authenticator}
  >
    <IKUpload
      useUniqueFileName
      onError={onError}
      onSuccess={onSuccess}
      onUploadProgress={onUploadProgress}
      className="hidden"
      ref={ref}
      accept={`${type}/*`}
    />
    <div className="cursor-pointer" onClick={handleClick}>
      {children}
    </div>
  </IKContext>

  );
};

export default Upload;