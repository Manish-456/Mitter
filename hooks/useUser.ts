import useSWR from 'swr';
import fetcher from '@/libs/fetcher';

const useUser = (userId : string) => {
    const {
        data,
        isLoading,
        error,
        mutate } = useSWR(
   `/api/users/${userId}`,
            fetcher);
    return { data, isLoading, error, mutate }
}

export default useUser;