import useSWR from 'swr';
import fetcher from '@/libs/fetcher';

const useNotification = (userId?: string) => {
    const url = userId ? `/api/notifications/${userId}` : null
    const { data, isLoading, error, mutate } = useSWR(url, fetcher)
    return {
        data,
        isLoading,
        error,
        mutate
    }
}

export default useNotification;
