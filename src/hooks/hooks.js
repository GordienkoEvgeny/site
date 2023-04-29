import { useContext } from 'react';
import { LoginContext, ChatContext } from '../contexts/contexts.js';

export const useAuthorization = () => useContext(LoginContext);
export const useChatApi = () => useContext(ChatContext);
