import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import usePost from "@/hooks/usePost";
import usePosts from "@/hooks/usePosts";
import useRegisterModal from "@/hooks/useRegisterModal";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}
const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts(postId as string);
  const [body, setBody] = useState("");
  const {mutate : mutatePost} = usePost(postId as string);

  const [isLoading, setIsLoading] = useState(false);


  const onSubmit = useCallback(async () => {
 
    try {
      setIsLoading(true);
      const url = isComment ? `/api/comments/?postId=${postId}` : `/api/posts`;
      await axios.post(url, {
        body,
      });
      toast.success("Successfully Tweeted");
      setBody("");
      mutatePosts();
      mutatePost();
    } catch (error) {
      toast.error("Something went wrong. Please try again");
    } finally {
      setIsLoading(false);
    }
  }, [body, mutatePosts, isLoading, mutatePost]);
  
  return <div className="border-b-[1px] border-neutral-800 px-5 py-2">
    {currentUser ? <div className="flex gap-4">
        <div>
            <Avatar userId={currentUser?.id}  />
        </div>
        <div className="w-full">
            <textarea disabled={isLoading} onChange={e => setBody(e.target.value)} value={body} className="disabled:opacity-80 
            peer
            resize-none
            text-[18px]
            placeholder-neutral-500

            mt-3
            w-full
            bg-black
            text-white
            ring-0
            outline-none
            " placeholder={placeholder}></textarea>
            <hr className="opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-800 transition"/>
            <div className="mt-4 flex justify-end">
                <Button label="Tweet" 
                 disabled={isLoading || !body} onClick={onSubmit}
                />
            </div>
        </div>
    </div> :    <div className="py-8">
        <h1
        className="text-white text-2xl text-center mb-4 font-bold"
        >Welcome to Twitter</h1>
       <div className="flex flex-row justify-center items-center gap-4">
        <Button label="Login" onClick={loginModal.onOpen} />
        <Button label="Register" secondary onClick={registerModal.onOpen} />

       </div>
    </div>}
 
  </div>;
};

export default Form;
