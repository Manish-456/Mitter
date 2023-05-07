import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser"
import useLoginModal from "./useLoginModal";
import usePost from "./usePost";
import usePosts from "./usePosts";
import { toast } from "react-hot-toast";
import axios from "axios";

interface UserLikedPostProps {
    userId: string,
    postId: string
}

const useLikedPost = ({ userId, postId }: UserLikedPostProps) => {

    const { data: currentUser } = useCurrentUser();
    const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId as string);
    const { mutate: mutateFetchedPosts } = usePosts(userId);

    const loginModal = useLoginModal();

    const hasLiked = useMemo(() => {
        const like = fetchedPost?.likedIds || [];
        return like.includes(currentUser?.id)

    }, [fetchedPost?.likedIds, currentUser?.id]);

    const toggleLike = useCallback(async () => {
        if (!currentUser) return loginModal.onOpen();
        try {
            let request;
        
            if (hasLiked) {
                request = () => axios.delete(`/api/like`, {
                    params: { postId }
                })
            } else {
                request = () => axios.post('/api/like', { postId })
            }
            await request();
            mutateFetchedPosts();
            mutateFetchedPost();
            toast.success("Success")
        } catch (error) {
            toast.error('something went wrong')
        }
    }, [currentUser,
            hasLiked,
            mutateFetchedPost,
            mutateFetchedPosts,
            postId,
            loginModal])

    return {
        hasLiked,
        toggleLike
    }
}

export default useLikedPost
