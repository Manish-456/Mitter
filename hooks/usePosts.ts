import fetcher from '@/libs/fetcher';
import useSWR from 'swr';

const usePosts = (userId? : string) => {
    const { data, isLoading, error, mutate } = useSWR(userId ? `/api/posts/?userId=${userId}` : '/api/posts', fetcher);
    return { data, isLoading, error, mutate }
}

export default usePosts;

