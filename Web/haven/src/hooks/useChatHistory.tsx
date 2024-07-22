import { create } from 'zustand';

interface ChatHistoryStore {
    isMinimized: boolean;
    status: boolean;

    toggle: () => void;
}

export const useChatHistory = create<ChatHistoryStore>((set) => ({
    isMinimized: true,
    status: false,

    toggle: () => {
        set(({ status: true }));
        set((state) => ({ isMinimized: !state.isMinimized }))
        setTimeout(() => set({ status: false }), 500);
    }
}));