import fetcher from '@/libs/fetcher';
import useSWR from 'swr';

const usePost = (postId: string) => {
    const { data,
        isLoading,
        error,
        mutate } = useSWR(
            postId ? `/api/posts/${postId}` : null,
            fetcher);
    return {
        data,
        isLoading,
        error,
        mutate
    }
}

export default usePost;