import { getChatHistoryAction } from '@/app/actions/chat-actions';
import { useQuery } from '@tanstack/react-query';

export const useGetChatHistory = () => {
    return useQuery({
        queryKey: ["chat"],
        queryFn: getChatHistoryAction,
    });
};