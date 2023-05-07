import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/router";
import React, { useCallback, useMemo } from "react";
import Avatar from "../Avatar";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import useLikedPost from "@/hooks/useLikedPost";
interface PostItemProps {
  data: Record<string, any>;
  userId?: string;
}
const PostItem: React.FC<PostItemProps> = ({ data, userId }) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();

 const {hasLiked, toggleLike} = useLikedPost({userId : currentUser?.id, postId : data?.id})

  const goToUser = useCallback(
    (event: any) => {
      event.stopPropagation();
      router.push(`/users/${data.user.id}`);
    },
    [router, data?.user?.id]
  );

  const goToPost = useCallback(() => {
    router.push(`/posts/${data?.id}`);
  }, [router, data?.id]);

  const onLike = useCallback(
    (event: any) => {
      event.stopPropagation();
      if(!currentUser) return loginModal.onOpen();
      toggleLike();
    },
    [loginModal, currentUser, toggleLike]
  );

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return;
    }
    return formatDistanceToNowStrict(new Date(data?.createdAt));
  }, [data?.createdAt]);
 
  const likedIcon = hasLiked ? <AiFillHeart size={20} color="red" /> :  <AiOutlineHeart size={20} />
  return (
    <div
      onClick={goToPost}
      className="border-b-[1px] border-neutral-500 p-5 cursor-pointer hover:bg-neutral-900 transition"
    >
      <div className="flex items-start gap-3">
        <Avatar userId={data?.user?.id} />
        <div>
          <div className="flex   gap-4">
            <div>
              <p
                onClick={goToUser}
                className="text-white font-semibold cursor-pointer hover:underline
                "
              >
                {data?.user?.name}
              </p>
              <span
                className="
                text-neutral-500 
                cursor-pointer
                hover:underline
                
                md:block"
                onClick={goToUser}
              >
                @{data?.user?.username}
              </span>
            </div>
            <div>
              <span className="text-sm text-neutral-400">{createdAt}</span>
            </div>
          </div>{" "}
          <div>{data?.body}</div>
          <div className="flex items-center mt-3 gap-10">
            <div className="flex items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
                <AiOutlineMessage size={20} />
                <p>{data?.comments?.length || 0}</p>
                
            </div>
            <div  onClick={onLike} className="flex items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500">
               {likedIcon}
                <p>{data?.likedIds?.length || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
